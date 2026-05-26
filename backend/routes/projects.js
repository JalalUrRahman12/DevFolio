const express = require('express');
const router = express.Router();
const { uploadProject, getAllProjects, getProjectById, rateProject } = require('../controllers/projectController');
const { authenticateJWT } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../data/project_pictures'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};
const upload = multer({ storage, fileFilter });

router.post('/', authenticateJWT, upload.single('projectPicture'), uploadProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/:id/rate', authenticateJWT, rateProject);

module.exports = router; 