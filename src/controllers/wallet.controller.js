import { WalletModel } from "../models/index.js";

export const index = async (req, res) => {
  const wallets = await WalletModel.find();
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
    const wallet = await WalletModel.create({ description, balance, userId });

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
  );

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
  });

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
