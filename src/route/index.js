const {
  getIndexController,
  getCreateController,
  createProductController,
  updateProductController,
  deleteProductController,
  getAllProductController,
} = require("../controller");
const { Router } = require("express");

const route = Router();

route.get("/", getIndexController);
route.get("/create", getCreateController);
route.get("/find-all", getAllProductController);
route.post("/create", createProductController);
route.put("/update/:id", updateProductController);
route.delete("/delete/:id", deleteProductController);

module.exports = { route };
