import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DiagnosticIntro from '../components/diagnostic/DiagnosticIntro';
import CompanyContext from '../components/diagnostic/CompanyContext';
import CommercialContext from '../components/diagnostic/CommercialContext';
import ExecutiveContext from '../components/diagnostic/ExecutiveContext';
import StrategicContext from '../components/diagnostic/StrategicContext';
import Questionnaire from '../components/diagnostic/Questionnaire';
import {
    initializeDiagnostic,
    updateDiagnosticState,
    getLocalSession,
    completeDiagnostic,
    recoverRemoteSession
} from '../logic/diagnosticStorage';
import { calculateScores } from '../logic/scoringEngine';
import { determineCapabilityLevel } from '../logic/capabilityLevelEngine';
import { identifyVulnerabilities } from '../logic/vulnerabilityEngine';
import { detectSystemicPattern } from '../logic/patternEngine';
import { getRecommendations } from '../logic/recommendationEngine';

import '../App.css';

export default function Diagnostic() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // UI state
    const urlStep = searchParams.get('step') || 'intro';

    const [sessionId, setSessionId] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isStarting, setIsStarting] = useState(false);
    const [existingSession, setExistingSession] = useState(null);
    const [isRecovering, setIsRecovering] = useState(true);

    const ranks = {
        'intro': 0, 'company': 1, 'commercial': 2, 'executive': 3, 'strategic': 4
    };
    const getRank = (val) => {
        if (!val) return 0;
        if (ranks[val] !== undefined) return ranks[val];
        if (val.startsWith('q')) return 4 + parseInt(val.substring(1));
        return -1;
    };

    const getUrlRank = () => {
        if (urlStep === 'intro') return ranks['intro'];
        if (urlStep === 'company_context') return ranks['company'];
        if (urlStep === 'commercial_context') return ranks['commercial'];
        if (urlStep === 'executive_context') return ranks['executive'];
        if (urlStep === 'strategic_context') return ranks['strategic'];
        if (urlStep === 'questionnaire') {
            const n = searchParams.get('n');
            if (n) return 4 + parseInt(n);
            return 5;
        }
        return 0; // Default
    };

    useEffect(() => {
        const init = async () => {
            setIsRecovering(true);
            const local = getLocalSession();
            let activeSession = null;

            if (local) {
                if (local.status === 'in_progress') {
                    activeSession = await recoverRemoteSession(local);
                } else if (local.status === 'started') {
                    activeSession = local;
                }
            } else {
                // If local storage is wiped, attempting to recover with null
                activeSession = await recoverRemoteSession(null);
            }

            // Completed session protection
            if (local?.status === 'completed' || activeSession?.status === 'completed') {
                navigate('/diagnostic/results');
                return;
            }

            if (activeSession) {
                setSessionId(activeSession.diagnosticId);
                setExistingSession(activeSession);

                // Route Protection: Prevent skipping ahead
                const userProgressRank = getRank(activeSession.last_completed_step);
                const AttemptedRank = getUrlRank();

                // Allow them to be at exactly the next logica step (completed + 1)
                // If they attempt to skip higher than completed + 1, revert to their valid next step
                if (AttemptedRank > userProgressRank + 1) {
                    navigate('/diagnostic', { replace: true });
                }
            } else {
                // No active session: prevent deep URL access
                if (urlStep !== 'intro') {
                    navigate('/diagnostic', { replace: true });
                }
            }
            setIsRecovering(false);
        };
        init();
    }, [urlStep, searchParams, navigate]);

    const handleStartNew = async () => {
        if (isStarting) return;
        setIsStarting(true);
        try {
            const session = await initializeDiagnostic();
            setSessionId(session.diagnosticId);
            setExistingSession(session);
            setSearchParams({ step: 'company_context' });
        } finally {
            setIsStarting(false);
        }
    };

    const handleResume = () => {
        if (existingSession) {
            const last = existingSession.last_completed_step;
            let nextStep = 'company_context';
            let n = null;

            if (last === 'company') nextStep = 'commercial_context';
            else if (last === 'commercial') nextStep = 'executive_context';
            else if (last === 'executive') nextStep = 'strategic_context';
            else if (last === 'strategic') { nextStep = 'questionnaire'; n = '1'; }
            else if (last && last.startsWith('q')) {
                const qNum = parseInt(last.substring(1));
                nextStep = 'questionnaire';
                n = (qNum + 1).toString();
            }

            if (n) {
                setSearchParams({ step: nextStep, n });
            } else {
                setSearchParams({ step: nextStep });
            }
        }
    };

    const handleCompanyComplete = async (data) => {
        await updateDiagnosticState(sessionId, 'companyContext', data);
        setSearchParams({ step: 'commercial_context' });
    };

    const handleCommercialComplete = async (data) => {
        await updateDiagnosticState(sessionId, 'commercialContext', data);
        setSearchParams({ step: 'executive_context' });
    };

    const handleExecutiveComplete = async (data) => {
        await updateDiagnosticState(sessionId, 'executiveContext', data);
        setSearchParams({ step: 'strategic_context' });
    };

    const handleStrategicComplete = async (data) => {
        await updateDiagnosticState(sessionId, 'strategicContext', data);
        setSearchParams({ step: 'questionnaire', n: '1' });
    };

    const handleQuestionnaireComplete = async (responses) => {
        setIsProcessing(true);
        // Sync final responses up to Supabase before triggering completion
        await updateDiagnosticState(sessionId, 'responses', responses);

        try {
            // Process Results authoritatively through Postgres RPC
            // Expected to return the 100% computed structural dimension and pattern map
            await completeDiagnostic(sessionId);

            // Fake loading delay to mimic systemic calculation visualization
            setTimeout(() => {
                setIsProcessing(false);
                navigate('/diagnostic/results');
            }, 1500);
        } catch (error) {
            console.error("Diagnostic Finalization failed.", error);
            setIsProcessing(false);
            alert("Failed to finalize diagnostic result securely. Please ensure all 23 questions are answered or refresh the page.");
        }
    };

    return (
        <div className="app-layout">
            <div className="blueprint-layer"></div>

            <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--sp-8)' }}>

                {isProcessing || isRecovering ? (
                    <div className="processing-state" style={{ textAlign: 'center' }}>
                        <div className="sys-tag" style={{ marginBottom: 'var(--sp-4)' }}>
                            {isProcessing ? '[ANALYSIS_IN_PROGRESS]' : '[INITIALIZING_DIAGNOSTIC...]'}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                            {isProcessing ? 'Calculating systemic constraints...' : 'Synchronizing architectural state...'}
                        </div>
                    </div>
                ) : (
                    <>
                        {urlStep === 'intro' && <DiagnosticIntro onStartNew={handleStartNew} onResume={handleResume} isStarting={isStarting} existingSession={existingSession} />}
                        {urlStep === 'company_context' && <CompanyContext onComplete={handleCompanyComplete} defaultValues={existingSession?.companyContext || {}} />}
                        {urlStep === 'commercial_context' && <CommercialContext onComplete={handleCommercialComplete} defaultValues={existingSession?.commercialContext || {}} />}
                        {urlStep === 'executive_context' && <ExecutiveContext onComplete={handleExecutiveComplete} defaultValues={existingSession?.executiveContext || {}} />}
                        {urlStep === 'strategic_context' && <StrategicContext onComplete={handleStrategicComplete} defaultValues={existingSession?.strategicContext || {}} />}
                        {urlStep === 'questionnaire' && <Questionnaire onComplete={handleQuestionnaireComplete} sessionId={sessionId} />}
                    </>
                )}
            </main>
        </div>
    );
}
