import { WalletCreate, WalletFindUpdate, WalletUpdate } from '../interfaces/wallet.interface';
import WalletModel from "../models/wallet.model";

export const allWallets = async () => {
  return WalletModel.find().select(
    "-__v -createdAt -updatedAt -userId"
  );
}

export const findWalletById = async (id: string) => {
  return WalletModel.findById(id)
}

export const saveWallet = async (wallet: WalletCreate) => {
  return WalletModel.create({
    description: wallet.description,
    balance: wallet.balance,
    userId: wallet.userId,
  }).then((wallet) => {
    const { _id, description, balance } = wallet;
    return { _id, description, balance };
  });
}

export const findAndUpdateWalletByIdAndUserId = async (id: string, userId: string, data: WalletFindUpdate) => {
  return WalletModel.findByIdAndUpdate(
    {
      _id: id,
      userId,
    },
    {
      description: data.description,
      balance: data.balance,
    },
    {
      new: true,
    }
  ).select("-__v -createdAt -updatedAt -userId");
}

export const updateBalance = async (walletUpdate: WalletUpdate) => {
  const walletUpdated = await WalletModel.findById(walletUpdate.wallet);

  if (!walletUpdated) {
    throw new Error("Wallet not found");
  }

  if (walletUpdate.type === "credit") {
    walletUpdated.balance += walletUpdate.amount;
  } else {
    walletUpdated.balance -= walletUpdate.amount;
  }

  return await walletUpdated.save();
};

export const findWalletByIdAndDelete = async (id: string, userId: string) => {
  return WalletModel.findByIdAndDelete({
    _id: id,
    userId,
  }).select("-__v -createdAt -updatedAt -userId");
}

export const addBalanceWallet = async (wallet: string, amount: number) => {
  const walletToUpdate = await WalletModel.findById(wallet);

  if (!walletToUpdate) {
    throw new Error("Wallet not found");
  }

  walletToUpdate.balance += amount;

  return await walletToUpdate.save();
}
