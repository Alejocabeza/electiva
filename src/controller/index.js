const path = require("path");
const { db } = require("../lib/db");
const {
  productCreateValidation,
} = require("../validation/create-product.schema");

const getIndexController = (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
};

const getCreateController = (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/create.html"));
};

const getAllProductController = async (req, res) => {
  try {
    const products = await db.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const createProductController = async (req, res) => {
  try {
    const { body } = req;
    const validation = productCreateValidation(body);
    if (validation.error) {
      res.status(400).json({ error: validation.error });
      return;
    }
    await db.product.create({
      data: { ...body },
    });
    res.status(201).json({ message: "Product Created" });
  } catch (error) {
    if (error.code === "P2002") {
      res.status(400).json({
        error: "Product already exists",
      })
    }
  }
};

const updateProductController = async (req, res) => {
  try {
    console.log(req);
    console.log(body);
    res.status(200).json({ message: "Product Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const deleteProductController = async (req, res) => {
  try {
    console.log(req);
    console.log(body);
    res.status(200).json({ message: "Product Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  getIndexController,
  getCreateController,
  createProductController,
  updateProductController,
  deleteProductController,
  getAllProductController,
};
