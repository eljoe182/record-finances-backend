import { validateJWT } from "../helpers/security.js";
import { UserModel } from "../models/index.js";

export const verifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error("No token provided");
    }

    if (!`${authorization}`.startsWith("Bearer ")) {
      throw new Error("Invalid token");
    }

    const token = authorization.split(" ")[1];
    const result = validateJWT(token);

    if (!result) {
      throw new Error("Invalid token");
    }

    const user = await UserModel.findById(result.id)
      .select("-password -token -confirmed -__v -createdAt -updatedAt")
      .lean();
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};
