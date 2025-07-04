import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Challenge from './pages/Challenge'

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenge" element={<Challenge />} />
        {/* add more routes later */}
      </Routes>
    </div>
  )
}

export default App
