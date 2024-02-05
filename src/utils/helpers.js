export const formatPrice = (price) => {
  const newNumber = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);
  return newNumber;
};

export const getUniqueValues = (products, valueType) => {
  let unique = products.map((item) => {
    return item[valueType];
  });
  if (valueType === "category" || valueType === "company") {
    unique = ["all", ...new Set(unique)];
    return unique;
  }
  if (valueType === "colors") {
    let allColors = [];
    unique.forEach((color) => {
      allColors = [...allColors, ...color];
    });
    unique = ["all", ...new Set(allColors)];
    return unique;
  }
};
