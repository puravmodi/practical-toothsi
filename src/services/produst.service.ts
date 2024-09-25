import { products } from "@/app/mockProducts";

export const getAllProducts = async () => {
  // const res = await fetch(`/all-products`);
  // const data = await res.json();
  return Promise.resolve(products);
};

export const getProductById = async (ids: number[]) => {
  const res = await fetch(`/api/productById`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productIds: ids }),
  });

  return await res.json();
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
