"use client";
import { uniqBy } from "lodash";
import { products } from "@/app/mockProducts";
import { FunctionComponent, memo } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useFilters } from "@/context/FilterProvider";

const allSizes = uniqBy(products, "size")?.map((product) => product.size);

const SizeFilter: FunctionComponent = () => {
  console.log("@@@ Size FIlter re-rendered");

  const { size, updateSize } = useFilters();

  return (
    <FormControl fullWidth>
      <InputLabel size="small">Size</InputLabel>
      <Select
        value={size}
        onChange={(e) => updateSize(e.target.value as string)}
        label="Size"
        size="small"
      >
        <MenuItem value="All">All</MenuItem>
        {allSizes?.map((size) => (
          <MenuItem key={size} value={size}>
            {size}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default memo(SizeFilter);
