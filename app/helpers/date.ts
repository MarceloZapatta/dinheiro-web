import { format, parse, parseJSON } from "date-fns";

/**
 * Format a date string into a specified format.
 * @param date string in the format "yyyy-MM-dd"
 * @param formatString string representing the desired date format
 * @returns string formatted date
 */
export function formatDate(
  date: string,
  formatString: string = "dd/MM",
): string {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  return format(parsedDate, formatString);
}

/**
 * Format a date string into a specified format.
 * @param date string in the format "yyyy-MM-ddThh:mm:ss.sssZ"
 * @param formatString string representing the desired date format
 * @returns string formatted date
 */
export function formatISOString(
  date: string,
  formatString: string = "dd/MM",
): string {
  const parsedDate = parseJSON(date);
  return format(parsedDate, formatString);
}
