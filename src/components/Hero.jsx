import './Hero.css';

export default function Hero() {
  return (
    <section className="section hero-section">
      <div className="container">
        <div className="axis-tick" style={{ top: '50%' }}></div>

        {/* Subtle architectural frame cue for the Hero */}
        <div style={{ position: 'absolute', top: '10%', left: '0', width: '1px', height: '80%', background: 'linear-gradient(to bottom, transparent, var(--border-highlight), transparent)', zIndex: '-1' }}></div>

        <div className="hero-content-wrapper">
          {/* Structural bracket anchored strictly to grid */}
          <div style={{ position: 'absolute', top: '-24px', left: '0', width: '24px', height: '1px', background: 'var(--border-subtle)' }}></div>
          <div style={{ position: 'absolute', top: '-24px', left: '0', width: '1px', height: '48px', background: 'var(--border-subtle)' }}></div>

          <div className="hero-sys-tag">[SYS_INIT: ACCORD_HQ // CGO_PORTAL]</div>

          <h1 className="hero-diagnosis">
            Your company does not have a sales problem.
          </h1>

          <div className="reframe-connector"></div>

          <h2 className="hero-reframe">
            It has an organizational capability problem.
          </h2>

          <div className="hero-command-group">
            <div className="hero-cmd-tag">
              <div className="hero-cmd-indicator"></div>
              [AWAITING_INPUT // RUN_CMD]
            </div>
            <button className="btn-command">Initiate System</button>
          </div>
        </div>
      </div>
    </section>
  );
}
