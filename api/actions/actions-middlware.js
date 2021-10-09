// add middlewares here related to actions

const Actions = require("../actions/actions-model");

const validateActionsId = async (req, res, next) => {
  const { id } = req.params;
  const action = await Actions.get(id);
  if (!action) {
    res.status(404).json({ message: "Action not found" });
  } else {
    req.action = action;
    next();
  }
};

module.exports = { validateActionsId };
