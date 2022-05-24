import mongoose from "mongoose";

const PurchaseSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    commerceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "commerce",
    },
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "wallet",
    },
    description: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    dateInvoice: {
      type: mongoose.Schema.Types.Date,
      require: true,
    },
    subTotal: {
      type: mongoose.Schema.Types.Number,
      require: true,
    },
    tax: {
      type: mongoose.Schema.Types.Number,
      require: true,
    },
    total: {
      type: mongoose.Schema.Types.Number,
      require: true,
    },
    items: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
          },
          quantity: {
            type: mongoose.Schema.Types.Number,
            require: true,
          },
          price: {
            type: mongoose.Schema.Types.Number,
            require: true,
          },
          tax: {
            type: mongoose.Schema.Types.Number,
            require: false,
            default: 0,
          },
          discount: {
            type: mongoose.Schema.Types.Number,
            require: false,
            default: 0,
          },
          total: {
            type: mongoose.Schema.Types.Number,
            require: true,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("purchase", PurchaseSchema, "purchase");
