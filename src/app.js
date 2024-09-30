const express = require("express");
const { route } = require("./route");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(route);

module.exports = app;
