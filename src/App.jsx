import './App.css'

const features = [
  {
    number: '01',
    title: 'React at the core',
    description:
      'A clean component structure powered by React 19 and Vite, ready for your real content and product logic.',
  },
  {
    number: '02',
    title: 'Built for every screen',
    description:
      'Responsive layouts, accessible controls, and sensible defaults from mobile through wide desktop displays.',
  },
  {
    number: '03',
    title: 'Free-tier friendly',
    description:
      'A static build with no paid add-ons, server functions, database, or hidden infrastructure to maintain.',
  },
]

const pipeline = [
  'Push to master',
  'GitHub Actions verifies the build',
  'Netlify publishes dist',
]

function Mark() {
  return (
    <svg
      aria-hidden="true"
      className="brand-mark"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path d="M5 25.5 15.75 5 27 25.5H5Z" stroke="currentColor" strokeWidth="2" />
      <path d="m10.5 20 5.25-10 5.5 10H10.5Z" fill="currentColor" />
    </svg>
  )
}

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function App() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Launchpad home">
          <Mark />
          <span>Launchpad</span>
        </a>

        <nav aria-label="Primary navigation">
          <a href="#stack">Stack</a>
          <a href="#pipeline">Pipeline</a>
          <a className="nav-cta" href="#launch">
            Start here
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span aria-hidden="true" /> React + Netlify
            </p>
            <h1 id="hero-title">A sharper starting point for the web.</h1>
            <p className="hero-lede">
              A fast, focused React foundation with the deployment pipeline
              already wired. Replace the copy, shape the design, and ship.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#launch">
                Make it yours <Arrow />
              </a>
              <a
                className="button button-secondary"
                href="https://react.dev/"
                target="_blank"
                rel="noreferrer"
              >
                React documentation
              </a>
            </div>

            <dl className="hero-stats" aria-label="Project highlights">
              <div>
                <dt>Framework</dt>
                <dd>React 19</dd>
              </div>
              <div>
                <dt>Build</dt>
                <dd>Vite</dd>
              </div>
              <div>
                <dt>Hosting</dt>
                <dd>$0 ready</dd>
              </div>
            </dl>
          </div>

          <div className="build-card" aria-label="Example deployment output">
            <div className="build-card-header">
              <span>production-deploy.yml</span>
              <span className="status-pill">
                <span aria-hidden="true" /> Ready
              </span>
            </div>
            <div className="build-output">
              <p>
                <span className="line-number">01</span>
                <span className="command">npm ci</span>
              </p>
              <p>
                <span className="line-number">02</span>
                <span className="success">✓ dependencies installed</span>
              </p>
              <p>
                <span className="line-number">03</span>
                <span className="command">npm run build</span>
              </p>
              <p>
                <span className="line-number">04</span>
                <span className="success">✓ dist generated</span>
              </p>
              <p>
                <span className="line-number">05</span>
                <span className="command">deploy --prod</span>
              </p>
              <p>
                <span className="line-number">06</span>
                <span className="success">✓ site is live</span>
              </p>
            </div>
            <div className="build-card-footer">
              <span>GitHub Actions</span>
              <span>Netlify CDN</span>
            </div>
          </div>
        </section>

        <section className="feature-section section-wrap" id="stack">
          <div className="section-heading">
            <p className="eyebrow">The foundation</p>
            <h2>Everything needed to begin. Nothing you need to undo.</h2>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.number}>
                <span className="feature-number">{feature.number}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pipeline-section section-wrap" id="pipeline">
          <div className="pipeline-copy">
            <p className="eyebrow">Continuous delivery</p>
            <h2>Commit once. Let the pipeline handle the rest.</h2>
            <p>
              The same GitHub Actions and Netlify deployment approach used by
              tristansly.com is included from day one.
            </p>
          </div>

          <ol className="pipeline-list">
            {pipeline.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </section>

        <section className="launch-section section-wrap" id="launch">
          <div>
            <p className="eyebrow">Your next move</p>
            <h2>Turn this starter into your site.</h2>
          </div>
          <div className="launch-command" aria-label="Local development command">
            <code>npm run dev</code>
            <span>then edit src/App.jsx</span>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="brand" href="#top">
          <Mark />
          <span>Launchpad</span>
        </a>
        <p>React foundation. Netlify delivery. Ready to shape.</p>
      </footer>
    </div>
  )
}

export default App
