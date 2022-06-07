import mongoose from "mongoose";

const PurchaseSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    commerceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "commerce",
      require: true,
    },
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "wallet",
      require: true,
    },
    movementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movements",
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
      default: 0,
    },
    discount: {
      type: mongoose.Schema.Types.Number,
      require: true,
      default: 0,
    },
    tax: {
      type: mongoose.Schema.Types.Number,
      require: true,
      default: 0,
    },
    net: {
      type: mongoose.Schema.Types.Number,
      require: true,
      default: 0,
    },
    total: {
      type: mongoose.Schema.Types.Number,
      require: true,
      default: 0,
    },
    items: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            require: true,
          },
          quantity: {
            type: mongoose.Schema.Types.Number,
            require: true,
            default: 0,
          },
          price: {
            type: mongoose.Schema.Types.Number,
            require: true,
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
            default: 0,
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
