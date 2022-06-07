import { commerceInfoOrCreate } from "../helpers/commerce.helper.js";
import { scanProducts } from "../helpers/product.helper.js";
import { PurchaseModel } from "../models/index.js";
import { addMovement } from "../helpers/movements.helper.js";

export const index = async (req, res) => {
  const { _id: userId } = req.user;
  const purchases = await PurchaseModel.find({
    userId,
  })
    .select("-__v -createdAt -updatedAt")
    .populate("commerceId", "-__v -createdAt -updatedAt")
    .populate("items.productId", "-__v -createdAt -updatedAt")
    .populate("walletId", "-__v -createdAt -updatedAt");
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

    const commerce = await commerceInfoOrCreate({
      commerceId,
      description: commerceDescription,
    });

    const itemsFixed = await scanProducts(items);

    const purchase = await PurchaseModel.create({
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
    });

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
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const show = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { id } = req.params;
    const purchase = await PurchaseModel.findOne({
      _id: id,
      userId,
    })
      .select("-__v -userId -createdAt -updatedAt")
      .populate("items.productId", "description")
      .populate("commerceId", "description")
      .populate("walletId", "description");
    res.json({
      message: "Purchase info",
      resources: null,
      data: purchase,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const destroy = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { id } = req.params;
    const purchase = await PurchaseModel.findOneAndDelete({
      _id: id,
      userId,
    });

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
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
