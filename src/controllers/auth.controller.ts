import { Request, Response } from 'express';
import { variables } from '../config/variables';
import { transport } from "../config/nodemailer";
import { generateJWT, generateTokenActivation } from "../helpers/security";
import { createUser, userFindOneByEmail, userFindOneByToken, userUpdateOne, userUpdatePassword } from '../helpers/user.helper';

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const userModel = await createUser({
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
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userModel = await userFindOneByEmail(email);
    if (!userModel) {
      const error = new Error("Email dont exist or not confirmed");
      return res.status(400).json({
        message: error.message,
      });
    }

    const isValid = userModel.comparePassword(password);
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
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const userModel = await userFindOneByEmail(email);
    if (!userModel) {
      const error = new Error("Email dont exist or not confirmed");
      return res.status(400).json({
        message: error.message,
      });
    }

    const token = generateTokenActivation();
    await userUpdateOne({
      email: userModel.email,
      token,
    });

    const info = await transport.sendMail({
      from: userModel.email,
      to: '"Record Finances" <recovery@record-finance.com>',
      subject: "Reset password",
      text: "Hello!",
      html: `<b>Reset your password <a href="${variables.CLIENT}/auth/recovery/${token}" >here</a>!</b>`,
    });

    console.log("Message sent: %s", info.messageId);

    return res.json({
      message: "Email sent successfully",
      data: {
        token,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { password, token } = req.body;

    const userModel = await userFindOneByToken(token);
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

    if (userModel.resetPasswordExpires.getTime() < Date.now()) {
      const error = new Error("Token is expired");
      return res.status(400).json({
        message: error.message,
      });
    }

    await userUpdatePassword({
      email: userModel.email,
      password,
    });

    return res.json({
      message: "Password changed successfully",
      data: null,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
