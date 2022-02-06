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

// Modular & Mountable Route Handlers

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

/*
// Chainable Route Handlers

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
  .delete(deleteUser); 
*/

module.exports = usersRouter;

// Swagger reusable schemas & parameters
/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *        type: object
 *        required:
 *          - name
 *          - username
 *          - email
 *        properties:
 *           id:
 *              type: string
 *              description: The auto-generated ID of the user
 *           name:
 *              type: string
 *              description: The name of the user
 *           username:
 *              type: string
 *              description: The username of the user
 *           email:
 *              type: string
 *              description: The email address of the user
 *           phone:
 *              type: string
 *              description: The phone number of the user
 *           website:
 *              type: string
 *              description: The website of the user
 *        example:
 *           id: 03377fa6-aa0d-4183-b351-54070b8a8401
 *           name: Bruce Wayne
 *           username: Batman
 *           email: batman@gmail.com
 *           phone: "0123456789"
 *           website: www.batman.com
 *   parameters:
 *     userParam:
 *          in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The User ID
 */

// Swagger tags
/**
 * @swagger
 * tags:
 *    name: Users
 */

// GET all users
/**
 * @swagger
 * /api/users:
 *       get:
 *        summary: GET All Users
 *        tags: [Users]
 *        responses:
 *          200:
 *            description: Successfully Fetched All Users!
 *            content:
 *               application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: "#/components/schemas/user"
 *          500:
 *            description: Server Error!
 */

// GET one specific user
/**
 * @swagger
 * /api/users/{id}:
 *       get:
 *        summary: GET a Specific User by ID
 *        tags: [Users]
 *        parameters:
 *             - $ref: "#/components/parameters/userParam"
 *        responses:
 *          200:
 *            description: Successfully Fetched User!
 *            content:
 *               application/json:
 *                  schema:
 *                    $ref: "#/components/schemas/user"
 *          404:
 *            description: User Not Found!
 *          500:
 *            description: Server Error!
 */

// POST a user
/**
 * @swagger
 * /api/users:
 *    post:
 *      summary: Create a New User
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *         application/json:
 *           schema:
 *              $ref: "#/components/schemas/user"
 *      responses:
 *          201:
 *            description: Successfully Created User!
 *            content:
 *               application/json:
 *                  schema:
 *                    $ref: "#/components/schemas/user"
 *          400:
 *            description: Bad Request!
 *          500:
 *            description: Server Error!
 */

// UPDATE a specific user
/**
 * @swagger
 * /api/users/{id}:
 *      put:
 *        summary: UPDATE a Specific User by ID
 *        tags: [Users]
 *        parameters:
 *            - $ref: "#/components/parameters/userParam"
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 *        responses:
 *          200:
 *            description: Successfully Updated User!
 *            content:
 *               application/json:
 *                  schema:
 *                    $ref: "#/components/schemas/user"
 *          400:
 *            description: Bad Request!
 *          404:
 *            description: User Not Found!
 *          500:
 *            description: Server Error!
 */

// DELETE a specific user
/**
 * @swagger
 * /api/users/{id}:
 *    delete:
 *        summary: GET a Specific User by ID
 *        tags: [Users]
 *        parameters:
 *            - $ref: "#/components/parameters/userParam"
 *        responses:
 *          204:
 *            description: Successfully Deleted User!
 *          404:
 *            description: User Not Found!
 *          500:
 *            description: Server Error!
 */
