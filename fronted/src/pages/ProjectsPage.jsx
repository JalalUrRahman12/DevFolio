import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useNavigate } from 'react-router-dom'
import { Star, Badge } from 'lucide-react'
import { jwtDecode } from 'jwt-decode'

const ProjectsPage = () => {
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    githubLink: '',
    image: null,
  })
  const [errors, setErrors] = useState({})
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [uploadSuccess, setUploadSuccess] = useState('')
  const [notLoggedIn, setNotLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState('user')
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(() => setProjects([]))
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUserRole(decoded.role || 'user')
      } catch {}
    }
  }, [])

  const handleUploadClick = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setNotLoggedIn(true)
      setShowModal(false)
      return
    }
    setNotLoggedIn(false)
    setShowModal(true)
  }

  const validate = () => {
    const errs = {}
    if (!form.title) errs.title = 'Project title is required'
    if (!form.description) errs.description = 'Project description is required'
    if (!form.githubLink) errs.githubLink = 'GitHub link is required'
    if (!/^https?:\/\//.test(form.githubLink)) errs.githubLink = 'Invalid GitHub link'
    if (!form.image) errs.image = 'Project image is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setForm({ ...form, image: files[0] })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setUploadError('')
    setUploadSuccess('')
    try {
      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('description', form.description)
      formData.append('githubLink', form.githubLink)
      formData.append('projectPicture', form.image)
      const token = localStorage.getItem('token')
      if (!token) {
        setUploadError('You must be logged in to upload a project.')
        setLoading(false)
        return
      }
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })
      const contentType = res.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || 'Server error');
      }
      if (!res.ok) throw new Error(data.message || 'Upload failed')
      setUploadSuccess('Project uploaded successfully!')
      setForm({ title: '', description: '', githubLink: '', image: null })
      setShowModal(false)
      // Refresh project list
      fetch('/api/projects')
        .then(res => res.json())
        .then(data => setProjects(data))
    } catch (err) {
      setUploadError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const defaultImage = 'https://via.placeholder.com/300x180?text=No+Image';
  const getImageUrl = (projectPicture) => {
    if (!projectPicture) return defaultImage;
    if (projectPicture.startsWith('data/project_pictures')) {
      return `http://localhost:5002/${projectPicture}`;
    }
    return projectPicture;
  };

  return (
    <div className="min-h-screen py-12 px-6 pt-32">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gradient">Project Listing</h1>
          {userRole !== 'recruiter' && (
            <Button className="btn-gradient" onClick={handleUploadClick}>
              Upload Project
            </Button>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project._id} className="project-card overflow-hidden">
              <div className="relative h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                <img
                  src={getImageUrl(project.projectPicture)}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110 rounded"
                  style={{ maxHeight: '12rem', maxWidth: '100%' }}
                  onError={e => { e.target.onerror = null; e.target.src = defaultImage; }}
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 px-2 py-1 rounded text-xs font-semibold text-gray-800">{project.category || ''}</span>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{project.ratings && project.ratings.length > 0 ? (project.ratings.reduce((a, b) => a + b.rating, 0) / project.ratings.length).toFixed(1) : 'N/A'}</span>
                  </div>
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {/* Technologies could be added as a field in the backend if needed */}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">by {project.author?.name || 'Unknown'}</span>
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs ml-2">GitHub</a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {/* Modal Popup for Upload Form */}
      {showModal && userRole !== 'recruiter' && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-40 transition-all">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative mt-10 animate-slideDownModal">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl" onClick={() => setShowModal(false)} aria-label="Close">&times;</button>
            <h2 className="text-2xl font-bold mb-4 mt-6 text-center">Upload New Project</h2>
            <form className="space-y-5 px-6 pb-6" onSubmit={handleSubmit} encType="multipart/form-data">
              <div>
                <Label htmlFor="title" className="mb-1 block">Project Title</Label>
                <Input id="title" name="title" value={form.title} onChange={handleChange} placeholder="Enter project title" required aria-invalid={!!errors.title} />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>
              <div>
                <Label htmlFor="description" className="mb-1 block">Project Description</Label>
                <Input id="description" name="description" value={form.description} onChange={handleChange} placeholder="Enter project description" required aria-invalid={!!errors.description} />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>
              <div>
                <Label htmlFor="githubLink" className="mb-1 block">GitHub Link</Label>
                <Input id="githubLink" name="githubLink" value={form.githubLink} onChange={handleChange} placeholder="https://github.com/username/repo" required aria-invalid={!!errors.githubLink} />
                {errors.githubLink && <p className="text-red-500 text-xs mt-1">{errors.githubLink}</p>}
              </div>
              <div>
                <Label htmlFor="image" className="mb-1 block">Project Image</Label>
                <Input id="image" name="image" type="file" accept="image/*" onChange={handleChange} aria-invalid={!!errors.image} />
                {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                <span className="text-xs text-gray-400">{form.image ? form.image.name : 'No file chosen'}</span>
              </div>
              {uploadError && <div className="text-red-500 text-sm">{uploadError}</div>}
              {uploadSuccess && <div className="text-green-600 text-sm">{uploadSuccess}</div>}
              <Button type="submit" className="w-full btn-gradient mt-4" disabled={loading}>
                {loading ? 'Uploading...' : 'Upload Project'}
              </Button>
            </form>
          </div>
        </div>
      )}
      {/* CTA Section */}
      <section className="py-20 px-6 hero-gradient text-white mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Top Talent?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Browse and connect with skilled students and professionals for your next project or team.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-4" onClick={() => navigate('/recruiter')}>
            Find Talent
          </Button>
        </div>
      </section>
      {notLoggedIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-all">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="mb-4">You must be logged in to upload a project.</p>
            <Button className="btn-gradient" onClick={() => { setNotLoggedIn(false); navigate('/login') }}>Go to Login</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectsPage 