import React, { useState } from "react";
import { Sale } from "../../types/Sale";
import "./SalesTable.css";
import { formatCurrency, formatDate } from "../../utils/formatters.ts";

interface SalesTableProps {
  sales: Sale[];
}

const SalesTable = ({ sales }: SalesTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  }>({
    key: "weekEnding",
    direction: "ascending",
  });

  const sortData = (
    data: Sale[],
    key: string,
    direction: "ascending" | "descending"
  ) => {
    return [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedSales = sortData(
    [...sales],
    sortConfig.key,
    sortConfig.direction
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th
              onClick={() => requestSort("weekEnding")}
              className={
                sortConfig.key === "weekEnding"
                  ? `sorted-${sortConfig.direction}`
                  : ""
              }
            >
              Week Ending
            </th>
            <th
              onClick={() => requestSort("retailSales")}
              className={
                sortConfig.key === "retailSales"
                  ? `sorted-${sortConfig.direction}`
                  : ""
              }
            >
              Retail Sales
            </th>
            <th
              onClick={() => requestSort("wholesaleSales")}
              className={
                sortConfig.key === "wholesaleSales"
                  ? `sorted-${sortConfig.direction}`
                  : ""
              }
            >
              Wholesale Sales
            </th>
            <th
              onClick={() => requestSort("unitsSold")}
              className={
                sortConfig.key === "unitsSold"
                  ? `sorted-${sortConfig.direction}`
                  : ""
              }
            >
              Units Sold
            </th>
            <th
              onClick={() => requestSort("retailerMargin")}
              className={
                sortConfig.key === "retailerMargin"
                  ? `sorted-${sortConfig.direction}`
                  : ""
              }
            >
              Retailer Margin
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedSales.map((sale, index) => (
            <tr key={index}>
              <td>{formatDate(sale.weekEnding)}</td>
              <td>{formatCurrency(sale.retailSales / 100)}</td>
              <td>{formatCurrency(sale.wholesaleSales / 100)}</td>
              <td>{sale.unitsSold}</td>
              <td>{formatCurrency(sale.retailerMargin / 100)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
