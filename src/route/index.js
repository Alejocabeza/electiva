const {
  getIndexController,
  getCreateController,
  getUpdateController,
  createProductController,
  updateProductController,
  deleteProductController,
  getAllProductController,
  getOneProductController,
} = require("../controller");
const { Router } = require("express");

const route = Router();

// route web
route.get("/", getIndexController);
route.get("/create", getCreateController);
route.get("/update/:id", getUpdateController);

// route api
route.get("/find-all", getAllProductController);
route.get('/find-one/:id', getOneProductController);
route.post("/create", createProductController);
route.put("/update/:id", updateProductController);
route.delete("/delete/:id", deleteProductController);

module.exports = { route };
