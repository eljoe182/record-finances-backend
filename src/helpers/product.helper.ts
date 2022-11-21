import { Product, ProductCreate, ProductItem, ProductUpdate } from '../interfaces/product.interface';
import ProductsModel from "../models/products.model";

export const productFindAll = async () => {
  return ProductsModel.find().select(
    "-__v -_id -createdAt -updatedAt"
  );
}

export const productStore = async (product: ProductCreate) => {
  return ProductsModel.findOneAndUpdate(
    {
      description: `${product.description}`.toUpperCase(),
    },
    {
      description: `${product.description}`.toUpperCase(),
    },
    {
      new: true,
      overwrite: true,
      upsert: true,
    }
  ).select("-__v -_id -createdAt -updatedAt");
}

export const productFindById = async (id: string) => {
  return ProductsModel.findById(id).select(
    "-__v -_id -createdAt -updatedAt"
  );
}

export const productUpdate = async (product: ProductUpdate) => {
  return ProductsModel.findByIdAndUpdate(
    { _id: product.id },
    { description: product.description },
    { new: true }
  );
}

export const productDestroy = async (id: string) => {
  return ProductsModel.findByIdAndDelete(id);
}

export const productFindByDescription = async (query: string) => {
  return ProductsModel.find({
    description: {
      $regex: query,
      $options: "imsx",
    },
  }).select("-__v -_id -createdAt -updatedAt").lean();
}

export const productInfoOrCreate: any = async (product: Product) => {
  const { productId, description } = product;

  if (`${productId}`.startsWith("new-")) {
    return ProductsModel.create({
      description: `${description}`.toUpperCase(),
    });
  }

  return ProductsModel.findOne({ _id: productId });
};

export const scanProducts = async (items: ProductItem[]) => {
  const products = [];
  for (let i = 0; i < items.length; i++) {
    const { productId, description, quantity, price, discount, total } =
      items[i];
    const product = await productInfoOrCreate({
      productId,
      description: `${description}`.toUpperCase(),
    });
    products.push({
      productId: product._id,
      quantity,
      price,
      discount,
      total,
    });
  }
  return products;
};
