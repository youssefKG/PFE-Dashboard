export interface ProductI {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: string;
  brand_id: string;
  status: "active" | "inactive";
  images?: ProductImage[];
  reviews?: ProductReview[];
  created_at?: string;
  updated_at?: string;
}

export interface CreateProductI {
  name: string;
  description: string;
  brand: string;
  images: File[];
  regularPrice: number;
  salesPrice: number;
  quantity: number;
  category_id: string;
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
  product_id: string;
  image_path: string;
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
