const express = require("express");
const { route } = require("./route");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const exphbs = require("express-handlebars");

const app = express();

app.engine(
  "hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
  }),
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(route);

module.exports = app;
