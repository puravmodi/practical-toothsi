export interface Product {
  image: string;
  name: string;
  color: string;
  stock: number;
  price: number;
  category: string;
  size: string;
  id: number;
  quantity: number;
  isSelected: boolean;
}

export interface HeadCell {
  id: keyof Product | "buy";
  label: string;
  sortable: boolean;
}
