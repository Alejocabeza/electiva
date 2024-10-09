const { Router } = require("express");
const {
  index,
  create,
  update,
  edit,
  store,
  show,
  destroy,
} = require("../controller");

const route = Router();

// route web
route.get("/", index);
route.get("/create", create);
route.get("/show/:id", show);
route.get("/edit/:id", edit);
route.get("/delete/:id", destroy);

route.post("/store", store);
route.patch("/update/:id", update);

module.exports = { route };
