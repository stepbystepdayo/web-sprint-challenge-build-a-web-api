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
  if (
    body.name == undefined ||
    body.description == undefined ||
    body.completed == undefined
  ) {
    res
      .status(400)
      .send({ message: "Please put name, description and completed!" });
  } else {
    next();
  }
};

// const validateUser = async (req, res, next) => {

// }

module.exports = { validateId, validateProject };
