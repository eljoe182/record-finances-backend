import mongoose from "mongoose";

const WalletSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    balance: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    description: {
      type: mongoose.Schema.Types.String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("wallet", WalletSchema, "wallet");
