const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  description: { type: String, trim: true },
  skillSet: { type: [String], default: [] },
  experience: { type: Number, min: 0, default: 0 },
  role: { type: String, enum: ['user', 'recruiter', 'admin'], default: 'user' },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); 