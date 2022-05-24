import { PurchaseModel } from "../models/index.js";

export const index = async (req, res) => {
  const { _id: userId } = req.user;
  const purchases = await PurchaseModel.find({
    userId,
  });
  res.json({
    message: "Purchases list",
    resources: null,
    data: purchases,
  });
};

export const store = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const {
      commerceId,
      walletId,
      description,
      dateInvoice,
      subTotal,
      tax,
      total,
      items,
    } = req.body;
    const purchase = await PurchaseModel.create({
      userId,
      commerceId,
      walletId,
      description,
      dateInvoice,
      subTotal,
      tax,
      total,
      items,
    });
    res.json({
      message: "Purchase created successfully",
      resources: null,
      data: purchase,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
