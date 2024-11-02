import { Timestamp } from "firebase/firestore";

export interface Store {
  id: string;
  name: string;
  userId: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Products {
  id: string;
  name: string;
  price: number;
  images: { url: string }[];
  isFeatured: boolean;
  isArchived: boolean;
  isCold: boolean;
  isHot: boolean;
  category: string;
  description: string;
  size: string;
  qty?: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Category {
  id: string;
  name: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
export interface Size {
  id: string;
  name: string;
  value: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Orders {
  id: string;
  isPaid: boolean;
  phone: string;
  orderItems: Products[];
  address: string;
  order_status: string;
  userId: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
