import { Response, NextFunction } from 'express';
import { validateJWT } from "../helpers/security";
import UserModel from "../models/user.model";

export const verifyToken = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error("No token provided");
    }

    if (!`${authorization}`.startsWith("Bearer ")) {
      throw new Error("Invalid token");
    }

    const token = authorization.split(" ")[1];
    const result: any = validateJWT(token);

    if (!result) {
      throw new Error("Invalid token");
    }

    const user = await UserModel.findById(result.id)
      .select("-password -token -confirmed -__v -createdAt -updatedAt")
      .lean();
    req.user = user;

    next();
  } catch (error: any) {
    res.status(401).json({
      message: error.message,
    });
  }
};
