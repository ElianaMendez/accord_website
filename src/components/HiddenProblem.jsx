import './HiddenProblem.css';

export default function HiddenProblem() {
    return (
        <section className="section vulnerability-section">
            <div className="container">
                <div className="axis-tick" style={{ top: '64px' }}></div>

                <div className="sys-tag" style={{ marginBottom: 'var(--sp-4)' }}>[SYS_DIAG_01 // VULNERABILITY_DETECTED]</div>
                <h2 className="section-title">The Hidden Problem</h2>

                {/* Conceptual Diagram: Dependency */}
                <div className="dependency-diagram">
                    <div className="critical-node">
                        <div className="critical-node-tag">[DEPENDENCY_NODE: FOUNDER / KEY_TALENT]</div>
                        <h3 className="critical-node-title">Heroic Growth</h3>
                    </div>

                    <div className="load-axis"></div>
                    <div className="load-distributor">
                        <div className="load-distributor-center"></div>
                    </div>

                    <div className="dependent-nodes-grid">
                        <div className="dependent-node">
                            <h4 className="dependent-node-title">Revenue</h4>
                            <div className="dependent-node-desc">Manual sales motion</div>
                        </div>
                        <div className="dependent-node">
                            <h4 className="dependent-node-title">Execution</h4>
                            <div className="dependent-node-desc">Undocumented process</div>
                        </div>
                        <div className="dependent-node">
                            <h4 className="dependent-node-title">Strategy</h4>
                            <div className="dependent-node-desc">Siloed decisions</div>
                        </div>
                    </div>
                </div>

                <div className="problem-narrative">
                    <div className="problem-narrative-title">Fragile Architecture</div>
                    <div className="problem-narrative-desc">
                        Success vector depends entirely on excessive effort, willpower, and bandwidth of key individuals. The organic structure itself is a bottleneck.
                    </div>
                </div>
            </div>
        </section>
    );
}
