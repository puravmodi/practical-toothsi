"use client";
import { uniqBy, startCase } from "lodash";
import { products } from "@/app/mockProducts";
import { FunctionComponent } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useFilters } from "@/context/FilterProvider";

const allCategories = uniqBy(products, "category")?.map(
  (product) => product.category
);

const CategoryFilter: FunctionComponent = () => {
  const { category, updateCategory } = useFilters();
  return (
    <FormControl fullWidth>
      <InputLabel size="small">Category</InputLabel>
      <Select
        value={category}
        onChange={(e) => updateCategory(e.target.value as string)}
        label="Category"
        size="small"
      >
        <MenuItem value="All">All</MenuItem>
        {allCategories?.map((category) => (
          <MenuItem key={category} value={category}>
            {startCase(category)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;
