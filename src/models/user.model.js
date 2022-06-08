import mongoose from "mongoose";
import { comparePassword } from "./methods/user.methods.model.js";
import {
  encryptPassword,
  encryptPasswordUpdateOne,
} from "./middleware/user.middleware.model.js";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.String,
      trim: true,
      require: true,
      unique: true,
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
      unique: true,
    },
    active: {
      type: mongoose.Schema.Types.Boolean,
      default: true,
    },
    resetPasswordToken: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    resetPasswordExpires: {
      type: mongoose.Schema.Types.Date,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ username: 1, email: 1 }, { unique: true });

UserSchema.pre("save", encryptPassword);
UserSchema.pre("updateOne", encryptPasswordUpdateOne);

UserSchema.methods.comparePassword = comparePassword;

export default mongoose.model("user", UserSchema, "user");
