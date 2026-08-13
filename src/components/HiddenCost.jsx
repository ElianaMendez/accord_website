import './HiddenCost.css';

export default function HiddenCost() {
    const dimensions = [
        { code: '[ERR_CAPACITY]', name: 'Executive Attention', desc: 'Diverted to micromanagement instead of strategic vision.' },
        { code: '[ERR_VARIANCE]', name: 'Predictability', desc: 'Replaced by monthly anxiety and subjective forecasts.' },
        { code: '[ERR_DATA_SILO]', name: 'Commercial Coherence', desc: 'Lost in fragmented tools and siloed departments.' },
        { code: '[ERR_LEVERAGE]', name: 'Margin', desc: 'Eroded by inefficiencies and lack of systemic leverage.' },
        { code: '[ERR_DEPENDENCY]', name: 'Organizational Resilience', desc: 'Compromised when structural continuity depends on individuals.' }
    ];

    return (
        <section className="section leakage-section">
            <div className="container">
                <div className="axis-tick" style={{ top: '64px' }}></div>
                <div className="section-content">
                    <div className="sys-tag" style={{ marginBottom: 'var(--sp-4)' }}>[SYS_COST_02 // SYSTEMIC_LEAKS]</div>
                    <h2 className="section-title">The Hidden Cost</h2>

                    <div style={{ marginTop: 'var(--sp-12)' }}>
                        <div style={{ paddingBottom: 'var(--sp-8)' }}>
                            <div className="section-heading-sm" style={{ marginBottom: 'var(--sp-2)' }}>Diagnostic Summary</div>
                            <h3 style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)', fontWeight: 300, color: 'var(--text-secondary)', maxWidth: '700px', lineHeight: 1.3 }}>
                                Systemic friction presents compounding yield loss across <span style={{ color: 'var(--text-primary)' }}>5 operational dimensions.</span>
                            </h3>
                        </div>

                        {/* Conceptual Diagram: Multi-input converging bus toward Systemic Leakage */}
                        <div className="leakage-diagram">
                            <div className="dimensions-stack">
                                {dimensions.map((dim, index) => (
                                    <div key={index} className="dim-row">
                                        <h4 className="dim-title">{dim.name}</h4>
                                        <span className="dim-tag">{dim.code}</span>
                                        <p className="dim-desc">{dim.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="friction-bus">
                                <div className="bus-spine"></div>
                                <div className="bus-label">YIELD_DEGRADATION // FRICTION_MULTIPLIER</div>
                                <div className="bus-output-line"></div>
                            </div>

                            <div className="leakage-target">
                                <div className="leakage-core-node">
                                    <span className="leakage-node-tag">[CRITICAL_FAILURE]</span>
                                    <h3 className="leakage-node-title">Systemic<br />Leakage</h3>
                                    <p className="leakage-node-desc">Uncoordinated operational dimensions create structural friction, perpetually eroding capital yield.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
