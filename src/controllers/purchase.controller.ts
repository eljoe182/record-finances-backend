import { Response } from 'express';
import { commerceInfoOrCreate } from "../helpers/commerce.helper";
import { scanProducts } from "../helpers/product.helper";
import { addMovement } from "../helpers/movements.helper";
import { Commerce } from '../interfaces/commerce.interface';
import { createPurchase, findPurchaseByIdAndUserId, findPurchaseByUserId, findPurchaseOneAndDelete } from '../helpers/purchase.helper';

export const index = async (req: any, res: Response) => {
  const { _id: userId } = req.user;
  const purchases = await findPurchaseByUserId(userId)
  res.json({
    message: "Purchases list",
    resources: null,
    data: purchases,
  });
};

export const store = async (req: any, res: Response) => {
  try {
    const { _id: userId } = req.user;
    const {
      commerceId,
      commerceDescription,
      walletId,
      description,
      dateInvoice,
      subTotal,
      discountTotal,
      net,
      tax,
      total,
      items,
    } = req.body;

    const commerce: Commerce = await commerceInfoOrCreate({
      commerceId,
      description: commerceDescription,
    });

    const itemsFixed = await scanProducts(items);

    const purchase: any = await createPurchase({
      userId,
      commerceId: commerce._id,
      walletId,
      description,
      dateInvoice,
      subTotal,
      discount: discountTotal,
      net,
      tax,
      total,
      items: itemsFixed,
    })

    const movement = await addMovement({
      wallet: walletId,
      type: "debit",
      amount: total,
      origin: "purchase",
      originId: purchase._id,
    });

    purchase.movementId = movement._id;
    await purchase.save();

    res.status(201).json({
      message: "Purchase created successfully",
      resources: null,
      data: purchase,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const show = async (req: any, res: Response) => {
  try {
    const { _id: userId } = req.user;
    const { id } = req.params;
    const purchase = await findPurchaseByIdAndUserId(id, userId);
    res.json({
      message: "Purchase info",
      resources: null,
      data: purchase,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const destroy = async (req: any, res: Response) => {
  try {
    const { _id: userId } = req.user;
    const { id } = req.params;
    const purchase: any = await findPurchaseOneAndDelete(id, userId);

    await addMovement({
      wallet: purchase.walletId,
      type: "credit",
      amount: purchase.total,
      origin: "purchase",
      originId: null,
    });

    res.json({
      message: "Purchase deleted successfully",
      resources: null,
      data: purchase,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
