import mongoose from "mongoose";
import { comparePassword } from "./methods/user.methods.model.js";
import { encryptPassword } from "./middleware/user.middleware.model.js";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.String,
      trim: true,
      require: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      trim: true,
      require: true,
    },
    email: {
      type: mongoose.Schema.Types.String,
      trim: true,
      require: true,
    },
    active: {
      type: mongoose.Schema.Types.Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", encryptPassword);

UserSchema.methods.comparePassword = comparePassword;

export default mongoose.model("user", UserSchema, "user");
