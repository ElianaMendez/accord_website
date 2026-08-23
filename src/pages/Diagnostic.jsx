import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const [step, setStep] = useState('intro');
    const [sessionId, setSessionId] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        // Authenticate/Recover flow: Restore auth -> Match Session -> Resume
        const init = async () => {
            const existing = getLocalSession();
            if (existing && existing.status === 'in_progress') {
                const verifiedSession = await recoverRemoteSession(existing);
                if (verifiedSession) {
                    setSessionId(verifiedSession.diagnosticId);
                    if (!verifiedSession.companyContext?.company_name) setStep('company_context');
                    else if (!verifiedSession.commercialContext?.annual_revenue_range) setStep('commercial_context');
                    else if (!verifiedSession.executiveContext?.email) setStep('executive_context');
                    else if (!verifiedSession.strategicContext?.primary_barrier) setStep('strategic_context');
                    else setStep('questionnaire');
                }
            }
        };
        init();
    }, []);

    const handleStart = async () => {
        const session = await initializeDiagnostic();
        setSessionId(session.diagnosticId);
        setStep('company_context');
    };

    const handleCompanyComplete = async (data) => {
        await updateDiagnosticState(sessionId, 'companyContext', data);
        setStep('commercial_context');
    };

    const handleCommercialComplete = async (data) => {
        await updateDiagnosticState(sessionId, 'commercialContext', data);
        setStep('executive_context');
    };

    const handleExecutiveComplete = async (data) => {
        await updateDiagnosticState(sessionId, 'executiveContext', data);
        setStep('strategic_context');
    };

    const handleStrategicComplete = async (data) => {
        await updateDiagnosticState(sessionId, 'strategicContext', data);
        setStep('questionnaire');
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

                {isProcessing ? (
                    <div className="processing-state" style={{ textAlign: 'center' }}>
                        <div className="sys-tag" style={{ marginBottom: 'var(--sp-4)' }}>[ANALYSIS_IN_PROGRESS]</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                            Calculating systemic constraints...
                        </div>
                    </div>
                ) : (
                    <>
                        {step === 'intro' && <DiagnosticIntro onStart={handleStart} />}
                        {step === 'company_context' && <CompanyContext onComplete={handleCompanyComplete} defaultValues={getLocalSession()?.companyContext} />}
                        {step === 'commercial_context' && <CommercialContext onComplete={handleCommercialComplete} defaultValues={getLocalSession()?.commercialContext} />}
                        {step === 'executive_context' && <ExecutiveContext onComplete={handleExecutiveComplete} defaultValues={getLocalSession()?.executiveContext} />}
                        {step === 'strategic_context' && <StrategicContext onComplete={handleStrategicComplete} defaultValues={getLocalSession()?.strategicContext} />}
                        {step === 'questionnaire' && <Questionnaire onComplete={handleQuestionnaireComplete} />}
                    </>
                )}
            </main>
        </div>
    );
}
