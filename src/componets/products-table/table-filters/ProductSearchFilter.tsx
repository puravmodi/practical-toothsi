"use client";
import { useFilters } from "@/context/FilterProvider";
import { TextField } from "@mui/material";

const ProductSearchFilter = () => {
  const { searchQuery, updateSearchQuery } = useFilters();

  return (
    <TextField
      fullWidth
      label="Search"
      value={searchQuery}
      onChange={(e) => updateSearchQuery(e.target.value)}
      size="small"
    />
  );
};

export default ProductSearchFilter;
