// Write your "projects" router here!

const express = require("express");

const Project = require("./projects-model");

const router = express.Router();

const { validateId, validateProject } = require("./projects-middleware");

router.get("/", (req, res) => {
  Project.get()
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json([]);
    });
});

router.get("/:id", validateId, (req, res) => {
  res.status(200).json(req.project);
});

router.post("/", (req, res) => {
  Project.insert(req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Error adding project" });
    });
});

router.put("/:id", validateId, validateProject, (req, res) => {
  Project.update(req.params.id, req.body)
    .then((pj) => {
      res.status(200).json(pj);
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
});

router.delete("/:id", validateId, async (req, res) => {
  try {
    const deletedProject = await Project.remove(req.params.id);
    res.status(200).json(req.project);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/actions", validateId, (req, res) => {
  const { id } = req.params;
  Project.getProjectActions(id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

module.exports = router;
