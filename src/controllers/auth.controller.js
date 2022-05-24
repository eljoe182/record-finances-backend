import { generateJWT, generateTokenActivation } from "../helpers/security.js";
import { UserModel } from "../models/index.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const token = generateTokenActivation();
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
