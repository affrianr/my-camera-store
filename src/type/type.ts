import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
}

export type NewUser = Omit<User, "_id">;

export interface Product {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  totalItem?: number;
  data?: Product[];
}

export interface Wishlist {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type NewWishlist = Omit<Wishlist, "_id">;
