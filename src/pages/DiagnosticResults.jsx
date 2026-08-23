import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalSession } from '../logic/diagnosticStorage';
import { DIMENSIONS } from '../logic/diagnosticQuestions';
import './DiagnosticResults.css';

export default function DiagnosticResults() {
    const navigate = useNavigate();
    const [session, setSession] = useState(null);

    useEffect(() => {
        const currentSession = getLocalSession();
        if (!currentSession || currentSession.status !== 'completed' || !currentSession.result) {
            navigate('/diagnostic');
            return;
        }
        setSession(currentSession);
    }, [navigate]);

    if (!session) return null;

    const res = session.result;
    const { dimensionScores, overallScore, capabilityLevel, primaryVulnerability, systemicPattern, recommendations } = res;

    // Render bars
    const renderDimension = (dimKey) => {
        const score = dimensionScores[dimKey]?.normalizedScore || 0;
        const def = DIMENSIONS[dimKey];
        return (
            <div key={dimKey} className="result-row">
                <div className="res-dim-label">
                    <span className="res-dim-tag">{def.id.slice(0, 3).toUpperCase()}</span>
                    <span className="res-dim-name">{def.name}</span>
                </div>
                <div className="res-bar-container">
                    <div className="res-bar" style={{ width: `${score}%` }}></div>
                    {/* Threshold markers */}
                    <div className="marker" style={{ left: '25%' }}></div>
                    <div className="marker" style={{ left: '50%' }}></div>
                    <div className="marker" style={{ left: '75%' }}></div>
                </div>
                <div className="res-score-number">{score}</div>
            </div>
        );
    };

    return (
        <div className="app-layout">
            <div className="blueprint-layer"></div>

            <main className="results-main">
                <div className="results-container">

                    <header className="res-header">
                        <div className="sys-tag">[ANALYSIS_COMPLETE]</div>
                        <h1 className="res-title">Capability Architecture</h1>
                        <p className="res-subtitle">Systemic analysis of {session.companyContext?.company_name || 'Organization'}'s commercial capability.</p>
                    </header>

                    <div className="res-ledger">
                        <div className="res-primary-stat">
                            <div className="stat-label">Systemic Capability Level</div>
                            <div className="stat-value capability-level">{capabilityLevel}</div>
                            <div className="stat-sub">Overall Readiness: {overallScore}/100</div>
                        </div>

                        {systemicPattern && (
                            <div className="res-pattern-alert">
                                <span className="pattern-tag">[SYSTEMIC_PATTERN_DETECTED]</span>
                                <p className="pattern-desc">{systemicPattern.description}</p>
                            </div>
                        )}
                    </div>

                    <section className="res-dimensions-section">
                        <h2 className="section-title">Structural Analysis</h2>
                        <div className="dimensions-list">
                            {Object.keys(DIMENSIONS).map(renderDimension)}
                        </div>
                        <div className="legend">
                            <span>0-25: Vulnerable</span>
                            <span>26-50: Fragmented</span>
                            <span>51-75: Structured</span>
                            <span>76-100: Integrated</span>
                        </div>
                    </section>

                    <section className="res-executive-brief">
                        <h2 className="section-title">Executive Priority</h2>
                        <div className="brief-content">
                            <div className="brief-focus">
                                <span className="focus-label">Focus Area</span>
                                <h3>{recommendations.focusArea}</h3>
                            </div>
                            <div className="brief-details">
                                <p><strong>Interpretation:</strong> {recommendations.interpretation}</p>
                                <p><strong>Strategic Implication:</strong> {recommendations.implication}</p>
                            </div>
                        </div>
                    </section>

                    <div className="res-action-footer">
                        <p className="action-note">Results have been securely preserved. End-to-end encryption active.</p>
                        <button className="btn-premium" onClick={() => navigate('/diagnostic/consultation')}>
                            Request Architecture Consultation
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
}
