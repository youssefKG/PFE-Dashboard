export interface ImageCategoryInterface {
  image: File;
  url: string;
}

export interface CategoryI {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export type CreateCategoryFormDataType = {
  name: string;
  description: string;
  image: File;
};
