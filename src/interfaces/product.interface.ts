export interface Product {
  _id?: string;
  productId: string;
  description: string;
}

export interface ProductItem {
  productId: string;
  description: string;
  quantity: number;
  price: number;
  discount: number;
  total: number;
}

export interface ProductCreate {
  description: string;
}

export interface ProductUpdate {
  id: string;
  description: string;
}