// export const formatPrice = (value: number) => {
//   return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '0,')
// }

export const formatPrice = (value: number | string) =>
  Intl.NumberFormat().format(value as number);
