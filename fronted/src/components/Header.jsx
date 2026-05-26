import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Code } from 'lucide-react'
import { jwtDecode } from 'jwt-decode'

const Header = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState(null);
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserInfo(decoded);
      } catch {}
    } else {
      setUserInfo(null);
    }
  }, []);
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="navbar-glass fixed top-0 w-full z-50 px-6 py-4 bg-white/80 backdrop-blur-md shadow">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center">
            <Code className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gradient">DevFolio</span>
        </motion.div>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/projects" className="text-gray-700 hover:text-blue-600 transition-colors">Projects</Link>
          <Link to="/recruiter" className="text-gray-700 hover:text-blue-600 transition-colors">Recruiter</Link>
          {isLoggedIn && userInfo && (
            <span className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded mr-2">
              Logged in as: <span className="font-bold">{userInfo.name || userInfo.email}</span> <span className="capitalize">({userInfo.role})</span>
            </span>
          )}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-gray-700 hover:text-blue-600 transition-colors mr-2">Logout</button>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors mr-2">Login</Link>
              <Link to="/register" className="btn-gradient px-4 py-2 rounded text-white">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header 