import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProjectsPage from './pages/ProjectsPage'
import ProfilePage from './pages/ProfilePage'
import RecruiterPage from './pages/RecruiterPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/recruiter" element={<RecruiterPage />} />
            <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

