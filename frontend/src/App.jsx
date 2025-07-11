import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import WikiList from './pages/WikiList'
import WikiDetail from './pages/WikiDetail'

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        isActive 
          ? 'bg-primary/10 text-primary' 
          : 'text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark hover:bg-card-light dark:hover:bg-card-dark'
      }`}
    >
      {children}
    </Link>
  );
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-bg-light dark:bg-bg-dark">
        <nav className="sticky top-0 z-50 w-full border-b border-border-light dark:border-border-dark bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                  N
                </div>
                <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-text-light to-text-muted-light dark:from-white dark:to-gray-400">
                  North Star
                </span>
              </Link>
              <div className="flex gap-2">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/wiki">Guides</NavLink>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wiki" element={<WikiList />} />
            <Route path="/wiki/:slug" element={<WikiDetail />} />
          </Routes>
        </main>

        <footer className="border-t border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-sm text-text-muted-light dark:text-text-muted-dark">
              &copy; {new Date().getFullYear()} Onboarding North Star. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
