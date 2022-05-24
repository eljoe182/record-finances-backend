import { ProductsModel } from "../models/index.js";

export const index = async (req, res) => {
  const products = await ProductsModel.find({});
  res.json({
    message: "Products list",
    resources: null,
    data: products,
  });
};

export const store = async (req, res) => {
  try {
    const { description } = req.body;
    const product = await ProductsModel.findOneAndUpdate(
      { description },
      { description },
      {
        new: true,
        overwrite: true,
        upsert: true,
      }
    );
    res.json({
      message: "Product created successfully",
      resources: null,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const show = async (req, res) => {
  const { id } = req.params;
  const product = await ProductsModel.findById(id);
  res.json({
    message: "Product found",
    resources: null,
    data: product,
  });
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  console.log(req.params);

  const product = await ProductsModel.findByIdAndUpdate(
    { _id: id },
    { description },
    { new: true }
  );
  res.json({
    message: "Product updated successfully",
    resources: null,
    data: product,
  });
};

export const destroy = async (req, res) => {
  const { id } = req.params;
  const product = await ProductsModel.findByIdAndDelete(id);
  res.json({
    message: "Product deleted successfully",
    resources: null,
    data: product,
  });
};
