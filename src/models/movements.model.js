import mongoose from "mongoose";

const MovementsSchema = mongoose.Schema(
  {
    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "wallet",
      require: true,
    },
    type: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    origin: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    originId: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    debit: {
      type: mongoose.Schema.Types.Number,
      require: true,
      default: 0,
    },
    credit: {
      type: mongoose.Schema.Types.Number,
      require: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("movements", MovementsSchema, "movements");
