// add middlewares here related to projects

const Project = require("../projects/projects-model");

const validateId = async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.get(id);
  if (!project) {
    res.status(404).json({ message: "Project not found" });
  } else {
    req.project = project;
    next();
  }
};

module.exports = { validateId };
