export default function ExecutiveInsights() {
    return (
        <section className="section" style={{ paddingTop: '0' }}>
            <div className="container">
                <div className="axis-tick" style={{ top: '0' }}></div>
                <div className="section-content">
                    <div className="structural-block" style={{ borderTop: 'none', background: 'var(--bg-secondary)' }}>
                        <div className="crop-mark bottom-left"></div>
                        <div className="crop-mark bottom-right"></div>

                        <div className="sys-tag" style={{ color: 'var(--text-primary)', marginBottom: 'var(--sp-6)' }}>[LAW_001 // COHERENCE]</div>
                        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', margin: 0, fontWeight: 300, letterSpacing: '-0.02em' }}>
                            Growth is not an emotion,<br />
                            <span style={{ color: 'var(--text-secondary)' }}>it is a technical consequence of a well-designed architecture.</span>
                        </h2>

                        <div style={{ marginTop: 'var(--sp-10)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--sp-6)' }}>
                            <div className="sys-tag" style={{ marginBottom: 'var(--sp-2)' }}>[SYS_OUTCOME]</div>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-primary)', margin: 0, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                                Structural advantage that makes growth more predictable, resilient and scalable.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
