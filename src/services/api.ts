import { Product } from "../types/Product.ts";

export const fetchData = async (): Promise<Product[]> => {
  try {
    const response = await fetch("/stackline/data/mockData.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
