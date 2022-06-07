import { WalletModel } from "../models/index.js";

export const updateBalance = async ({ wallet, amount, type }) => {
  const walletUpdated = await WalletModel.findById(wallet);

  if (type === "credit") {
    walletUpdated.balance += amount;
  } else {
    walletUpdated.balance -= amount;
  }

  return await walletUpdated.save();
};
