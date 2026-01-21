import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import communiqueLogo from '../assets/Communique_logo.png'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={communiqueLogo} 
              alt="Communique Logo" 
              className="w-14 h-14 object-contain"
            />
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Communique</div>
            <div className="hidden sm:block text-xs text-slate-400 border-l border-slate-700 pl-2">
              ECE Students' Society
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors font-medium ${
                isActive('/') 
                  ? 'text-cyan-400' 
                  : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors font-medium ${
                isActive('/about') 
                  ? 'text-cyan-400' 
                  : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              About
            </Link>
            <Link 
              to="/events" 
              className={`transition-colors font-medium ${
                isActive('/events') 
                  ? 'text-cyan-400' 
                  : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              Events
            </Link>
            <Link 
              to="/ekathon" 
              className={`transition-colors font-medium ${
                isActive('/ekathon') 
                  ? 'text-orange-500' 
                  : 'text-slate-300 hover:text-orange-500'
              }`}
            >
              <span className="flex items-center gap-1">
                <span className="animate-pulse">🎃</span>
                Ekathon
              </span>
            </Link>
            <Link 
              to="/achievements" 
              className={`transition-colors font-medium ${
                isActive('/achievements') 
                  ? 'text-cyan-400' 
                  : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              Achievements
            </Link>
            <Link 
              to="/resources" 
              className={`transition-colors font-medium ${
                isActive('/resources') 
                  ? 'text-cyan-400' 
                  : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              Resources
            </Link>
            <Link 
              to="/contributors" 
              className={`transition-colors font-medium ${
                isActive('/contributors') 
                  ? 'text-cyan-400' 
                  : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              Contributors
            </Link>
            <Link to="/feedback">
              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30">
                Feedback
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-300 hover:text-cyan-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-slate-800">
            <Link 
              to="/" 
              className={`block transition-colors font-medium py-2 ${
                isActive('/') 
                  ? 'text-cyan-400' 
                  : 'text-slate-300 hover:text-cyan-400'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`block transition-colors font-medium py-2 ${
                isActive('/about') 
                  ? 'text-cyan-400' 
                  : 'text-slate-300 hover:text-cyan-400'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/events" 
              className={`block transition-colors font-medium py-2 ${
                isActive('/events') 
                  ? 'text-cyan-400' 
                  : 'text-slate-300 hover:text-cyan-400'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Events
            </Link>
            <Link 
              to="/ekathon" 
              className={`block transition-colors font-medium py-2 ${
                isActive('/ekathon') 
                  ? 'text-orange-500' 
                  : 'text-slate-300 hover:text-orange-500'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center gap-1">
                <span className="animate-pulse">🎃</span>
                Ekathon
              </span>
            </Link>
            <Link 
              to="/achievements" 
              className={`block transition-colors font-medium py-2 ${
                isActive('/achievements') 
                  ? 'text-cyan-400' 
                  : 'text-slate-300 hover:text-cyan-400'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Achievements
            </Link>
            <Link 
              to="/resources" 
              className={`block transition-colors font-medium py-2 ${
                isActive('/resources') 
                  ? 'text-cyan-400' 
                  : 'text-slate-300 hover:text-cyan-400'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link 
              to="/contributors" 
              className={`block transition-colors font-medium py-2 ${
                isActive('/contributors') 
                  ? 'text-cyan-400' 
                  : 'text-slate-300 hover:text-cyan-400'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contributors
            </Link>
            <Link 
              to="/feedback" 
              className="block w-full mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-colors">
                Feedback
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar



