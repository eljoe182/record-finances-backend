import { Request, Response } from 'express';
import { productDestroy, productFindAll, productFindByDescription, productFindById, productStore, productUpdate } from '../helpers/product.helper';

export const index = async (req: Request, res: Response) => {
  const products = await productFindAll();
  res.json({
    message: "Products list",
    resources: null,
    data: products,
  });
};

export const store = async (req: Request, res: Response) => {
  try {
    const { description } = req.body;
    const product = await productStore({ description });
    res.json({
      message: "Product created successfully",
      resources: null,
      data: product,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const show = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await productFindById(id);
  res.json({
    message: "Product found",
    resources: null,
    data: product,
  });
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description } = req.body;

  const product = await productUpdate({ id, description });
  res.json({
    message: "Product updated successfully",
    resources: null,
    data: product,
  });
};

export const destroy = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await productDestroy(id);
  res.json({
    message: "Product deleted successfully",
    resources: null,
    data: product,
  });
};

export const findByDescription = async (req: Request, res: Response) => {
  try {
    const { query } = req.params;
    const products = await productFindByDescription(query);
    res.json(products);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      resource: null,
      data: null,
    });
  }
};
