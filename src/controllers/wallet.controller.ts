import { addBalanceWallet, allWallets, findAndUpdateWalletByIdAndUserId, findWalletById, findWalletByIdAndDelete, saveWallet } from '../helpers/wallet.helper';
import { Request, Response } from 'express';
import { addMovement } from "../helpers/movements.helper";

export const index = async (_req: Request, res: Response) => {
  const wallets = await allWallets();
  res.json({
    message: "Wallets fetched successfully!",
    resources: null,
    data: wallets,
  });
};

export const show = async (req: Request, res: Response) => {
  const { id } = req.params;
  const wallet = await findWalletById(id);

  if (!wallet) {
    res.status(404).json({
      message: "Wallet not found",
      resources: null,
      data: null,
    });
  }

  res.json({
    message: "Wallet fetched successfully!",
    resources: null,
    data: wallet,
  });
};

export const store = async (req: any, res: Response) => {
  try {
    const { description, balance } = req.body;
    const { _id: userId } = req.user;
    const wallet = await saveWallet({ description, balance, userId });

    res.json({
      message: "Wallet created successfully!",
      resources: null,
      data: wallet,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      resources: null,
      data: null,
    });
  }
};

export const update = async (req: any, res: Response) => {
  const { _id: userId } = req.user;
  const { id } = req.params;
  const { description, balance } = req.body;
  const wallet = await findAndUpdateWalletByIdAndUserId(id, userId, { description, balance });

  if (!wallet) {
    res.status(404).json({
      message: "Wallet not found",
      resources: null,
      data: null,
    });
  }

  res.json({
    message: "Wallet updated successfully!",
    resources: null,
    data: wallet,
  });
};

export const destroy = async (req: any, res: Response) => {
  const { _id: userId } = req.user;
  const { id } = req.params;
  const wallet = await findWalletByIdAndDelete(id, userId);

  if (!wallet) {
    res.status(404).json({
      message: "Wallet not found",
      resources: null,
      data: null,
    });
  }

  res.json({
    message: "Wallet deleted successfully!",
    resources: null,
    data: wallet,
  });
};

export const addBalance = async (req: any, res: Response) => {
  const { _id: userId } = req.user;
  const { wallet, amount } = req.body;

  const walletToUpdate: any = await addBalanceWallet(wallet, userId);

  if (!walletToUpdate) {
    res.status(404).json({
      message: "Wallet not found",
      resources: null,
      data: null,
    });
  }

  await addMovement({
    wallet: walletToUpdate._id,
    type: "credit",
    amount,
    origin: "addBalance",
    originId: walletToUpdate._id,
  });

  res.json({
    message: "Wallet updated successfully!",
    resources: null,
    data: walletToUpdate,
  });
};
