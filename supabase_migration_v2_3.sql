BEGIN;

-- 1. PREFLIGHT SAFEGUARD: Abort if results exist.
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM diagnostic_results) THEN
        RAISE EXCEPTION 'MIGRATION ABORTED: diagnostic_results contains existing rows.';
    END IF;
END $$;

-- 2. COMPANIES UPGRADE
ALTER TABLE companies
    ADD COLUMN IF NOT EXISTS industry_other TEXT;

-- 3. DIAGNOSTIC_SESSIONS UPGRADE
ALTER TABLE diagnostic_sessions
    ADD COLUMN IF NOT EXISTS annual_revenue_range TEXT,
    ADD COLUMN IF NOT EXISTS revenue_growth_pattern TEXT,
    ADD COLUMN IF NOT EXISTS sales_team_size TEXT,
    ADD COLUMN IF NOT EXISTS average_deal_size TEXT,
    ADD COLUMN IF NOT EXISTS average_sales_cycle TEXT,
    ADD COLUMN IF NOT EXISTS utm_content TEXT,
    ADD COLUMN IF NOT EXISTS utm_term TEXT,
    ADD COLUMN IF NOT EXISTS referrer TEXT,
    ADD COLUMN IF NOT EXISTS landing_page TEXT;

-- 4. DIAGNOSTIC_RESULTS UPGRADE 
ALTER TABLE diagnostic_results
    ADD COLUMN IF NOT EXISTS score_commercial_dependency INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS score_commercial_process INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS score_operational_infrastructure INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS score_commercial_intelligence INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS score_ai_automation INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS score_governance_evolution INTEGER NOT NULL DEFAULT 0;

ALTER TABLE diagnostic_results DROP CONSTRAINT IF EXISTS chk_score_dependency;
ALTER TABLE diagnostic_results ADD CONSTRAINT chk_score_dependency CHECK (score_commercial_dependency >= 0 AND score_commercial_dependency <= 100);

ALTER TABLE diagnostic_results DROP CONSTRAINT IF EXISTS chk_score_process;
ALTER TABLE diagnostic_results ADD CONSTRAINT chk_score_process CHECK (score_commercial_process >= 0 AND score_commercial_process <= 100);

ALTER TABLE diagnostic_results DROP CONSTRAINT IF EXISTS chk_score_infrastructure;
ALTER TABLE diagnostic_results ADD CONSTRAINT chk_score_infrastructure CHECK (score_operational_infrastructure >= 0 AND score_operational_infrastructure <= 100);

ALTER TABLE diagnostic_results DROP CONSTRAINT IF EXISTS chk_score_intelligence;
ALTER TABLE diagnostic_results ADD CONSTRAINT chk_score_intelligence CHECK (score_commercial_intelligence >= 0 AND score_commercial_intelligence <= 100);

ALTER TABLE diagnostic_results DROP CONSTRAINT IF EXISTS chk_score_ai;
ALTER TABLE diagnostic_results ADD CONSTRAINT chk_score_ai CHECK (score_ai_automation >= 0 AND score_ai_automation <= 100);

ALTER TABLE diagnostic_results DROP CONSTRAINT IF EXISTS chk_score_governance;
ALTER TABLE diagnostic_results ADD CONSTRAINT chk_score_governance CHECK (score_governance_evolution >= 0 AND score_governance_evolution <= 100);


-- 5. RPC V2.3 UPGRADE
CREATE OR REPLACE FUNCTION complete_diagnostic(p_session_id UUID) RETURNS jsonb AS $FUNC$
DECLARE
    v_owner_id UUID;
    v_status TEXT;
    v_version TEXT;
    v_agg_questions TEXT[];
    dep_score NUMERIC := 0;
    pro_score NUMERIC := 0;
    inf_score NUMERIC := 0;
    int_score NUMERIC := 0;
    aia_score NUMERIC := 0;
    gov_score NUMERIC := 0;
    computed_overall INTEGER := 0;
    num_critically_low INTEGER := 0;
    num_below_structured INTEGER := 0;
    num_integrated_or_above INTEGER := 0;
    expected_capability TEXT;
    lowest_dim TEXT := '';
    lowest_score NUMERIC := 101;
    second_lowest_dim TEXT := 'none';
    second_lowest_score NUMERIC := 101;
    expected_primary_vuln TEXT;
    expected_secondary_vuln TEXT;
    expected_pattern TEXT;
    expected_pattern_desc TEXT;
    expected_focus TEXT;
    expected_interpretation TEXT;
    expected_implication TEXT;
    v_completed_time TIMESTAMP WITH TIME ZONE := NOW();
    return_payload jsonb;
