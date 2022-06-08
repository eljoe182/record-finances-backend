import { transport } from "../config/nodemailer.js";
// import nodemailer from "nodemailer";
import { generateJWT, generateTokenActivation } from "../helpers/security.js";
import { UserModel } from "../models/index.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userModel = await UserModel.create({
      username,
      email,
      password,
    })
      .then((user) => {
        const { username, email } = user;
        return { username, email };
      })
      .catch((error) => {
        throw error;
      });

    return res.json({
      message: "User created successfully",
      resources: null,
      data: userModel,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userModel = await UserModel.findOne({ email });
    if (!userModel) {
      const error = new Error("Email dont exist or not confirmed");
      return res.status(400).json({
        message: error.message,
      });
    }

    const isValid = await userModel.comparePassword(password);
    if (!isValid) {
      const error = new Error("Password is not valid");
      return res.status(401).json({
        message: error.message,
      });
    }

    const token = generateJWT(userModel);

    return res.json({
      message: "User logged in",
      data: {
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const userModel = await UserModel.findOne({ email });
    if (!userModel) {
      const error = new Error("Email dont exist or not confirmed");
      return res.status(400).json({
        message: error.message,
      });
    }

    const token = generateTokenActivation();
    await userModel.updateOne({
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 3600000,
    });

    const info = await transport.sendMail({
      from: userModel.email,
      to: '"Record Finances" <recovery@record-finance.com>',
      subject: "Reset password",
      text: "Hello!",
      html: `<b>Reset your password <a href="${process.env.CLIENT_URL}/auth/recovery/${token}" >here</a>!</b>`,
    });

    console.log("Message sent: %s", info.messageId);

    return res.json({
      message: "Email sent successfully",
      data: {
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password, token } = req.body;

    const userModel = await UserModel.findOne({ resetPasswordToken: token });
    if (!userModel) {
      const error = new Error("Email dont exist or not confirmed");
      return res.status(400).json({
        message: error.message,
      });
    }

    if (userModel.resetPasswordToken !== token) {
      const error = new Error("Token is not valid");
      return res.status(400).json({
        message: error.message,
      });
    }

    if (userModel.resetPasswordExpires < Date.now()) {
      const error = new Error("Token is expired");
      return res.status(400).json({
        message: error.message,
      });
    }

    await userModel.updateOne({
      password,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    return res.json({
      message: "Password changed successfully",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
