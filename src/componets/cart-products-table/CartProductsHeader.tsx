import { TableCell } from "@mui/material";

const headers = ["Product", "Price", "Quantity", "Subtotal"];

const CartProductsHeader = () => {
  return (
    <>
      {headers?.map((item, index) => (
        <TableCell key={index}>
          <strong>{item}</strong>
        </TableCell>
      ))}
    </>
  );
};

export default CartProductsHeader;
