// Write your "actions" router here!

const express = require("express");
const Actions = require("./actions-model");

const router = express.Router();

const { validateActionsId } = require("./actions-middlware");

router.get("/", (req, rest) => {
  Actions.get()
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json([]);
    });
});

router.get("/:id", validateActionsId, (req, res) => {
  res.status(200).json(req.action);
});

router.post("/", (req, res) => {
  Actions.insert(req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Error adding project" });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  Actions.update(req.params.id, changes)
    .then((action) => {
      if (!changes) {
        res.status(404).json({ message: "ID could not found" });
      } else {
        res.status(200).json(action);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "missing!" });
    });
});

router.delete("/:id", validateActionsId, async (req, res) => {
  try {
    const deletedAction = await Actions.remove(req.params.id);
    res.status(200).json(req.actions);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
