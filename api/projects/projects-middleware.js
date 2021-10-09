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

const validateProject = (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.description || !body.completed) {
    res
      .status(400)
      .json({ message: "missing required name, description or completed" });
  } else {
    next();
  }
};

// const validateUser = async (req, res, next) => {

// }

module.exports = { validateId, validateProject };
