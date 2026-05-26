import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { Button } from '../components/ui/button'

const RecruiterPage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [skill, setSkill] = useState('')
  const [minProjects, setMinProjects] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      setError('')
      const token = localStorage.getItem('token')
      if (!token) {
        setError('You must be logged in as a recruiter to view users.')
        setLoading(false)
        return
      }
      try {
        const res = await fetch('/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const contentType = res.headers.get('content-type');
        let data;
        if (contentType && contentType.includes('application/json')) {
          data = await res.json();
        } else {
          const text = await res.text();
          throw new Error(text || 'Server error');
        }
        if (!res.ok) throw new Error(data.message || 'Failed to fetch users')
        setUsers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  // Get all unique skills for filter dropdown
  const allSkills = Array.from(new Set(users.flatMap(u => u.skillSet || [])));

  // Filter users: only students, by name, skill, and min projects
  const filtered = users.filter(user => {
    if (user.role !== 'user') return false;
    const matchesName = user.name.toLowerCase().includes(search.toLowerCase());
    const matchesSkill = skill ? (user.skillSet || []).includes(skill) : true;
    const matchesProjects = minProjects ? (user.projects?.length || 0) >= Number(minProjects) : true;
    return matchesName && matchesSkill && matchesProjects;
  });

  return (
    <div className="min-h-screen py-12 px-6 pt-32">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gradient mb-8">Find Students</h1>
        <div className="mb-8 flex flex-col md:flex-row gap-4 md:gap-6 items-end bg-white/90 p-6 rounded shadow">
          <div className="flex-1">
            <label htmlFor="search" className="block mb-1 font-medium">Name</label>
            <input id="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name..." className="w-full h-10 rounded border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </div>
          <div className="flex-1">
            <label htmlFor="skill" className="block mb-1 font-medium">Skill</label>
            <select id="skill" value={skill} onChange={e => setSkill(e.target.value)} className="w-full h-10 rounded border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-200">
              <option value="">All</option>
              {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="minProjects" className="block mb-1 font-medium">Min Projects</label>
            <input id="minProjects" type="number" min="0" value={minProjects} onChange={e => setMinProjects(e.target.value)} placeholder="e.g. 1" className="w-full h-10 rounded border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </div>
        </div>
        {loading && <div>Loading users...</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="grid md:grid-cols-2 gap-8">
          {(!loading && !error && filtered.length === 0) && (
            <div className="col-span-2 text-center text-gray-500">No students found.</div>
          )}
          {filtered.map(user => (
            <Card key={user._id} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-2"><strong>Description:</strong> {user.description}</div>
                <div className="mb-2"><strong>Skill Set:</strong> {user.skillSet && user.skillSet.join(', ')}</div>
                <div className="mb-2"><strong>Experience:</strong> {user.experience} years</div>
                <div className="mb-2"><strong>Projects:</strong> {user.projects?.length || 0}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecruiterPage 