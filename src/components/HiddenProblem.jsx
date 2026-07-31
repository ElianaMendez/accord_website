export default function HiddenProblem() {
    return (
        <section className="section">
            <div className="container">
                <div className="axis-tick" style={{ top: '64px' }}></div>
                <div className="section-content">
                    <div className="sys-tag" style={{ marginBottom: 'var(--sp-4)' }}>[SYS_DIAG_01 // VULNERABILITY_DETECTED]</div>
                    <h2 className="section-title">The Hidden Problem</h2>

                    <div className="structural-block" style={{ marginTop: 'var(--sp-8)' }}>
                        <div className="crop-mark top-left"></div>
                        <div className="crop-mark top-right"></div>
                        <div className="crop-mark bottom-left"></div>
                        <div className="crop-mark bottom-right"></div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--sp-6)' }}>
                            <div>
                                <div className="section-heading-sm" style={{ marginBottom: 'var(--sp-2)' }}>Observation Context</div>
                                <h3 style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--text-primary)', marginBottom: '0' }}>Heroic Growth</h3>
                            </div>

                            <div className="blueprint-divider" style={{ margin: 'var(--sp-4) 0' }}>
                                <div className="divider-node"></div>
                                <div className="divider-line"></div>
                                <div className="divider-node"></div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--sp-8)' }}>
                                <div>
                                    <div className="ledger-col-head" style={{ marginBottom: 'var(--sp-2)' }}>Status</div>
                                    <div className="ledger-col-desc">Fragile / High Dependency</div>
                                </div>
                                <div>
                                    <div className="ledger-col-head" style={{ marginBottom: 'var(--sp-2)' }}>Root Cause</div>
                                    <div className="ledger-col-desc">Success vector depends entirely on excessive effort, willpower, and bandwidth of key individuals.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