BEGIN
    SELECT owner_id, status, version INTO v_owner_id, v_status, v_version FROM diagnostic_sessions WHERE id = p_session_id;
    IF NOT FOUND THEN RAISE EXCEPTION 'Session not found.'; END IF;
    IF v_owner_id != auth.uid() THEN RAISE EXCEPTION 'Unauthorized.'; END IF;
    IF v_status = 'completed' THEN RAISE EXCEPTION 'Session is already completed and immutable.'; END IF;

    SELECT ARRAY_AGG(question_id || ':' || dimension ORDER BY question_id) INTO v_agg_questions
    FROM diagnostic_responses
    WHERE session_id = p_session_id;

    IF v_version = 'ACCORD-DIAG-1.0' THEN
        IF v_agg_questions IS NULL OR ARRAY_LENGTH(v_agg_questions, 1) != 23 THEN
            RAISE EXCEPTION 'Incomplete Diagnostic. Expected exactly 23 valid responses.';
        END IF;
        
        IF v_agg_questions != ARRAY[
            'AIA-17:ai_automation', 'AIA-18:ai_automation', 'AIA-19:ai_automation',
            'DEP-01:commercial_dependency', 'DEP-02:commercial_dependency', 'DEP-03:commercial_dependency', 'DEP-04:commercial_dependency',
            'GOV-20:governance_evolution', 'GOV-21:governance_evolution', 'GOV-22:governance_evolution', 'GOV-23:governance_evolution',
            'INF-09:operational_infrastructure', 'INF-10:operational_infrastructure', 'INF-11:operational_infrastructure', 'INF-12:operational_infrastructure',
            'INT-13:commercial_intelligence', 'INT-14:commercial_intelligence', 'INT-15:commercial_intelligence', 'INT-16:commercial_intelligence',
            'PRO-05:commercial_process', 'PRO-06:commercial_process', 'PRO-07:commercial_process', 'PRO-08:commercial_process'
        ] THEN
            RAISE EXCEPTION 'Diagnostic dimension map mismatch. Invalid, missing, duplicate or unmapped questions detected for version 1.0.';
        END IF;
    ELSE
        RAISE EXCEPTION 'Unsupported methodology version: %', v_version;
    END IF;

    SELECT COALESCE((AVG(score) / 4.0) * 100, 0) INTO dep_score FROM diagnostic_responses WHERE session_id = p_session_id AND dimension = 'commercial_dependency';
    SELECT COALESCE((AVG(score) / 4.0) * 100, 0) INTO pro_score FROM diagnostic_responses WHERE session_id = p_session_id AND dimension = 'commercial_process';
    SELECT COALESCE((AVG(score) / 4.0) * 100, 0) INTO inf_score FROM diagnostic_responses WHERE session_id = p_session_id AND dimension = 'operational_infrastructure';
    SELECT COALESCE((AVG(score) / 4.0) * 100, 0) INTO int_score FROM diagnostic_responses WHERE session_id = p_session_id AND dimension = 'commercial_intelligence';
    SELECT COALESCE((AVG(score) / 4.0) * 100, 0) INTO aia_score FROM diagnostic_responses WHERE session_id = p_session_id AND dimension = 'ai_automation';
    SELECT COALESCE((AVG(score) / 4.0) * 100, 0) INTO gov_score FROM diagnostic_responses WHERE session_id = p_session_id AND dimension = 'governance_evolution';
    computed_overall := ROUND((dep_score * 0.20) + (pro_score * 0.20) + (inf_score * 0.20) + (int_score * 0.15) + (aia_score * 0.10) + (gov_score * 0.15));

    IF dep_score <= 25 THEN num_critically_low := num_critically_low + 1; END IF;
    IF pro_score <= 25 THEN num_critically_low := num_critically_low + 1; END IF;
    IF inf_score <= 25 THEN num_critically_low := num_critically_low + 1; END IF;
    IF int_score <= 25 THEN num_critically_low := num_critically_low + 1; END IF;
    IF aia_score <= 25 THEN num_critically_low := num_critically_low + 1; END IF;
    IF gov_score <= 25 THEN num_critically_low := num_critically_low + 1; END IF;
    IF dep_score < 50 THEN num_below_structured := num_below_structured + 1; END IF;
    IF pro_score < 50 THEN num_below_structured := num_below_structured + 1; END IF;
    IF inf_score < 50 THEN num_below_structured := num_below_structured + 1; END IF;
    IF int_score < 50 THEN num_below_structured := num_below_structured + 1; END IF;
    IF aia_score < 50 THEN num_below_structured := num_below_structured + 1; END IF;
    IF gov_score < 50 THEN num_below_structured := num_below_structured + 1; END IF;
    IF dep_score >= 75 THEN num_integrated_or_above := num_integrated_or_above + 1; END IF;
    IF pro_score >= 75 THEN num_integrated_or_above := num_integrated_or_above + 1; END IF;
    IF inf_score >= 75 THEN num_integrated_or_above := num_integrated_or_above + 1; END IF;
    IF int_score >= 75 THEN num_integrated_or_above := num_integrated_or_above + 1; END IF;
    IF aia_score >= 75 THEN num_integrated_or_above := num_integrated_or_above + 1; END IF;
    IF gov_score >= 75 THEN num_integrated_or_above := num_integrated_or_above + 1; END IF;

    expected_capability := 'STRUCTURED';
    IF computed_overall <= 25 OR dep_score <= 25 OR num_critically_low >= 3 THEN expected_capability := 'HERO-DEPENDENT';
    ELSIF computed_overall <= 45 OR num_below_structured >= 3 THEN expected_capability := 'FRAGMENTED';
    ELSIF computed_overall >= 81 AND num_critically_low = 0 AND num_below_structured = 0 THEN expected_capability := 'ADAPTIVE';
    ELSIF computed_overall >= 66 AND num_integrated_or_above >= 4 AND num_critically_low = 0 THEN expected_capability := 'INTEGRATED'; END IF;

    IF dep_score < lowest_score THEN second_lowest_score := lowest_score; second_lowest_dim := lowest_dim; lowest_score := dep_score; lowest_dim := 'commercial_dependency';
    ELSIF dep_score < second_lowest_score THEN second_lowest_score := dep_score; second_lowest_dim := 'commercial_dependency'; END IF;
    IF pro_score < lowest_score THEN second_lowest_score := lowest_score; second_lowest_dim := lowest_dim; lowest_score := pro_score; lowest_dim := 'commercial_process';
    ELSIF pro_score < second_lowest_score THEN second_lowest_score := pro_score; second_lowest_dim := 'commercial_process'; END IF;
    IF inf_score < lowest_score THEN second_lowest_score := lowest_score; second_lowest_dim := lowest_dim; lowest_score := inf_score; lowest_dim := 'operational_infrastructure';
    ELSIF inf_score < second_lowest_score THEN second_lowest_score := inf_score; second_lowest_dim := 'operational_infrastructure'; END IF;
    IF int_score < lowest_score THEN second_lowest_score := lowest_score; second_lowest_dim := lowest_dim; lowest_score := int_score; lowest_dim := 'commercial_intelligence';
    ELSIF int_score < second_lowest_score THEN second_lowest_score := int_score; second_lowest_dim := 'commercial_intelligence'; END IF;
    IF aia_score < lowest_score THEN second_lowest_score := lowest_score; second_lowest_dim := lowest_dim; lowest_score := aia_score; lowest_dim := 'ai_automation';
    ELSIF aia_score < second_lowest_score THEN second_lowest_score := aia_score; second_lowest_dim := 'ai_automation'; END IF;
    IF gov_score < lowest_score THEN second_lowest_score := lowest_score; second_lowest_dim := lowest_dim; lowest_score := gov_score; lowest_dim := 'governance_evolution';
    ELSIF gov_score < second_lowest_score THEN second_lowest_score := gov_score; second_lowest_dim := 'governance_evolution'; END IF;
    
    expected_primary_vuln := CASE WHEN lowest_score >= 75 THEN 'none' ELSE lowest_dim END;
    expected_secondary_vuln := CASE WHEN expected_primary_vuln != 'none' AND second_lowest_dim != '' AND second_lowest_score < 50 AND second_lowest_score <= (lowest_score + 10) THEN second_lowest_dim ELSE 'none' END;

    expected_pattern := NULL;
    expected_pattern_desc := NULL;
    IF dep_score < 50 THEN expected_pattern := 'hero_dependency'; expected_pattern_desc := 'The organization relies on individual heroics rather than structural capability. Growth is bottlenecked by the bandwidth of key individuals.';
    ELSIF pro_score < 50 THEN expected_pattern := 'process_variability'; expected_pattern_desc := 'Commercial execution varies significantly between individuals, creating inconsistent results and unpredictable forecasts.';
    ELSIF inf_score < 50 THEN expected_pattern := 'operational_friction'; expected_pattern_desc := 'The underlying infrastructure introduces friction rather than leverage, requiring manual intervention to sustain commercial activity.';
    ELSIF int_score < 50 THEN expected_pattern := 'limited_intelligence'; expected_pattern_desc := 'Leadership lacks the structured visibility required to proactively identify risks and optimize systemic performance.';
    ELSIF gov_score < 50 THEN expected_pattern := 'weak_evolution_loop'; expected_pattern_desc := 'The organization lacks the mechanisms to systematically capture learning and evolve its commercial capability over time.';
    END IF;

    IF expected_primary_vuln = 'commercial_dependency' THEN expected_focus := 'Institutionalize commercial capability.'; expected_interpretation := 'Critical commercial knowledge and execution remain too dependent on individual contributors and leadership intervention.'; expected_implication := 'The priority is to convert individual commercial knowledge into repeatable organizational capability.';
    ELSIF expected_primary_vuln = 'commercial_process' THEN expected_focus := 'Design the commercial operating process.'; expected_interpretation := 'The organization has commercial activity and experience, but execution varies across people, stages or functions.'; expected_implication := 'The priority is to establish an operating process that can be consistently executed, measured and improved.';
    ELSIF expected_primary_vuln = 'operational_infrastructure' THEN expected_focus := 'Build the commercial operating infrastructure.'; expected_interpretation := 'Critical information, workflows and systems are not sufficiently connected to support reliable execution.'; expected_implication := 'The priority is to establish infrastructure that makes commercial capability operationally repeatable.';
    ELSIF expected_primary_vuln = 'commercial_intelligence' THEN expected_focus := 'Build decision intelligence.'; expected_interpretation := 'Leadership has access to commercial information, but important signals and causes remain difficult to identify quickly.'; expected_implication := 'The priority is to connect commercial information to the decisions that determine growth.';
    ELSIF expected_primary_vuln = 'ai_automation' THEN expected_focus := 'Integrate intelligence into the operating system.'; expected_interpretation := 'AI and automation may already be creating value, but their impact remains dependent on isolated use cases or individual adoption.'; expected_implication := 'The priority is not simply greater AI adoption, but integration of intelligence into the organization''s operating architecture.';
    ELSIF expected_primary_vuln = 'governance_evolution' THEN expected_focus := 'Establish the evolution loop.'; expected_interpretation := 'Commercial capability exists, but the mechanisms required to continuously maintain, learn from and improve it remain underdeveloped.'; expected_implication := 'The priority is to make continuous improvement part of the operating system rather than dependent on individual initiative.';
    ELSE expected_focus := 'Continuous systemic optimization.'; expected_interpretation := 'The organization demonstrates strong structural capability across all dimensions.'; expected_implication := 'The priority is continuous refinement and scaling of the existing architecture.';
    END IF;

    INSERT INTO diagnostic_results(
        session_id, 
        overall_score, 
        capability_level, 
        primary_vulnerability, 
        secondary_signal, 
        systemic_pattern, 
        recommended_focus,
        score_commercial_dependency,
        score_commercial_process,
        score_operational_infrastructure,
        score_commercial_intelligence,
        score_ai_automation,
        score_governance_evolution
    )
    VALUES (
        p_session_id, 
        computed_overall, 
        expected_capability, 
        expected_primary_vuln, 
        expected_secondary_vuln, 
        expected_pattern, 
        expected_focus,
        ROUND(dep_score),
        ROUND(pro_score),
        ROUND(inf_score),
        ROUND(int_score),
        ROUND(aia_score),
        ROUND(gov_score)
    );

    UPDATE diagnostic_sessions SET status = 'completed', completed_at = v_completed_time WHERE id = p_session_id;

    return_payload := jsonb_build_object(
        'dimensionScores', jsonb_build_object(
            'commercial_dependency', jsonb_build_object('normalizedScore', ROUND(dep_score)),
            'commercial_process', jsonb_build_object('normalizedScore', ROUND(pro_score)),
            'operational_infrastructure', jsonb_build_object('normalizedScore', ROUND(inf_score)),
            'commercial_intelligence', jsonb_build_object('normalizedScore', ROUND(int_score)),
            'ai_automation', jsonb_build_object('normalizedScore', ROUND(aia_score)),
            'governance_evolution', jsonb_build_object('normalizedScore', ROUND(gov_score))
        ),
        'overallScore', computed_overall,
        'capabilityLevel', expected_capability,
        'primaryVulnerability', expected_primary_vuln,
        'secondarySignal', CASE WHEN expected_secondary_vuln = 'none' THEN NULL ELSE expected_secondary_vuln END,
        'systemicPattern', CASE WHEN expected_pattern IS NULL THEN NULL ELSE jsonb_build_object('pattern', expected_pattern, 'description', expected_pattern_desc) END,
        'recommendations', jsonb_build_object(
            'focusArea', expected_focus,
            'interpretation', expected_interpretation,
            'implication', expected_implication
        )
    );

    RETURN return_payload;
END;
$FUNC$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

GRANT EXECUTE ON FUNCTION complete_diagnostic(UUID) TO authenticated;
REVOKE EXECUTE ON FUNCTION complete_diagnostic(UUID) FROM anon;
REVOKE EXECUTE ON FUNCTION complete_diagnostic(UUID) FROM public;

COMMIT;
