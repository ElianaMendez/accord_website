import React from 'react';
import './DiagnosticIntro.css';

export default function DiagnosticIntro({ onStartNew, onResume, isStarting, existingSession }) {
    return (
        <div className="diagnostic-intro">
            <div className="sys-tag intro-tag">[PROCESS_INITIATED]</div>
            <h1 className="intro-title">ACCORD EXECUTIVE DIAGNOSTIC</h1>

            <p className="intro-statement">
                Understand the architecture behind your commercial capability.
            </p>

            <p className="intro-support">
                This diagnostic examines the organizational conditions that determine how reliably your company can create, execute and sustain commercial growth.
            </p>

            <div className="process-indicator">
                <div className="process-step">
                    <span className="step-num">01</span>
                    <span className="step-name">COMPANY CONTEXT</span>
                </div>
                <div className="process-step">
                    <span className="step-num">02</span>
                    <span className="step-name">COMMERCIAL CAPABILITY</span>
                </div>
                <div className="process-step">
                    <span className="step-num">03</span>
                    <span className="step-name">SYSTEM ANALYSIS</span>
                </div>
                <div className="process-step opacity-low">
                    <span className="step-num">04</span>
                    <span className="step-name">CAPABILITY PROFILE</span>
                </div>
            </div>

            {existingSession ? (
                <div className="resume-prompt" style={{ marginTop: 'var(--sp-8)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>You have an incomplete diagnostic session.</p>
                    <div className="step-footer" style={{ marginTop: 0, paddingBottom: 'var(--sp-4)', borderTop: 'none' }}>
                        <button className="btn-secondary" onClick={onResume} disabled={isStarting}>
                            [ Resume Session ]
                        </button>
                        <button className="btn-next" onClick={onStartNew} disabled={isStarting}>
                            {isStarting ? 'Initializing...' : 'Start New Session'}
                        </button>
                    </div>
                </div>
            ) : (
                <button className="btn-premium btn-start" onClick={onStartNew} disabled={isStarting}>
                    {isStarting ? 'Initializing...' : 'Begin Diagnostic'}
                </button>
            )}
        </div>
    );
}
