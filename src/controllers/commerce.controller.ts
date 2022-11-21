import { Request, Response } from 'express';
import { commerceDestroy, commerceFindAll, commerceFindByDescription, commerceFindById, commerceStore, commerceUpdate } from '../helpers/commerce.helper';

export const index = async (_req: Request, res: Response) => {
  const commerce = await commerceFindAll();
  res.json({
    message: "Commerce list",
    resources: null,
    data: commerce,
  });
};

export const store = async (req: Request, res: Response) => {
  try {
    const { description } = req.body;
    const commerce = await commerceStore({ description });
    res.status(201).json({
      message: "Commerce created successfully",
      resources: null,
      data: commerce,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      resource: null,
      data: null,
    });
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const commerce = await commerceFindById(id);
    res.json({
      message: "Commerce found",
      resources: null,
      data: commerce,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      resource: null,
      data: null,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const commerce = await commerceUpdate({ id, description });
    res.json({
      message: "Commerce updated successfully",
      resources: null,
      data: commerce,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      resource: null,
      data: null,
    });
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const commerce = await commerceDestroy(id);
    res.json({
      message: "Commerce deleted successfully",
      resources: null,
      data: commerce,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      resource: null,
      data: null,
    });
  }
};

export const findByDescription = async (req: Request, res: Response) => {
  try {
    const { query } = req.params;
    const commerce = await commerceFindByDescription(query);
    res.json(commerce);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      resource: null,
      data: null,
    });
  }
};
