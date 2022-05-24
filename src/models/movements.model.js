import mongoose from "mongoose";

const MovementsSchema = mongoose.Schema(
  {
    description: {
      type: mongoose.Schema.Types.String,
      trim: true,
      require: true,
    },
    dateOperation: {
      type: mongoose.Schema.Types.Date,
      require: true,
    },
    document: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    typeDocument: {
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
