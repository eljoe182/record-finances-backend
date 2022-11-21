export interface Movement {
  _id?: string;
  wallet: string;
  type: string;
  origin: string;
  originId: string;
  credit: number;
  debit: number;
}

export interface MovementAdd {
  wallet: string;
  type: string;
  amount: number;
  origin: string;
  originId: string | null;
}