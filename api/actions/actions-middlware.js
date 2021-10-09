// add middlewares here related to actions

const Actions = require("../actions/actions-model");

const validateActionsId = async (req, res, next) => {
  const { id } = req.params;
  const actions = await Actions.get(id);
  if (!actions) {
    res.status(404).json({ message: "Action not found" });
  } else {
    req.action = action;
    next();
  }
};

module.exports = { validateActionsId };
