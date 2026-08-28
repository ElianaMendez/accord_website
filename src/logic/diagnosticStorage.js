import { DIAGNOSTIC_VERSION, QUESTIONS } from './diagnosticQuestions';
import { supabase } from './supabaseClient';

/**
 * Persistence layer for Diagnostic state and remote storage.
 */
const STORAGE_KEY = 'accord_diagnostic_session';

export function getLocalSession() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error("Local storage error", e);
        return null;
    }
}

export function saveLocalSession(sessionData) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
    } catch (e) {
        console.error("Local storage error", e);
    }
}

export function clearLocalSession() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.error("Local storage error", e);
    }
}

export async function recoverRemoteSession(session) {
    // Rely on Supabase Auth maintaining state silently in standard scenarios
    const { data: authData } = await supabase.auth.getSession();
    const userId = authData?.session?.user?.id;
    if (!userId) return null;

    let diagnosticId = session?.diagnosticId;

    // If no local session but we have an active user, try to find their latest in-progress session
    if (!diagnosticId) {
        const { data: latestSession, error: latestError } = await supabase
            .from('diagnostic_sessions')
            .select('*')
            .eq('owner_id', userId)
            .order('started_at', { ascending: false })
            .limit(1)
            .single();

        if (!latestError && latestSession && latestSession.status === 'in_progress') {
            diagnosticId = latestSession.id;
        } else {
            return null;
        }
    }

    if (diagnosticId) {
        const { data, error } = await supabase
            .from('diagnostic_sessions')
            .select('*')
            .eq('id', diagnosticId)
            .eq('owner_id', userId)
            .single();

        if (!error && data) {
            let recoveredSession = session || {
                diagnosticId: data.id,
                ownerId: data.owner_id,
                status: data.status,
                startedAt: data.started_at,
                completedAt: data.completed_at,
            };

            // Enhanced Recovery for Q1-Q23
            let highestQ = 0;
            const resData = await supabase
                .from('diagnostic_responses')
                .select('question_id')
                .eq('session_id', diagnosticId);

            if (resData.data && resData.data.length > 0) {
                // Map the question_ids back to the canonical index order
                const answeredIndices = resData.data.map(row => {
                    return QUESTIONS.findIndex(q => q.id === row.question_id) + 1; // 1-indexed
                }).filter(idx => idx > 0).sort((a, b) => a - b);

                // Ensure continuity: 1, 2, 3...
                let contiguousN = 0;
                for (let i = 0; i < answeredIndices.length; i++) {
                    if (answeredIndices[i] === contiguousN + 1) {
                        contiguousN++;
                    } else if (answeredIndices[i] === contiguousN) {
                        continue; // ignore duplicates in calculation
                    } else {
                        break; // gap found, stop
                    }
                }
                highestQ = contiguousN;
            }

            if (data.status === 'completed') {
                recoveredSession.last_completed_step = 'q23';
            } else if (highestQ > 0) {
                recoveredSession.last_completed_step = 'q' + highestQ;
            } else if (data.strategic_primary_barrier !== null) {
                recoveredSession.last_completed_step = 'strategic';
            } else if (data.executive_email !== null) {
                recoveredSession.last_completed_step = 'executive';
            } else if (data.annual_revenue_range !== null) {
                recoveredSession.last_completed_step = 'commercial';
            } else if (data.company_id !== null) {
                recoveredSession.last_completed_step = 'company';
            } else {
                recoveredSession.last_completed_step = null;
            }

            return recoveredSession;
        }
    }
    return null;
}

