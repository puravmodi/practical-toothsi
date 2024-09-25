import { Container } from "@mui/material";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/componets/layout/Header";
import { CartProvider } from "@/context/CartContextProvider";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <CartProvider>
          <Container sx={{ marginTop: "50px" }}>{children}</Container>
        </CartProvider>
      </body>
    </html>
  );
}
