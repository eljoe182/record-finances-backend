import UserModel from '../models/user.model';

export interface User {
  username: string;
  password: string;
  email: string;
}

export interface UserSecure {
  email: string;
  token: string;
}

export interface UserResetPassword {
  email: string;
  password: string;
}

export const userFindById = async (id: string) => {
  return UserModel.findById(id).select(
    "-password -__v -createdAt -updatedAt"
  )
}

export const createUser = async (user: User) => {
  return UserModel.create(user);
}

export const userFindOneByEmail = async (email: string) => {
  return UserModel.findOne({ email });
}

export const userUpdateOne = async (userSecure: UserSecure) => {
  return UserModel.updateOne(
    {
      email: userSecure.email,
    },
    {
      resetPasswordToken: userSecure.token,
      resetPasswordExpires: Date.now() + 3600000,
    },
    {
      upsert: true,
    }
  );
}

export const userFindOneByToken = async (token: string) => {
  return UserModel.findOne({ resetPasswordToken: token })
}

export const userUpdatePassword = async (resetPassword: UserResetPassword) => {
  return UserModel.updateOne(
    {
      email: resetPassword.email,
    },
    {
      password: resetPassword.password,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
    {
      upsert: true,
    }
  );
}