export interface Commerce {
  _id: string;
  commerceId: string;
  description: string;
}

export interface CommerceCreate {
  description: string;
}

export interface CommerceUpdate {
  id: string;
  description: string;
}