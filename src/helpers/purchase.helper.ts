import { Purchase } from '../interfaces/purchase.interface';
import PurchaseModel from "../models/purchase.model";

export const findPurchaseByUserId = async (userId: string) => {
  PurchaseModel.find({
    userId,
  }).select("-__v -createdAt -updatedAt")
    .populate("commerceId", "-__v -createdAt -updatedAt")
    .populate("items.productId", "-__v -createdAt -updatedAt")
    .populate("walletId", "-__v -createdAt -updatedAt");
}

export const findPurchaseByIdAndUserId = async (id: string, userId: string) => {
  return PurchaseModel.findOne({
    _id: id,
    userId,
  })
    .select("-__v -userId -createdAt -updatedAt")
    .populate("items.productId", "description")
    .populate("commerceId", "description")
    .populate("walletId", "description");
}

export const createPurchase = async (purchase: Purchase) => {
  return PurchaseModel.create({
    userId: purchase.userId,
    commerceId: purchase.commerceId,
    walletId: purchase.walletId,
    description: purchase.description,
    dateInvoice: purchase.dateInvoice,
    subTotal: purchase.subTotal,
    discount: purchase.discount,
    net: purchase.net,
    tax: purchase.tax,
    total: purchase.total,
    items: purchase.items,
  });
}

export const findPurchaseOneAndDelete = async (id: string, userId: string) => {
  return PurchaseModel.findOneAndDelete({
    _id: id,
    userId,
  })
}