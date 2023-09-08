export const formatPrice = (value: number | string) =>
  Intl.NumberFormat().format(value as number);
