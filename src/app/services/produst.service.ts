export const getAllProducts = async () => {
  const res = await fetch(`/all-products`);
  const data = await res.json();
  return data;
};

export const getProductById = async (ids: number[]) => {
  const res = await fetch(`/api/productById`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productIds: ids }),
  });

  return await res.json();
};
