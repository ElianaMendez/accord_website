import React from 'react';
import './DiagnosticIntro.css';

export default function DiagnosticIntro({ onStart }) {
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

            <button className="btn-premium btn-start" onClick={onStart}>
                Begin Diagnostic
            </button>
        </div>
    );
}
