const express = require("express");
const usersRouter = express.Router();

// Users Database
const users = require("../db/users.json");

// Callbacks
const {
  getUsers,
  getUser,
  postUser,
  updateUser,
  deleteUser,
} = require("../controllers/callBacks");

// Map the given param placeholder name to the given callback
usersRouter.param("id", (req, res, next, id) => {
  const foundUser = users.find((user) => user.id === id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (foundUser && userIndex !== -1) {
    req.user = foundUser;
    req.userIndex = userIndex;

    // UPDATE
    users.forEach((user) => {
      if (user.id === id) {
        user.name = req.body.name ? req.body.name : user.name;
        user.username = req.body.username ? req.body.username : user.username;
        user.email = req.body.email ? req.body.email : user.email;
        user.phone = req.body.phone ? req.body.phone : user.phone;
        user.website = req.body.website ? req.body.website : user.website;
      }
    });

    next();
  } else {
    res.status(404).json(`User with the ID of ${id} Not Found!`);
  }
});

// Modular and Mountable Route Handlers

// GET all users
usersRouter.get("/", getUsers);

// GET one specific user
usersRouter.get("/:id", getUser);

// POST a user
usersRouter.post("/", postUser);

// UPDATE a specific user
usersRouter.put("/:id", updateUser);

// DELETE a specific user
usersRouter.delete("/:id", deleteUser);

/* // Chainable Route Handlers
usersRouter
  .route("/")
  // GET all users
  .get(getUsers)
  // POST a user
  .post(postUser);

usersRouter
  .route("/:id")
  // GET one specific user
  .get(getUser)
  // UPDATE a specific user
  .put(updateUser)
  // DELETE a specific user
  .delete(deleteUser); */

module.exports = usersRouter;
