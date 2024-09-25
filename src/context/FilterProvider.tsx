"use client";
import { products as mockProducts } from "@/app/mockProducts";
import { getFilteredProducts } from "@/services/produst.service";
import { Product } from "@/types/product.type";
import {
  createContext,
  Dispatch,
  FunctionComponent,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface FilterContextType {
  category: string;
  size: string;
  searchQuery: string;
  updateCategory: (category: string) => void;
  updateSize: (size: string) => void;
  updateSearchQuery: (query: string) => void;
  resetFilters: () => void;
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

// Create the context
export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
);

// Create the provider component
export const FilterProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  // State to hold cart items
  const [category, setCategory] = useState<string>("All");
  const [size, setSize] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [products, setProducts] = useState<Product[]>(mockProducts);

  const resetFilters = useCallback(() => {
    setCategory("All");
    setSize("All");
    const filteredProducts = getFilteredProducts(category, size, searchQuery);
    setProducts(filteredProducts);
  }, []);

  const updateCategory = useCallback(
    (newCategory: string) => {
      setCategory(newCategory);
      const filteredProducts = getFilteredProducts(
        newCategory,
        size,
        searchQuery
      );
      setProducts(filteredProducts);
    },
    [products, searchQuery, size]
  );

  const updateSize = useCallback(
    (newSize: string) => {
      setSize(newSize);
      const filteredProducts = getFilteredProducts(
        category,
        newSize,
        searchQuery
      );
      setProducts(filteredProducts);
    },
    [category, products, searchQuery]
  );

  const updateSearchQuery = useCallback(
    (newQuery: string) => {
      setSearchQuery(newQuery);
      const filteredProducts = getFilteredProducts(category, size, newQuery);
      setProducts(filteredProducts);
    },
    [category, products, size]
  );

  const memoisedValue = useMemo(() => {
    return {
      category,
      updateCategory,
      size,
      updateSize,
      searchQuery,
      updateSearchQuery,
      resetFilters,
      products,
      setProducts,
    };
  }, [
    category,
    updateCategory,
    size,
    updateSize,
    searchQuery,
    updateSearchQuery,
    resetFilters,
    products,
  ]);

  return (
    <FilterContext.Provider value={memoisedValue}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) {
    throw new Error("useFilters should be wrapped within FilterProvider.");
  }
  return ctx;
};
