import { useEffect, useRef, useState } from 'react';
import './AccordSystem.css';

export default function AccordSystem() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className={`section accord-system-section ${isVisible ? 'is-visible' : ''}`}>
            <div className="container">
                <div className="axis-tick" style={{ top: '64px' }}></div>

                <div className="system-intro">
                    <div className="sys-tag" style={{ marginBottom: 'var(--sp-4)' }}>[SYS_PIPE_03 // TRANSFORMATION_PROTOCOL]</div>
                    <h2 className="section-title system-title">The ACCORD System™</h2>
                    <p className="system-subtitle">One integrated transformation. Five sequential stages to construct permanent capability.</p>
                </div>

                <div className="system-architecture-canvas">
                    <div className="machine-stage stg-evolution">
                        <div className="machine-stage-label">[STG_05] EVOLUTION_PERIMETER</div>

                        <div className="machine-stage stg-intelligence">
                            <div className="machine-stage-label">[STG_04] INTELLIGENCE_LAYER</div>

                            <div className="machine-stage stg-build">
                                <div className="machine-stage-label">[STG_03] BUILD_RUNTIME</div>

                                <div className="machine-core-grid">
                                    <div className="machine-stage stg-assessment">
                                        <div className="machine-stage-label">[STG_01] ASSESSMENT</div>
                                        <div className="internal-stage-architecture">
                                            <div className="stage-data-port">
                                                <span className="port-label">CORE_OBJECTIVE</span>
                                                <h3 className="arch-node-title">Capital leak diagnosis and capability audit.</h3>
                                            </div>
                                            <div className="stage-data-port output-port">
                                                <span className="port-label">STATE_OUTPUT</span>
                                                <div className="arch-node-out">[OUT] SYS_VULN_MAP</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="routing-line-x"></div>

                                    <div className="machine-stage stg-blueprint">
                                        <div className="machine-stage-label">[STG_02] BLUEPRINT</div>
                                        <div className="internal-stage-architecture">
                                            <div className="stage-data-port">
                                                <span className="port-label">CORE_OBJECTIVE</span>
                                                <h3 className="arch-node-title">Architectural design of commercial infrastructure.</h3>
                                            </div>
                                            <div className="stage-data-port output-port">
                                                <span className="port-label">STATE_OUTPUT</span>
                                                <div className="arch-node-out">[OUT] ARCH_SCHEMATIC</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="internal-stage-architecture-row">
                                    <div className="stage-data-port">
                                        <span className="port-label">CORE_OBJECTIVE</span>
                                        <h3 className="arch-node-title">Technical implementation of operations and CRM.</h3>
                                    </div>
                                    <div className="stage-data-port output-port">
                                        <span className="port-label">STATE_OUTPUT</span>
                                        <div className="arch-node-out">[OUT] RUNTIME_CORE</div>
                                    </div>
                                </div>
                            </div>

                            <div className="internal-stage-architecture-row" style={{ marginTop: 'var(--sp-8)' }}>
                                <div className="stage-data-port">
                                    <span className="port-label">CORE_OBJECTIVE</span>
                                    <h3 className="arch-node-title">Deployment of transversal AI agents.</h3>
                                </div>
                                <div className="stage-data-port output-port">
                                    <span className="port-label">STATE_OUTPUT</span>
                                    <div className="arch-node-out">[OUT] AI_NODE_ACTIVE</div>
                                </div>
                            </div>
                        </div>

                        <div className="internal-stage-architecture-row" style={{ marginTop: 'var(--sp-8)' }}>
                            <div className="stage-data-port">
                                <span className="port-label">CORE_OBJECTIVE</span>
                                <h3 className="arch-node-title" style={{ maxWidth: '600px' }}>Continuous governance and margin optimization (CGO).</h3>
                            </div>
                            <div className="stage-data-port output-port" style={{ borderLeftColor: 'var(--accent-highlight)' }}>
                                <span className="port-label">STATE_OUTPUT</span>
                                <div className="arch-node-out" style={{ color: 'var(--accent-highlight)' }}>[OUT] OPTIMIZATION_LOOP</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
