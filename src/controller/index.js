const {
  productCreateValidation,
  productUpdateSchema,
} = require("../validation/create-product.schema");
const { findAll, findOne, remove, create: productCreate, update: productUpdate } = require("../repository/produts");

/**
 * This function is used to render the home page
 * @param {} req
 * @param {*} res
 */
const index = async (req, res) => {
  const products = await findAll();
  res.render("home", { products });
};

/**
 * This function is used to render the create page
 * @param {*} req
 * @param {*} res
 */
const create = (req, res) => {
  res.render("create");
};

/**
 * This function is used to store the data
 * @param {*} req
 * @param {*} res
 */
const store = async (req, res) => {
  try {
    const {body} = req
    const validation = productCreateValidation(body)
    if(validation.error){
      res.status(400).json({ error: validation.error });
      return;
    }
    await productCreate(body)
    res.status(201).json({ message: "Product Created" });
  } catch (error) {
    if (error.code === "P2002") {
      res.status(400).json({
        error: "Product already exists",
      });
    }
  }
};

/**
 * This function is used to render the show page
 * @param {*} req
 * @param {*} res
 */
const show = async (req, res) => {
  const { id } = req.params;
  const product = await findOne(+id);
  res.render("show", { product });
};

/**
 * This function is used to render the edit page
 * @param {*} req
 * @param {*} res
 */
const edit = async (req, res) => {
  const { id } = req.params;
  const product = await findOne(+id);
  res.render("update", { product });
};

/**
 * This function is used to update the data
 * @param {*} req
 * @param {*} res
 */
const update = async (req, res) => {
  try {
  const {id} = req.params
  const {body} = req
  const validated = productUpdateSchema(body)
  if(validated.error){
    res.status(400).json({ error: validated.error });
    return;
  } 
    await productUpdate(+id, body)
    res.status(200).json({ message: "Product Created" });
  } catch (error) {
    console.log(error)
  }
};

/**
 * THis function is used to delete the data
 * @param {*} req
 * @param {*} res
 */
const destroy = async (req, res) => {
  const { id } = req.params;
  const dataToReturn = await remove(+id);
  if (dataToReturn) {
    res.redirect("/");
  }else{
    res.render("delete", { value: dataToReturn ? true : false });
  }
};

module.exports = {
  index,
  create,
  store,
  show,
  edit,
  update,
  destroy,
};
