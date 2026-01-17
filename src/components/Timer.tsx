import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function Timer() {
  const navigate = useNavigate()
  const [inputMinutes, setInputMinutes] = useState<string>('25')
  const [secondsLeft, setSecondsLeft] = useState<number>(25 * 60)
  const [running, setRunning] = useState<boolean>(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (!running) return
    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [running])

  useEffect(() => {
    if (secondsLeft === 0 && intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setRunning(false)
    }
  }, [secondsLeft])

  const handleSet = () => {
    const mins = Math.max(0, Math.floor(Number(inputMinutes) || 0))
    setSecondsLeft(mins * 60)
  }

  const toggle = () => setRunning((r) => !r)
  const reset = () => {
    const mins = Math.max(0, Math.floor(Number(inputMinutes) || 0))
    setSecondsLeft(mins * 60)
    setRunning(false)
  }

  return (
    <main className="timer">
      {/* corner button */}
      <button
        className="settings-btn"
        onClick={() => navigate('/settings')}
        aria-label="Open settings"
      >
        ⚙️
      </button>
      <header className="timer__header">
        <h1>timeblind</h1>
      </header>

      <section className="timer__display" aria-live="polite">
        <div className="time" data-testid="time-output">{formatTime(secondsLeft)}</div>
      </section>

      <section className="timer__controls">
        <div className="control-row">
          <label htmlFor="minutes">Minutes</label>
          <input
            id="minutes"
            type="number"
            min={0}
            value={inputMinutes}
            onChange={(e) => setInputMinutes(e.target.value)}
          />
          <button className="btn" onClick={handleSet}>Set</button>
        </div>
        <div className="control-row">
          <button className="btn btn-primary" onClick={toggle}>
            {running ? 'Pause' : 'Start'}
          </button>
          <button className="btn" onClick={reset}>Reset</button>
        </div>
      </section>

      <footer className="timer__footer">
        <small>Tip: Use Set to apply changes before starting.</small>
      </footer>
    </main>
  )
}

export default Timer
