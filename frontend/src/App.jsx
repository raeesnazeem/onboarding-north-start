import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import WikiList from './pages/WikiList'
import WikiDetail from './pages/WikiDetail'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <nav className="main-nav">
          <div className="nav-content">
            <Link to="/" className="nav-logo">Onboarding Wiki</Link>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/wiki">Guides</Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wiki" element={<WikiList />} />
            <Route path="/wiki/:slug" element={<WikiDetail />} />
          </Routes>
        </main>

        <footer className="main-footer">
          <p>&copy; {new Date().getFullYear()} Onboarding North Star</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
