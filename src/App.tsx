import { Route, Routes } from 'react-router-dom'
import './App.css'

import Timer from './components/Timer'
import Settings from './components/Settings'
import Info from './components/Info'

import { useEffect, useRef, useState } from 'react'
import { MUSIC_CATALOG } from './music/catalog'
import type { MusicCategory } from './music/catalog'


function App() {
  const audioRef = useRef<HTMLAudioElement>(null)

  // queue state
  // const [category] = 
  useState<MusicCategory>('lofi')
  
  const [queue, setQueue] = useState<string[]>([...MUSIC_CATALOG.lofi])
  const [currentTrack, setCurrentTrack] = useState(0)
  const [playing, setPlaying] = useState(false)
  
  // Avoid render loop: set initial playing state in an effect
  useEffect(() => {
    setPlaying(true)
  }, [])

  // Load track when index changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.src = queue[currentTrack]
    audio.load()

    if (playing) {
      audio.play().catch(() => {})
    }
  }, [currentTrack, queue, playing])

  // When a song ends → rotate queue
  const handleEnded = () => {
    setQueue((prev) => {
      const [finished, ...rest] = prev
      return [...rest, finished]
    })
    setCurrentTrack(0)
  }

  const startMusic = () => {
  audioRef.current?.play()
}

const pauseMusic = () => {
  audioRef.current?.pause()
}

const stopMusic = () => {
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
