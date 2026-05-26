const Project = require('../models/Project');
const User = require('../models/User');
const path = require('path');

exports.uploadProject = async (req, res) => {
  const { title, description, githubLink } = req.body;
  if (!title || !description || !githubLink || !req.file) {
    return res.status(400).json({ message: 'Missing required fields (title, description, githubLink, projectPicture)' });
  }
  try {
    const projectPicturePath = path.relative(path.join(__dirname, '..'), req.file.path);
    const project = await Project.create({
      title,
      description,
      githubLink,
      projectPicture: projectPicturePath,
      author: req.user.id,
      ratings: []
    });
    await User.findByIdAndUpdate(req.user.id, { $push: { projects: project._id } });
    res.status(201).json({ message: 'Project uploaded successfully', project });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('author', 'name email');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('author', 'name email');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.rateProject = async (req, res) => {
  const { rating, feedback } = req.body;
  if (typeof rating !== 'number' || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
  }
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    const newRating = {
      user: req.user.id,
      rating,
      feedback: feedback || '',
      createdAt: new Date()
    };
    project.ratings.push(newRating);
    await project.save();
    res.json({ message: 'Rating/feedback added', rating: newRating });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 