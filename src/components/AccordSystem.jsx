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
                    <div className="system-subtitle" style={{ maxWidth: '800px' }}>
                        <p style={{ margin: '0 0 var(--sp-6) 0' }}>A commercial operating system that turns fragmented sales organizations into structured, scalable commercial capabilities.</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
                            <div style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'baseline' }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', width: '160px', flexShrink: 0 }}>[TARGET_PROFILE]</span>
                                <span style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>Built for B2B companies where growth depends on complex, high-value commercial execution.</span>
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'baseline' }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', width: '160px', flexShrink: 0 }}>[SYSTEM_PAYLOAD]</span>
                                <span style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>Installs the infrastructure required to make commercial capability repeatable: operating processes, CRM, intelligence and governance.</span>
                            </div>
                        </div>
                    </div>
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
                                                <h3 className="arch-node-title">Diagnose where capability and capital are leaking.</h3>
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
                                                <h3 className="arch-node-title">Design the commercial infrastructure required to close those structural gaps.</h3>
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
                                        <h3 className="arch-node-title">Install the operating infrastructure, including processes, CRM and operational execution.</h3>
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
                                    <h3 className="arch-node-title">Introduce intelligence and AI capabilities across the system.</h3>
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
                                <h3 className="arch-node-title" style={{ maxWidth: '600px' }}>Govern, optimize and evolve the installed capability.</h3>
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
