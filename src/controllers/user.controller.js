import { UserModel } from "../models/index.js";

export const profile = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const user = await UserModel.findById(userId).select(
      "-password -__v -createdAt -updatedAt"
    );
    res.json({
      message: "User profile",
      resources: null,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error getting user profile",
      resources: null,
      data: error,
    });
  }
};
