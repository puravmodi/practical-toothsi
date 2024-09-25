"use client";
import { Button, TextField } from "@mui/material";
import { FunctionComponent } from "react";
import CategoryFilter from "./table-filters/CategoryFilter";
import SizeFilter from "./table-filters/SizeFilter";
import Grid from "@mui/material/Grid2";
import { useFilters } from "@/context/FilterProvider";
import ReplayIcon from "@mui/icons-material/Replay";

const TableFilters: FunctionComponent = () => {
  const { resetFilters, searchQuery, updateSearchQuery } = useFilters();
  return (
    <>
      <Grid size={{ xs: 12, md: 4, lg: 2 }}>
        <CategoryFilter />
      </Grid>
      <Grid size={{ xs: 12, md: 4, lg: 2 }}>
        <SizeFilter />
      </Grid>
      <Grid size={{ xs: 12, md: 4, lg: 3 }}>
        <Button
          variant="text"
          onClick={resetFilters}
          startIcon={<ReplayIcon />}
          sx={{ float: { xs: "right", sm: "left" } }}
        >
          Reset
        </Button>
      </Grid>
      <Grid size={"grow"}>
        <TextField
          fullWidth
          label="Search"
          value={searchQuery}
          onChange={(e) => updateSearchQuery(e.target.value)}
          size="small"
        />
      </Grid>
    </>
  );
};

export default TableFilters;
