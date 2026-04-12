/**
 * Format a number as Brazilian Real currency.
 * @param value number
 * @returns string formatted as Brazilian Real currency
 */
export function formatMoney(value: number): string {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
