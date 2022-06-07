import { addMovement } from "../helpers/movements.helper.js";
import { WalletModel } from "../models/index.js";

export const index = async (req, res) => {
  const wallets = await WalletModel.find().select(
    "-__v -createdAt -updatedAt -userId"
  );
  res.json({
    message: "Wallets fetched successfully!",
    resources: null,
    data: wallets,
  });
};

export const show = async (req, res) => {
  const { id } = req.params;
  const wallet = await WalletModel.findById(id);

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

export const store = async (req, res) => {
  try {
    const { description, balance } = req.body;
    const { _id: userId } = req.user;
    const wallet = await WalletModel.create({
      description,
      balance,
      userId,
    }).then((wallet) => {
      const { _id, description, balance } = wallet;
      return { _id, description, balance };
    });

    res.json({
      message: "Wallet created successfully!",
      resources: null,
      data: wallet,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      resources: null,
      data: null,
    });
  }
};

export const update = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;
  const { description, balance } = req.body;
  const wallet = await WalletModel.findByIdAndUpdate(
    {
      _id: id,
      userId,
    },
    {
      description,
      balance,
    },
    {
      new: true,
    }
  ).select("-__v -createdAt -updatedAt -userId");

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

export const destroy = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;
  const wallet = await WalletModel.findByIdAndDelete({
    _id: id,
    userId,
  }).select("-__v -createdAt -updatedAt -userId");

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

export const addBalance = async (req, res) => {
  const { _id: userId } = req.user;
  const { wallet, amount } = req.body;

  const walletToUpdate = await WalletModel.findOne({
    _id: wallet,
    userId,
  }).select("-__v -createdAt -updatedAt -userId");

  walletToUpdate.balance += amount;

  await walletToUpdate.save();

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
