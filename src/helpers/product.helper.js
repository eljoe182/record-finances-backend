import ProductsModel from "../models/products.model.js";

export const productInfoOrCreate = async (product) => {
  const { productId, description } = product;

  if (`${productId}`.startsWith("new-")) {
    return ProductsModel.create({
      description: `${description}`.toUpperCase(),
    });
  }

  return ProductsModel.findOne({ _id: productId });
};

export const scanProducts = async (items) => {
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
