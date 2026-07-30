export default function HiddenCost() {
    return (
        <section className="section">
            <div className="container">
                <div className="axis-tick" style={{ top: '64px' }}></div>
                <div className="section-content">
                    <div className="sys-tag" style={{ marginBottom: 'var(--sp-4)' }}>[SYS_COST_02 // SYSTEMIC_LEAKS]</div>
                    <h2 className="section-title">The Hidden Cost</h2>

                    <div className="cost-architecture">
                        {/* Ledger Header */}
                        <div className="ledger-header">
                            <div>DIMENSION</div>
                            <div>SYSTEMIC SYMPTOM</div>
                            <div>IMPACT LOG</div>
                        </div>

                        {/* Ledger Rows */}
                        <div className="ledger-row">
                            <div className="ledger-col-head">Executive Attention</div>
                            <div className="ledger-col-desc">Diverted to micromanagement instead of strategic vision.</div>
                            <div className="ledger-col-tag"><span className="sys-tag">[ERR_CAPACITY]</span></div>
                        </div>
                        <div className="ledger-row">
                            <div className="ledger-col-head">Predictability</div>
                            <div className="ledger-col-desc">Replaced by monthly anxiety and subjective forecasts.</div>
                            <div className="ledger-col-tag"><span className="sys-tag">[ERR_VARIANCE]</span></div>
                        </div>
                        <div className="ledger-row">
                            <div className="ledger-col-head">Commercial Coherence</div>
                            <div className="ledger-col-desc">Lost in fragmented tools and siloed departments.</div>
                            <div className="ledger-col-tag"><span className="sys-tag">[ERR_DATA_SILO]</span></div>
                        </div>
                        <div className="ledger-row">
                            <div className="ledger-col-head">Margin</div>
                            <div className="ledger-col-desc">Eroded by inefficiencies and lack of systemic leverage.</div>
                            <div className="ledger-col-tag"><span className="sys-tag">[ERR_LEVERAGE]</span></div>
                        </div>
                        <div className="ledger-row">
                            <div className="ledger-col-head">Organizational Resilience</div>
                            <div className="ledger-col-desc">Compromised when star performers hold the system hostage.</div>
                            <div className="ledger-col-tag"><span className="sys-tag">[ERR_DEPENDENCY]</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
