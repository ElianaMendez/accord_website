export default function AssessmentCTA() {
    return (
        <section className="section terminal-footer">
            <div className="container">
                <div className="axis-tick" style={{ top: '50%' }}></div>
                <div className="section-content">
                    <div className="sys-tag" style={{ marginBottom: 'var(--sp-8)', color: 'var(--text-primary)' }}>ACTIVATE_PROTOCOL: ACCORD_ASSESSMENT</div>

                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: 'var(--sp-6)', maxWidth: '900px', fontWeight: 300, letterSpacing: '-0.02em' }}>
                        Discover your true systemic capability.
                    </h2>

                    <div className="terminal-prompt" style={{ marginTop: 'var(--sp-12)' }}>
                        <span className="sys-tag" style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>USER_SYS@ACCORD_HQ:~#</span>
                        <div style={{ flex: 1, borderBottom: '1px solid var(--border-highlight)', position: 'relative' }}>
                            <span style={{ position: 'absolute', bottom: '8px', left: 0, fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>Awaiting execution command...</span>
                        </div>
                        <button className="btn-premium">Execute Audit</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
