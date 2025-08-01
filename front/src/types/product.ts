export type Product = {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  price: number;
  quantity: number;
  imageIds: string[];
};

export type Category = {
  id: string;
  name: string;
};
