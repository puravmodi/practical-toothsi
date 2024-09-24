import React from "react";
import SortableTable from "@/componets/productsTable/SortableTable";
import { products } from "@/app/mockProducts";

const ProductsPage = () => {
  return <SortableTable rows={products} />;
};

export default ProductsPage;
