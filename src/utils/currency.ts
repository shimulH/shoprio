export const formatCurrency = (
  value: number | string | undefined | null,
  options: {
    icon?: string; // e.g. "$", "৳"
    position?: "left" | "right"; // currency position
    decimalPlaces?: number;
  } = {
    icon: "৳",
    position: "left",
    decimalPlaces: 2,
  }
) => {
  if (value === undefined || value === null) return "0.00";

  const removeNumberComma = value.toString().replace(/,/g, "");

  const isDecimal = !Number.isInteger(Number(removeNumberComma)); // check decimal number

  const formattedNumber = isDecimal
    ? Number(removeNumberComma).toFixed(options.decimalPlaces)
    : Number(removeNumberComma).toString();

  const withCommas = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // apply currency formatting
  if (options.icon) {
    return options.position === "right"
      ? `${withCommas} ${options.icon}`
      : `${options.icon} ${withCommas}`;
  }

  return withCommas;
};
