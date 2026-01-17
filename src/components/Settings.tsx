import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Settings() {
  const navigate = useNavigate()

  const [focusMinutes, setFocusMinutes] = useState(() => localStorage.getItem("focusMinutes") ?? "25")
  const [breakMinutes, setBreakMinutes] = useState(() => localStorage.getItem("breakMinutes") ?? "5")

  const save = () => {
    const f = String(Math.max(1, Math.floor(Number(focusMinutes) || 0)))
    const b = String(Math.max(1, Math.floor(Number(breakMinutes) || 0)))
    localStorage.setItem("focusMinutes", f)
    localStorage.setItem("breakMinutes", b)
    navigate("/")
  }

  return (
    <main style={{ padding: 24 }}>
      <h2>Settings</h2>

      <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
        <label>
          Focus (minutes)
          <input type="number" min={1} value={focusMinutes} onChange={(e) => setFocusMinutes(e.target.value)} />
        </label>

        <label>
          Break (minutes)
          <input type="number" min={1} value={breakMinutes} onChange={(e) => setBreakMinutes(e.target.value)} />
        </label>

        <button onClick={save}>Save</button>
      </div>
    </main>
  )
}