const { z } = require("zod");

const productCreateSchema = z.object({
  name: z.string().min(3),
  code: z.string().min(3),
  category: z.string().min(3),
  price: z.coerce.number(),
});

const productCreateValidation = (data) => {
  return productCreateSchema.safeParse(data);
};

const productUpdateSchema = (data) => {
  return productCreateSchema.partial().safeParse(data);
}

module.exports = { productCreateValidation, productUpdateSchema };
