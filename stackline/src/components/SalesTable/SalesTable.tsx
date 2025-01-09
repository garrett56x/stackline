import React, { useState } from "react";
import { Sale } from "../../types/Sale";
import "./SalesTable.css";

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
    data: any[],
    key: string,
    direction: "ascending" | "descending"
  ) => {
    return data.sort((a, b) => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");
  };

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
              <td>
                {(sale.retailSales / 100).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </td>
              <td>
                {(sale.wholesaleSales / 100).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </td>
              <td>{sale.unitsSold}</td>
              <td>
                {(sale.retailerMargin / 100).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
