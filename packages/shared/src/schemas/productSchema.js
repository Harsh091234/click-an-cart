import z from "zod";

export const CreateProductSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name too long"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description too long"),

  price: z.string().min(1, "Price is required"),

  category: z.string().min(2, "Category is required").max(50),
  stock: z.string().min(1, "Stock is required"),
});

const emptyToUndefined = (value) =>
  value === "" ? undefined : value;

const optionalString = (schema) =>
  z.preprocess(emptyToUndefined, schema.optional());

export const EditProductSchema = z.object({
  name: optionalString(z.string().min(3).max(100)),
  description: optionalString(z.string().min(10).max(1000)),
  price: optionalString(z.string().min(1)),
  category: optionalString(z.string().min(2).max(50)),
  stock: optionalString(z.string().min(1)),
});
