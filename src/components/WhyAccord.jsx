export default function WhyAccord() {
    return (
        <section className="section">
            <div className="container">
                <div className="axis-tick" style={{ top: '64px' }}></div>
                <div className="section-content">
                    <div className="sys-tag" style={{ marginBottom: 'var(--sp-4)' }}>[SYS_POSTURE // ENGINEERING_THESIS]</div>

                    <div className="structural-block">
                        <div className="crop-mark top-left"></div>
                        <div className="crop-mark top-right"></div>
                        <div className="crop-mark bottom-left"></div>
                        <div className="crop-mark bottom-right"></div>

                        <h2 className="structural-heading">Authority through structure. <br />We design systems that beat heroes.</h2>
                        <div className="blueprint-divider" style={{ width: '40px', margin: 'var(--sp-6) 0' }}>
                            <div className="divider-line" style={{ background: 'var(--text-primary)' }}></div>
                        </div>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px' }}>
                            A rigorous engineering approach to commercial scaling, replacing strategic vulnerability and tactical hacks with absolute architectural coherence.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
