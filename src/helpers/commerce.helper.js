import CommerceModel from "../models/commerce.model.js";

export const commerceInfoOrCreate = async (commerce) => {
  const { commerceId, description } = commerce;

  if (`${commerceId}`.startsWith("new-")) {
    return CommerceModel.create({
      description,
    });
  }

  return CommerceModel.findOne({ _id: commerceId });
};
