export interface WalletUpdate {
  wallet: string;
  amount: number;
  type: string;
}

export interface WalletCreate {
  description: string;
  balance: number;
  userId: string;
}

export interface WalletFindUpdate {
  description: string;
  balance: number;
}