// Write your "projects" router here!

const express = require("express");

const Project = require("./projects-model");

const router = express.Router();

const { validateId } = require("./projects-middleware");

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

router.put("/:id", (req, res) => {
  const changes = req.body;
  Project.update(req.params.id, changes)
    .then((pj) => {
      if (!changes) {
        res.status(404).json({ message: "ID could not found" });
      } else {
        res.status(200).json(pj);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "missing!" });
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

router.get("/:id/actions", (req, res) => {});

module.exports = router;
