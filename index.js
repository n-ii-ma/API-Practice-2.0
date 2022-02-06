const express = require("express");
const app = express();

//PORT
const PORT = process.env.PORT || 5000;

// CORS Policy
// const cors = require("cors");
// app.use(cors());

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger with Morgan
const morgan = require("morgan");
app.use(morgan("dev"));

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Users API",
      version: "1.0",
      description:
        "A RESTfull API built with Express for CRUD operations on an array of users",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { customSiteTitle: "Users API" })
);

// Routers
app.use("/api/users", require("./routes/users"));

// Server
app.listen(PORT, () =>
  console.log(`API Started on http://localhost:${PORT}/api/users`)
);
