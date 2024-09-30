const { z } = require("zod");

const productCreateSchema = z.object({
  name: z.string().min(3),
  code: z.string().min(3),
  category: z.string().min(3),
  price: z.number(),
});

const productCreateValidation = (data) => {
  return productCreateSchema.safeParse(data);
};

module.exports = { productCreateValidation };
