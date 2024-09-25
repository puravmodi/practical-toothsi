import { products } from "@/app/mockProducts";

export const getAllProducts = () => {
  return products;
};

export const getProductById = (ids: number[]) => {
  const product = products.filter((product) => ids.includes(product.id));
  return product || null;
};

export const getFilteredProducts = (
  category: string,
  size: string,
  query: string
) => {
  const filteredProducts = products?.filter((product) => {
    const categoryMatch =
      category !== "All" ? product.category === category : true;
    const sizeMatch = size !== "All" ? product.size === size : true;
    const searchMatch = query
      ? product.name.toLowerCase().includes(query.toLowerCase())
      : true;
    return categoryMatch && sizeMatch && searchMatch;
  });
  return filteredProducts;
};
