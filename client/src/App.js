import './App.css'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Albums from './pages/Albums'
import About from './pages/About'

function App() {
  return (
    <div className="App">
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
