import { Commerce, CommerceCreate, CommerceUpdate } from '../interfaces/commerce.interface';
import CommerceModel from "../models/commerce.model";

export const commerceFindAll = async () => {
  return CommerceModel.find().select(
    "-__v -_id -createdAt -updatedAt"
  );
}

export const commerceStore = async (commerce: CommerceCreate) => {
  return CommerceModel.findOneAndUpdate(
    {
      description: `${commerce.description}`.toUpperCase(),
    },
    {
      description: `${commerce.description}`.toUpperCase(),
    },
    {
      new: true,
      overwrite: true,
      upsert: true,
    }
  ).select("-__v -_id -createdAt -updatedAt");
}

export const commerceFindById = async (id: string) => {
  return CommerceModel.findById(id);
}

export const commerceUpdate = async (commerce: CommerceUpdate) => {
  return CommerceModel.findByIdAndUpdate(
    commerce.id,
    {
      description: `${commerce.description}`.toUpperCase(),
    },
    {
      new: true,
    }
  );
}

export const commerceDestroy = async (id: string) => {
  return CommerceModel.findByIdAndDelete(id);
}

export const commerceFindByDescription = async (query: string) => {
  return CommerceModel.find({
    description: {
      $regex: query,
      $options: "imsx",
    },
  }).select("-__v -_id -createdAt -updatedAt").lean();
}

export const commerceInfoOrCreate: any = async (commerce: Commerce) => {
  const { commerceId, description } = commerce;

  if (`${commerceId}`.startsWith("new-")) {
    return CommerceModel.create({
      description,
    });
  }

  return CommerceModel.findOne({ _id: commerceId }).lean();
};
