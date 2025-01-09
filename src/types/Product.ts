import { Sale } from "./Sale";

export type Product = {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  reviews: Review[];
  retailer: string;
  details: string[];
  tags: string[];
  sales: Sale[];
};

type Review = {
  customer: string;
  review: string;
  score: number;
};
