import { Route, Routes } from 'react-router-dom'
import './App.css'
import Timer from './components/Timer'
import Settings from './components/Settings'
import Info from './components/Info'

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Timer />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/info" element={<Info />} />
        <Route path="*" element={<div style={{ padding: 40 }}>No route matched.</div>} /> 
      </Routes>
    </div>
  )
}

export default App
