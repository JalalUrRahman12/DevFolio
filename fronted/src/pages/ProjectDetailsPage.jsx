import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'

const ProjectDetailsPage = () => {
  // In a real app, fetch project data by ID from route params
  const project = {
    title: 'E-Learning Platform',
    description: 'A comprehensive online learning management system with interactive courses, quizzes, and progress tracking.',
    author: 'Sarah Johnson',
    technologies: ['React', 'Node.js', 'MongoDB'],
    image: '/src/assets/E-Learning.webp',
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>by {project.author}</CardDescription>
          </CardHeader>
          <CardContent>
            <img src={project.image} alt={project.title} className="w-full h-64 object-cover rounded mb-4" />
            <p className="mb-4">{project.description}</p>
            <div>
              <span className="font-semibold">Technologies:</span> {project.technologies.join(', ')}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProjectDetailsPage 