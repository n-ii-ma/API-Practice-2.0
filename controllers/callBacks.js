// Users Database
const users = require("../db/users.json");

// UUID
const uuid = require("uuid");

// Validation
const { postValidation, updateValidation } = require("../utils/validation");

// GET all users
const getUsers = (req, res) => {
  res.json(users);
};

// GET one specific user
const getUser = (req, res) => {
  res.json(req.user);
};

// POST a user
const postUser = (req, res) => {
  const newUser = { ...req.body, id: uuid.v4() };
  const { error } = postValidation(req.body);

  if (!error) {
    users.push(newUser);
    res.status(201).json({ Message: "User Created!", User: newUser });
  } else {
    res.status(400).json({ Message: error.details[0].message });
  }
};

// UPDATE a specific user
const updateUser = (req, res) => {
  const { error } = updateValidation(req.body);

  if (!error) {
    res.json({ Message: "User Updated!", User: req.user });
  } else {
    res.status(400).json({ Message: error.details[0].message });
  }
};

// DELETE a specific user
const deleteUser = (req, res) => {
  users.splice(req.userIndex, 1);
  res.status(204).json();
};

module.exports = { getUsers, getUser, postUser, updateUser, deleteUser };
