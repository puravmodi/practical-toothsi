"use client";
import { Button } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { useFilters } from "@/context/FilterProvider";

const ResetFilterButton = () => {
  const { resetFilters } = useFilters();

  return (
    <Button
      variant="text"
      onClick={resetFilters}
      startIcon={<ReplayIcon />}
      sx={{ float: { xs: "right", sm: "left" } }}
    >
      Reset
    </Button>
  );
};

export default ResetFilterButton;