export async function initializeDiagnostic() {
    console.log("[E2E TRACE] initializeDiagnostic() STARTED");
    // 1. Authenticate Anonymously - strict creation of `auth.users(id)` and JWT.
    const { data: authData, error: authError } = await supabase.auth.signInAnonymously();
    if (authError) {
        console.error("[E2E TRACE] Anonymous Auth FAILURE:", JSON.stringify(authError, null, 2));
    } else {
        console.log("[E2E TRACE] Anonymous Auth SUCCESS:", authData);
    }
    const userId = authData?.user?.id;

    const urlParams = new URLSearchParams(window.location.search);
    const acquisitionData = {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_content: urlParams.get('utm_content'),
        utm_term: urlParams.get('utm_term'),
        referrer: document.referrer,
        landing_page: window.location.pathname
    };

    const newSession = {
        diagnosticId: crypto.randomUUID(),
        ownerId: userId,
        diagnosticVersion: DIAGNOSTIC_VERSION,
        status: 'started',
        last_completed_step: null,
        startedAt: new Date().toISOString(),
        completedAt: null,
        companyContext: {},
        commercialContext: {},
        executiveContext: {},
        strategicContext: {},
        responses: [],
        acquisitionData,
        events: [
            { event_type: 'diagnostic_started', timestamp: new Date().toISOString() }
        ]
    };

    saveLocalSession(newSession);

    try {
        if (userId) {
            console.log(`[E2E TRACE] Attempting insert into diagnostic_sessions... [id: ${newSession.diagnosticId}]`);
            const payload = {
                id: newSession.diagnosticId,
                owner_id: userId,
                version: newSession.diagnosticVersion,
                status: newSession.status,
                started_at: newSession.startedAt,
                utm_source: acquisitionData.utm_source,
                utm_medium: acquisitionData.utm_medium,
                utm_campaign: acquisitionData.utm_campaign
            };
            const { data, error } = await supabase.from('diagnostic_sessions').insert([payload]).select();
            if (error) {
                console.error("[E2E TRACE] diagnostic_sessions INSERT FAILURE:", JSON.stringify(error, null, 2));
                console.error("Payload was:", payload);
            } else {
                console.log("[E2E TRACE] diagnostic_sessions INSERT SUCCESS:", data);
            }
        }
    } catch (e) {
        console.warn("[E2E TRACE] Backend uncontactable. Utilizing local state.", e);
    }

    return newSession;
}

