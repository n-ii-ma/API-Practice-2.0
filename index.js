const express = require("express");
const app = express();

//PORT
const PORT = process.env.PORT || 5000;

// CORS Policy
const cors = require("cors");
app.use(cors());

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
      title: "User API",
      version: "2.0",
      description: "Simple Express User API",
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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routers
app.use("/api/users", require("./routes/users"));

// Server
app.listen(PORT, () =>
  console.log(`Server Listening on http://localhost:${PORT}/`)
);
