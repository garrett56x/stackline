import { Product } from "../types/Product.ts";

export const fetchData = async (): Promise<Product[]> => {
  try {
    console.log("HERE");
    const response = await fetch("/stackline/data/mockData.json");
    console.log({ response });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
