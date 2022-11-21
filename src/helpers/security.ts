import { variables } from '../config/variables';
import jwt from "jsonwebtoken";

export const generateTokenActivation = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const generateJWT = (user: any) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    variables.SECRET,
    {
      expiresIn: "1d",
    }
  );
};

export const validateJWT = (token: string) => {
  try {
    return jwt.verify(token, variables.SECRET);
  } catch (err) {
    return false;
  }
};
