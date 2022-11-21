import { Response } from 'express';
import { userFindById } from '../helpers/user.helper';

export const profile = async (req: any, res: Response) => {
  try {
    const { _id: userId } = req.user;
    const user = await userFindById(userId);
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
