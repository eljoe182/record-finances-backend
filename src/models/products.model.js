import mongoose from "mongoose";

const ProductsSchema = mongoose.Schema(
  {
    description: {
      type: mongoose.Schema.Types.String,
      trim: true,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("products", ProductsSchema, "products");
