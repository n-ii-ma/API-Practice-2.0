const express = require("express");
const app = express();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger with Morgan
const morgan = require("morgan");
app.use(morgan("dev"));

// Routers
app.use("/api/users", require("./routes/users"));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server Listening on http://localhost:${PORT}/`)
);