export async function updateDiagnosticState(sessionId, key, value) {
    console.log(`[E2E TRACE] updateDiagnosticState() KEY: ${key}`);
    const session = getLocalSession();
    if (!session || session.diagnosticId !== sessionId) return;

    // 1. PREPARE NETWORK PAYLOAD
    let updates = {};
    if (key === 'companyContext') {
        if (session.ownerId) {
            // Authoritatively resolve company_id from network truth to enforce idempotency
            const { data: remoteSession } = await supabase
                .from('diagnostic_sessions')
                .select('company_id')
                .eq('id', sessionId)
                .single();

            const existingCompanyId = remoteSession?.company_id;

            if (existingCompanyId) {
                const payload = {
                    name: value.company_name,
                    industry: value.industry
                };
                console.log(`[E2E TRACE] Attempting companies UPDATE for ${existingCompanyId}:`, payload);
                const { error: compError } = await supabase.from('companies').update(payload).eq('id', existingCompanyId);
                if (compError) {
                    console.error("[E2E TRACE] companies UPDATE FAILURE:", JSON.stringify(compError, null, 2));
                    throw compError;
                } else {
                    console.log("[E2E TRACE] companies UPDATE SUCCESS");
                }
            } else {
                const cId = crypto.randomUUID();
                const payload = {
                    id: cId,
                    owner_id: session.ownerId,
                    name: value.company_name,
                    industry: value.industry
                };
                console.log("[E2E TRACE] Attempting companies INSERT:", payload);
                const { error: compError } = await supabase.from('companies').insert([payload]);
                if (compError) {
                    console.error("[E2E TRACE] companies INSERT FAILURE:", JSON.stringify(compError, null, 2));
                    throw compError;
                } else {
                    console.log("[E2E TRACE] companies INSERT SUCCESS");
                    updates.company_id = cId;
                }
            }
        }
    }
    if (key === 'commercialContext') {
        updates.annual_revenue_range = value.annual_revenue_range;
        updates.revenue_growth_pattern = value.revenue_growth_pattern;
        updates.sales_team_size = value.sales_team_size;
        updates.average_deal_size = value.average_deal_size;
        updates.average_sales_cycle = value.average_sales_cycle;
    }
    if (key === 'executiveContext') {
        updates.executive_first_name = value.first_name;
        updates.executive_last_name = value.last_name;
        updates.executive_email = value.email;
        updates.executive_job_title = value.job_title;
    }
    if (key === 'strategicContext') {
        updates.strategic_primary_barrier = value.primary_barrier;
        updates.strategic_priority = value.strategic_priority;
    }
    // We strictly ignore key === 'responses' bulk inserts, they are bypassed entirely structurally.

    // 2. EXECUTE REMOTE NETWORK OPERATION FIRST
    if (Object.keys(updates).length > 0 && session.ownerId) {
        console.log("[E2E TRACE] Attempting diagnostic_sessions UPDATE:", updates);
        const { error: updateError } = await supabase.from('diagnostic_sessions').update(updates).eq('id', sessionId);
        if (updateError) {
            console.error("[E2E TRACE] diagnostic_sessions UPDATE FAILURE:", JSON.stringify(updateError, null, 2));
            throw updateError;
        }
        console.log("[E2E TRACE] diagnostic_sessions UPDATE SUCCESS");
    }

    if (key === 'singleResponse' && session.ownerId) {
        let trueDim = "commercial_dependency";
        if (value.questionId.startsWith("PRO")) trueDim = "commercial_process";
        else if (value.questionId.startsWith("INF")) trueDim = "operational_infrastructure";
        else if (value.questionId.startsWith("INT")) trueDim = "commercial_intelligence";
        else if (value.questionId.startsWith("AIA")) trueDim = "ai_automation";
        else if (value.questionId.startsWith("GOV")) trueDim = "governance_evolution";

        console.log("[E2E TRACE] Attempting single response persistence for:", value.questionId);

        // Atomic Sequential Idempotent Protocol
        const { error: upsertError } = await supabase
            .from('diagnostic_responses')
            .upsert({
                session_id: sessionId,
                question_id: value.questionId,
                dimension: trueDim,
                score: value.score
            }, {
                onConflict: 'session_id, question_id'
            });

        if (upsertError) {
            console.error("[E2E TRACE] diagnostic_responses UPSERT FAILURE", upsertError);
            throw upsertError;
        }
        console.log("[E2E TRACE] single response persistence SUCCESS");
    }

    // 3. SUCCESS REACHED: INJECT TO MEMORY AND SAVE LOCALLY
    if (key !== 'frontendProgress' && key !== 'singleResponse' && key !== 'responses') {
        session[key] = value;
    }

    session.status = 'in_progress';

    const ranks = {
        'company': 1, 'commercial': 2, 'executive': 3, 'strategic': 4
    };
    const getRank = (val) => {
        if (!val) return 0;
        if (ranks[val] !== undefined) return ranks[val];
        if (val.startsWith('q')) return 4 + parseInt(val.substring(1));
        return -1;
    };

    const computeNewRank = () => {
        if (key === 'frontendProgress') return value;
        if (key === 'companyContext') return 'company';
        if (key === 'commercialContext') return 'commercial';
        if (key === 'executiveContext') return 'executive';
        if (key === 'strategicContext') return 'strategic';
        if (key === 'responses') return 'q23';
        return null;
    };

    const potRankVal = computeNewRank();
    if (potRankVal) {
        if (getRank(potRankVal) > getRank(session.last_completed_step)) {
            session.last_completed_step = potRankVal;
        }
    }

    saveLocalSession(session);
}

export async function logEvent(sessionId, eventType, metadata = {}) {
    const session = getLocalSession();
    if (session && session.diagnosticId === sessionId) {
        session.events.push({ event_type: eventType, timestamp: new Date().toISOString(), metadata });
        saveLocalSession(session);
    }
}

export async function completeDiagnostic(sessionId) {
    console.log(`[E2E TRACE] completeDiagnostic() STARTED for sessionId: ${sessionId}`);
    const session = getLocalSession();
    if (session && session.diagnosticId === sessionId) {
        if (!session.ownerId) {
            console.warn("[E2E TRACE] Cannot complete session without ownership.");
            throw new Error("Diagnostic owner missing.");
        }

        try {
            console.log("[E2E TRACE] Invoking RPC complete_diagnostic...");
            // Invoking the Authoritative Source of Truth in Postgres
            const { data, error } = await supabase.rpc('complete_diagnostic', { p_session_id: sessionId });

            if (error) {
                console.error("[E2E TRACE] RPC FAILURE:", JSON.stringify(error, null, 2));
                throw error;
            }

            console.log("[E2E TRACE] RPC SUCCESS. Data returned:", data);

            session.status = 'completed';
            session.completedAt = new Date().toISOString();
            session.result = data; // Persist the true server-dictated object
            saveLocalSession(session);

            return data;
        } catch (e) {
            console.error("[E2E TRACE] Backend completion failed entirely.", e);
            throw e;
        }
    }
}

