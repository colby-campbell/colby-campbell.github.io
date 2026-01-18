import { Route, Routes } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Timer from './components/Timer'
import Settings from './components/Settings'
import Info from './components/Info'
import './App.css'

import { SOUND_SOURCES } from './music/catalog'
import type { SoundChoice } from './music/catalog'

function App() {
  const audioRef = useRef<HTMLAudioElement>(null)

  // Hard-coded choice for now
  const choice: SoundChoice = "rain"

  // Initialize queue from choice
  const [queue, setQueue] = useState<string[]>(() => [
    ...SOUND_SOURCES[choice],
  ])

  const [playing, setPlaying] = useState(false)

  // Load current track
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || queue.length === 0) return

    audio.src = queue[0]
    audio.load()

    if (playing) {
      audio.play().catch(() => {})
    }
  }, [queue, playing])

  // Rotate queue (even length 1)
  const handleEnded = () => {
    setQueue((prev) => {
      if (prev.length === 0) return prev
      const [finished, ...rest] = prev
      return [...rest, finished]
    })
  }

  const startMusic = () => {
    setPlaying(true)
    audioRef.current?.play().catch(() => {})
  }

  const pauseMusic = () => {
    setPlaying(false)
    audioRef.current?.pause()
  }

  const stopMusic = () => {
    setPlaying(false)
    if (!audioRef.current) return
    audioRef.current.pause()
    audioRef.current.currentTime = 0
  }

  return (
    <div className="app-container">
      <audio
        ref={audioRef}
        preload="auto"
        onEnded={handleEnded}
        hidden
      />

      <Routes>
                <Route path="/" element={<Timer onStart={startMusic} onPause={pauseMusic} onStop={stopMusic}/>}/>
        <Route path="/settings" element={<Settings />} />
        <Route path="/info" element={<Info />} />
        <Route path="*" element={<div style={{ padding: 40 }}>No route matched.</div>} />
      </Routes>
    </div>
  )
}

export default App
