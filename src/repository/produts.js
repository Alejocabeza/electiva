const { db } = require("../lib/db");

const findAll = async () => {
  try {
    const products = await db.product.findMany();
    return products;
  } catch (err) {
    console.log(err);
  }
};

const findOne = async (id) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id,
      },
    });
    return product;
  } catch (err) {
    console.log(err);
  }
};

const create = async (data) => {
  try {
    await db.product.create({
      data,
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};

const update = async (id, data) => {
  try {
    await db.product.update({
      where: {
        id,
      },
      data,
    });
    return true;
  } catch (err) {
    console.log(err);
  }
};

const remove = async (id) => {
  try {
    await db.product.delete({
      where: {
        id,
      },
    });
    return true;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { findAll, findOne, remove, create, update };
