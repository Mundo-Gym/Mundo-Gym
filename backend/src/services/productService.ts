import { Product } from "../models/Product";

export type CreateProductInput = {
  name: string;
  description?: string;
  price: number;
  stock?: number;
  categoryId?: string;
  subcategoryId?: string;
};

export async function createProduct(input: CreateProductInput) {
  const product = await Product.create(input);
  return product.toObject();
}

export async function listProducts() {
  // Populate category and subcategory names for frontend convenience
  const products = await Product.find()
    .sort({ createdAt: -1 })
    .populate("category", "name")
    .populate("subcategory", "name")
    .lean();

  return products.map((p: any) => ({
    ...p,
    categoryName: p.category?.name || null,
    subcategoryName: p.subcategory?.name || null,
  }));
}
