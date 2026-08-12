export default function Hero() {
  return (
    <section className="section hero-section">
      <div className="container">
        <div className="axis-tick" style={{ top: '35vh' }}></div>
        <div className="section-content">
          <div className="sys-tag" style={{ marginBottom: 'var(--sp-4)' }}>[SYS_INIT: ACCORD_HQ // CGO_PORTAL]</div>
          <h1 className="hero-title">Your company does not have a sales problem.</h1>
          <p className="hero-subtitle">It has an <span className="highlight">organizational capability</span> problem.</p>

          <div style={{ marginTop: 'var(--sp-12)' }}>
            <div className="sys-tag" style={{ marginBottom: 'var(--sp-2)', display: 'block' }}>[AWAITING_INPUT // RUN_CMD]</div>
            <button className="btn-premium">Initiate System</button>
          </div>
        </div>
      </div>
    </section>
  );
}
