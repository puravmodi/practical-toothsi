"use client";
import { CartItem, useCart } from "@/context/CartContextProvider";
import { useFilters } from "@/context/FilterProvider";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";

const AddToCart: FunctionComponent = () => {
  const router = useRouter();
  const { setCart } = useCart();
  const { products } = useFilters();
  const isDisabled = products.some(
    (product) => product.isSelected && product.quantity !== 0
  );

  const handleAddToCart = () => {
    const selectedProducts: CartItem[] = products
      ?.filter((product) => product?.isSelected)
      ?.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      }));
    setCart(selectedProducts);
    if (selectedProducts?.length) {
      router?.push("/cart-summary");
    }
  };

  return (
    <Button
      variant="contained"
      onClick={handleAddToCart}
      disabled={!isDisabled}
    >
      Add to cart
    </Button>
  );
};

export default AddToCart;
