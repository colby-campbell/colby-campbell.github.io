import { Link } from 'react-router-dom'

function Landing() {
  return (
    <main className="landing">
      <header className="landing__header">
        <h1>timeblind</h1>
        <p className="landing__subtitle">A customizable timer for focus sessions, mindful breaks, and nervous-system resets.</p>
      </header>

      <section className="landing__content">
        <div className="landing__actions">
          <Link className="btn btn-primary" to="/timer">Start Timer</Link>
        </div>
      </section>

      <footer className="landing__footer">
        <small>Built with Vite + React</small>
      </footer>
    </main>
  )
}

export default Landing

/*
delete file?
*/