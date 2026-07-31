export default function Hero() {
  return (
    <section className="section hero-section">
      <div className="container">
        {/* Structural ticks to increase precision feel */}
        <div className="axis-tick" style={{ top: '30vh' }}></div>
        <div className="axis-tick" style={{ top: '55vh' }}></div>
        <div className="axis-tick" style={{ top: '80vh' }}></div>
        
        <div className="section-content">
          <div className="hero-grid">
            <div className="hero-intro">
               <div className="sys-tag" style={{ marginBottom: 'var(--sp-6)' }}>
                 [DIAGNOSTIC_MODE // THREAD_01: REVENUE_STAGNATION]
               </div>
               <h1 className="hero-title">Your company does<br />not have a sales problem.</h1>
            </div>
            
            <div className="hero-revelation" style={{ marginTop: 'var(--sp-16)' }}>
               <div className="sys-tag" style={{ marginBottom: 'var(--sp-3)', color: 'var(--text-secondary)' }}>
                 [ROOT_CAUSE_ISOLATED]
               </div>
               <p className="hero-subtitle">It has an <span className="highlight">organizational capability</span> problem.</p>
            </div>

            <div className="hero-action" style={{ marginTop: 'var(--sp-20)' }}>
              <div className="sys-tag" style={{ marginBottom: 'var(--sp-3)', display: 'block' }}>[AWAITING_INPUT // RUN_CMD]</div>
              <button className="btn-structural">
                <span className="terminal-prompt-char">&gt;&nbsp;</span>
                <span className="terminal-text">ACCESS_ACCORD_OS</span>
                <span className="terminal-cursor"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
