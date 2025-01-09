export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString + "T00:00:00Z");
  return date
    .toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      timeZone: "UTC",
    })
    .replace(/\//g, "-");
};
