import { MovementsModel } from "../models/index.js";
import { updateBalance } from "./wallet.helper.js";

export const typeMovement = [
  {
    type: "credit",
    description: "Credit",
  },
  {
    type: "debit",
    description: "Debit",
  },
];

export const addMovement = async ({
  wallet,
  type,
  amount,
  origin,
  originId,
}) => {
  const typeTransaction = typeMovement.find((t) => t.type === type).type;

  const movement = await MovementsModel.create({
    wallet,
    type: typeTransaction,
    origin,
    originId,
    credit: typeTransaction === "credit" ? amount : 0,
    debit: typeTransaction === "debit" ? amount : 0,
  });

  await updateBalance({
    wallet,
    amount,
    type: typeMovement.find((t) => t.type === type).type,
  });

  return movement;
};
