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
  console.log(date);
  const parseFormat = date.length > 10 ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd";
  const parsedDate = parse(date, parseFormat, new Date());
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

/**
 * Check if a date is after another date.
 * @param date1 string in the format "yyyy-MM-dd"
 * @param date2 string in the format "yyyy-MM-dd"
 * @returns boolean indicating if date1 is after date2
 */
export function isAfter(date1: string, date2: string): boolean {
  console.log("Comparing date1:", date1, "with date2:", date2);
  const parseFormat1 = date1.length > 10 ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd";
  const parseFormat2 = date2.length > 10 ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd";
  const parsedDate1 = parse(date1, parseFormat1, new Date());
  const parsedDate2 = parse(date2, parseFormat2, new Date());
  console.log("Comparing dates:", parsedDate1, parsedDate2);
  return parsedDate1 > parsedDate2;
}
