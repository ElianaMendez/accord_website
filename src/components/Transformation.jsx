export default function Transformation() {
    return (
        <section className="section">
            <div className="container">
                <div className="axis-tick" style={{ top: '64px' }}></div>
                <div className="section-content">
                    <div className="sys-tag" style={{ marginBottom: 'var(--sp-4)' }}>[SYS_AUDIT_LOG // CAPABILITY_DELTA]</div>
                    <h2 className="section-title">Organizational Transformation</h2>

                    <div className="transformation-matrix">
                        <div className="ledger-header">
                            <div>CAPABILITY DIMENSION</div>
                            <div>LEGACY STATE [FAILING]</div>
                            <div>TARGET_OS [ACTIVE]</div>
                        </div>

                        <div className="ledger-row align-top">
                            <div className="ledger-col-head" style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>System Architecture</div>
                            <div className="matrix-item legacy">
                                <span className="icon-x">×</span>
                                Sum of isolated efforts
                            </div>
                            <div className="matrix-item target">
                                <span className="icon-check">✓</span>
                                Operating System integration
                            </div>
                        </div>

                        <div className="ledger-row align-top">
                            <div className="ledger-col-head" style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Revenue Vector</div>
                            <div className="matrix-item legacy">
                                <span className="icon-x">×</span>
                                Fragile growth dependent on heroes
                            </div>
                            <div className="matrix-item target">
                                <span className="icon-check">✓</span>
                                Predictable, resilient growth
                            </div>
                        </div>

                        <div className="ledger-row align-top">
                            <div className="ledger-col-head" style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Data Observability</div>
                            <div className="matrix-item legacy">
                                <span className="icon-x">×</span>
                                Opaque data and lagging indicators
                            </div>
                            <div className="matrix-item target">
                                <span className="icon-check">✓</span>
                                Absolute operational transparency
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
