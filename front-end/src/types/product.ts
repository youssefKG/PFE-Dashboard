import { CategoryI } from "./category";

export interface ProductI {
  id: string;
  name: string;
  description: string;
  sales: number;
  regularPrice: number;
  salesPrice: number;
  quantity: number;
  images: ProductImage[];
  createdAt: Date;
  updatedAt: Date;
  category: CategoryI;
}

export interface CreateProductI {
  name: string;
  description: string;
  images: File[];
  regularPrice: number;
  salesPrice: number;
  quantity: number;
  categoryId: string;
}

export interface ProductImageI {
  id: number;
  name: string;
  url: string;
  isLoading: boolean;
  file: File;
}

export interface ProductImage {
  id: string;
  imageUrl: string;
  is_primary: boolean;
  sort_order: number;
}

export interface ProductReview {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment?: string;
  status: "pending" | "approved" | "rejected";
  created_at?: string;
  updated_at?: string;
}
