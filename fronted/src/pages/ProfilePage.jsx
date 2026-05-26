import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'

const ProfilePage = () => {
  // In a real app, fetch user data by ID from route params
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Full Stack Developer passionate about building impactful projects.',
    projects: [
      { id: 1, title: 'E-Learning Platform' },
      { id: 2, title: 'ML Disease Prediction' },
    ],
  }

  return (
    <div className="min-h-screen py-12 px-6 pt-32">
      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{user.bio}</p>
          </CardContent>
        </Card>
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        <ul className="space-y-2">
          {user.projects.map((project) => (
            <li key={project.id} className="border p-3 rounded-lg bg-white shadow">
              {project.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProfilePage 