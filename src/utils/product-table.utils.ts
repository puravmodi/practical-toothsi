import { Product } from "@/types/product.type";

// Comparator logic for sorting
export const descendingComparator = <T>(a: T, b: T, orderBy: keyof T) => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};

export const getComparator = (
  order: "asc" | "desc",
  orderBy: keyof Product
) => {
  return order === "desc"
    ? (a: Product, b: Product) => descendingComparator<Product>(a, b, orderBy)
    : (a: Product, b: Product) => -descendingComparator<Product>(a, b, orderBy);
};

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedArray = array.map((el, index) => [el, index] as [T, number]);
  stabilizedArray.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedArray.map((el) => el[0]);
}
