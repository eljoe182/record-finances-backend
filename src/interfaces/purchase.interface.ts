export interface PurchaseItem {
  productId: string;
  quantity: number;
  price: number;
  discount: number;
  total: number;
}

export interface Purchase {
  _id?: string;
  userId: string;
  commerceId: string;
  walletId: string;
  movementId?: string;
  description: string;
  dateInvoice: Date;
  subTotal: number;
  discount: number;
  tax: number;
  net: number;
  total: number;
  items: PurchaseItem[];
}