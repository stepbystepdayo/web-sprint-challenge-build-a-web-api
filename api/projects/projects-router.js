// Write your "projects" router here!

const express = require("express");

const Project = require("./projects-model");

const router = express.Router();

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

router.get("/:id", (req, res) => {
  Project.get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(404).json({});
    });
});

router.post("/", (req, res) => {
  Project.insert();
});

router.put("/:id", (req, res) => {
  Project.update();
});

router.delete("/:id", (req, res) => {
  Project.remove();
});

// router.get("/*", (req, res) => {
//   res.send(`<h1>This is stupid route</h1>`);
// });

module.exports = router;
