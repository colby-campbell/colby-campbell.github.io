import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Stack from "@mui/material/Stack"
import Slider from "@mui/material/Slider"
import VolumeDown from "@mui/icons-material/VolumeDown"
import VolumeUp from "@mui/icons-material/VolumeUp"

export default function Settings() {
  const navigate = useNavigate()

  const [focusMinutes, setFocusMinutes] = useState(() => localStorage.getItem("focusMinutes") ?? "25")
  const [breakMinutes, setBreakMinutes] = useState(() => localStorage.getItem("breakMinutes") ?? "5")
  const [volume, setVolume] = useState(() => Number(localStorage.getItem("volume") ?? 50))

  const save = () => {
    const f = String(Math.max(1, Math.floor(Number(focusMinutes) || 0)))
    const b = String(Math.max(1, Math.floor(Number(breakMinutes) || 0)))
    localStorage.setItem("focusMinutes", f)
    localStorage.setItem("breakMinutes", b)
    navigate("/")
  }

  const handleChange = (_: Event, newValue: number | number[]) => {
    setVolume(newValue as number)
    localStorage.setItem("volume", String(newValue))
  }

  return (
    <main style={{ padding: 24 }}>
      <h2>Settings</h2>

      {/* Volume Slider */}
      <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
        <VolumeDown />
        <Slider aria-label="Volume" value={volume} onChange={handleChange} />
        <VolumeUp />
      </Stack>

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