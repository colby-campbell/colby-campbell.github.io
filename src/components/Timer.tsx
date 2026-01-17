import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type TimerProps = {
  onStart: () => void
  onPause: () => void
  onStop: () => void
}


function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}


type Mode = "focus" | "break"

function getStoredMinutes(key: "focusMinutes" | "breakMinutes", fallback: number){
    const raw = localStorage.getItem(key)
    const n = Math.floor(Number(raw))
    return Number.isFinite(n) && n > 0 ? n : fallback
}

function Timer({ onStart, onPause, onStop }: TimerProps) {
  const navigate = useNavigate()

  //25 and 5 default settings for now
  const [focusMinutes, setFocusMinutes] = useState<number>(() => getStoredMinutes("focusMinutes", 25))
  const [breakMinutes, setBreakMinutes] = useState<number>(() => getStoredMinutes("breakMinutes", 5))

  //focus mode
  const [mode, setMode] = useState<Mode>("focus")
  const [secondsLeft, setSecondsLeft] = useState<number>(() => focusMinutes * 60)

  const [running, setRunning] = useState<boolean>(false)

  const intervalRef = useRef<number | null>(null)
  
  // input field for minutes
  const [inputMinutes, setInputMinutes] = useState<string>(String(focusMinutes))

    useEffect(() => {
    const f = getStoredMinutes("focusMinutes", 25)
    const b = getStoredMinutes("breakMinutes", 5)
    setFocusMinutes(f)
    setBreakMinutes(b)
    setMode("focus")
    setSecondsLeft(f * 60)
    setRunning(false)
  }, [])

  // keep input synced with current mode
  useEffect(() => {
    setInputMinutes(String(mode === "focus" ? focusMinutes : breakMinutes))
  }, [mode, focusMinutes, breakMinutes])

  // Handle timer ticking
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

  // When time reaches 0 → switch modes and reset
  useEffect(() => {
    if (secondsLeft !== 0) return

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    const nextMode: Mode = mode === "focus" ? "break" : "focus"
    setMode(nextMode)

    const nextSeconds = (nextMode === "focus" ? focusMinutes : breakMinutes) * 60
    setSecondsLeft(nextSeconds)

    // keep running state as-is
    setRunning((r) => r)

    // stop music once per transition
    onStop()
  }, [secondsLeft, mode, focusMinutes, breakMinutes, onStop])

  const toggle = () => {
  setRunning((r) => {
    const next = !r

    if (next) {
      onStart()   // resume / start
    } else {
      onPause()   // pause ONLY
    }

    return next
  })
}

  // apply minutes from input to current mode
  const handleSet = () => {
    const n = Math.max(0, Math.floor(Number(inputMinutes)))
    if (!Number.isFinite(n)) return

    if (mode === "focus") {
      setFocusMinutes(n)
      localStorage.setItem("focusMinutes", String(n))
    } else {
      setBreakMinutes(n)
      localStorage.setItem("breakMinutes", String(n))
    }
    setSecondsLeft(n * 60)
  }


  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setRunning(false)
    setMode("focus")
    setSecondsLeft(focusMinutes * 60)
    onStop() // 🔇 stop music
  }

  const label = mode === "focus" ? "Focus" : "Break"

  return (
    <main className="timer">
      {/* settings button */}
      <button
        className="settings-btn"
        onClick={() => navigate('/settings')}
        aria-label="Open settings"
      >
        ⚙️
      </button>

       {/* info button */}
      <button
        className="info-btn"
        onClick={() => navigate('/info')}
        aria-label="Open info page"
      >
        💡
      </button>

      <header className="timer__header">
        <h1>timeblind</h1>
        <div aria-label="current mode" style={{ opacity: 0.8 }}>{label}</div>
      </header>

      <section className="timer__display" aria-live="polite">
        <div className="time">{formatTime(secondsLeft)}</div>
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

        <small style={{ opacity: 0.75 }}>
          Focus: {focusMinutes}m • Break: {breakMinutes}m
        </small>
      </section>

      <footer className="timer__footer">
        <small>Tip: Adjust durations in Settings.</small>
      </footer>
    </main>
  )
}

export default Timer
