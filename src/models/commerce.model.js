import mongoose from "mongoose";

const CommerceSchema = mongoose.Schema(
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

export default mongoose.model("commerce", CommerceSchema, "commerce");
