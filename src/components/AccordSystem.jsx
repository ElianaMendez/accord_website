export default function AccordSystem() {
    return (
        <section className="section">
            <div className="container">
                <div className="axis-tick" style={{ top: '64px' }}></div>
                <div className="section-content">
                    <div className="sys-tag" style={{ marginBottom: 'var(--sp-4)' }}>[SYS_PIPE_03 // TRANSFORMATION_PROTOCOL]</div>
                    <h2 className="section-title">The ACCORD System™</h2>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>One integrated transformation. Five sequential stages to construct permanent capability.</p>

                    <div className="system-pipeline">
                        <div className="stage-block">
                            <div className="stage-connector"></div>
                            <div className="stage-indicator"></div>
                            <div className="stage-details">
                                <span className="sys-tag">[STG_01]</span>
                                <div>
                                    <h3>Assessment</h3>
                                    <p>Capital leak diagnosis and capability audit.</p>
                                    <div className="sys-tag" style={{ marginTop: 'var(--sp-2)' }}>OUT: SYS_VULN_MAP</div>
                                </div>
                            </div>
                        </div>

                        <div className="stage-block">
                            <div className="stage-connector"></div>
                            <div className="stage-indicator"></div>
                            <div className="stage-details">
                                <span className="sys-tag">[STG_02]</span>
                                <div>
                                    <h3>Blueprint</h3>
                                    <p>Architectural design of your commercial infrastructure.</p>
                                    <div className="sys-tag" style={{ marginTop: 'var(--sp-2)' }}>OUT: ARCH_SCHEMATIC</div>
                                </div>
                            </div>
                        </div>

                        <div className="stage-block">
                            <div className="stage-connector"></div>
                            <div className="stage-indicator"></div>
                            <div className="stage-details">
                                <span className="sys-tag">[STG_03]</span>
                                <div>
                                    <h3>Build (OS)</h3>
                                    <p>Technical implementation of operations and CRM.</p>
                                    <div className="sys-tag" style={{ marginTop: 'var(--sp-2)' }}>OUT: RUNTIME_CORE</div>
                                </div>
                            </div>
                        </div>

                        <div className="stage-block">
                            <div className="stage-connector"></div>
                            <div className="stage-indicator"></div>
                            <div className="stage-details">
                                <span className="sys-tag">[STG_04]</span>
                                <div>
                                    <h3>Intelligence</h3>
                                    <p>Deployment of transversal AI agents.</p>
                                    <div className="sys-tag" style={{ marginTop: 'var(--sp-2)' }}>OUT: AI_NODE_ACTIVE</div>
                                </div>
                            </div>
                        </div>

                        <div className="stage-block">
                            <div className="stage-connector"></div>
                            <div className="stage-indicator"></div>
                            <div className="stage-details">
                                <span className="sys-tag">[STG_05]</span>
                                <div>
                                    <h3>Evolution</h3>
                                    <p>Continuous governance and margin optimization (CGO).</p>
                                    <div className="sys-tag" style={{ marginTop: 'var(--sp-2)' }}>OUT: OPTIMIZATION_LOOP</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
