import { MovementAdd } from '../interfaces/movement.interface';
import MovementsModel from "../models/movements.model";
import { updateBalance } from "./wallet.helper";

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

export const addMovement = async (movementAdd: MovementAdd) => {
  const typeTransaction = typeMovement.find((t) => t.type === movementAdd.type)?.type || "credit";

  const movement = await MovementsModel.create({
    wallet: movementAdd.wallet,
    type: typeTransaction,
    origin: movementAdd.origin,
    originId: movementAdd.originId,
    credit: typeTransaction === "credit" ? movementAdd.amount : 0,
    debit: typeTransaction === "debit" ? movementAdd.amount : 0,
  });

  await updateBalance({
    wallet: movementAdd.wallet,
    amount: movementAdd.amount,
    type: typeTransaction,
  });

  return movement;
};
