import React from 'react'
import { motion } from 'framer-motion'
import { Code, Users, Briefcase, Star, Github, Linkedin, Mail } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Link, useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate();
  const projects = [
    {
      id: 1,
      title: "E-Learning Platform",
      description: "A comprehensive online learning management system with interactive courses, quizzes, and progress tracking.",
      image: "/src/assets/E-Learning.webp",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      author: "Sarah Johnson",
      rating: 4.8,
      category: "Education"
    },
    {
      id: 2,
      title: "ML Disease Prediction",
      description: "Machine learning model for early disease detection using medical data analysis and predictive algorithms.",
      image: "/src/assets/ML Based Disease.webp",
      technologies: ["Python", "TensorFlow", "Pandas", "Scikit-learn"],
      author: "Ahmed Khan",
      rating: 4.9,
      category: "Healthcare"
    },
    {
      id: 3,
      title: "Smart Home IoT",
      description: "IoT-based smart home automation system with real-time monitoring and control capabilities.",
      image: "/src/assets/Smart Home IOT.webp",
      technologies: ["Arduino", "React", "Firebase", "IoT"],
      author: "Maria Garcia",
      rating: 4.7,
      category: "IoT"
    },
    {
      id: 4,
      title: "Talent Hiring Platform",
      description: "AI-powered recruitment platform connecting skilled developers with top tech companies worldwide.",
      image: "/src/assets/Talent Hiring.webp",
      technologies: ["Vue.js", "Express", "PostgreSQL", "AI"],
      author: "David Chen",
      rating: 4.6,
      category: "Business"
    }
  ]

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Project Showcase",
      description: "Upload and display your projects with detailed documentation, live demos, and source code links."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Talent Discovery",
      description: "Connect with skilled developers and students based on their project portfolios and technical expertise."
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Career Opportunities",
      description: "Find internships, freelance work, and full-time positions through our integrated hiring platform."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Peer Reviews",
      description: "Get feedback from the community and improve your projects through collaborative reviews."
    }
  ]

  const stats = [
    { number: "2,500+", label: "Projects Uploaded" },
    { number: "1,200+", label: "Active Students" },
    { number: "350+", label: "Companies" },
    { number: "95%", label: "Success Rate" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Showcase Your Projects,
              <br />
              <span className="text-gradient">Land Your Dream Job</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A bridge between academia and industry - where students showcase their work and recruiters find top tech talent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/projects')}
                className="btn-gradient text-lg px-8 py-4 rounded"
              >
                Upload Project
              </button>
              <button
                onClick={() => navigate('/recruiter')}
                className="text-lg px-8 py-4 border border-blue-500 rounded text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Find Talent
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold stats-counter mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-gradient">DevFolio?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides everything you need to showcase your skills and connect with opportunities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="card-hover h-full">
                  <CardHeader className="text-center">
                    <div className="feature-icon w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover amazing projects created by talented students and developers from around the world.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="project-card overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{project.rating}</span>
                      </div>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="tech-badge">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">by {project.author}</span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </Button>
                        <Button size="sm" className="btn-gradient">
                          View Project
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="px-8" onClick={() => navigate('/projects')}>
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 hero-gradient text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Showcase Your Talent?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students and developers who have already found their dream opportunities through DevFolio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4" onClick={() => navigate('/projects')}>
                Upload Your Project
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-black" onClick={() => navigate('/recruiter')}>
                Browse Talent
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

