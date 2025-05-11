import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class values into a single className string, using clsx and tailwind-merge for proper handling of Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date into a readable string based on the provided options
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  }
) {
  return new Intl.DateTimeFormat("en-US", {
    ...options,
  }).format(typeof date === "string" || typeof date === "number" ? new Date(date) : date);
}

/**
 * Formats a currency value with provided options
 */
export function formatCurrency(
  value: number,
  options: Intl.NumberFormatOptions = { 
    style: "currency", 
    currency: "USD" 
  }
) {
  return new Intl.NumberFormat("en-US", options).format(value);
}

/**
 * Creates a debounced version of a function
 * @param fn The function to debounce
 * @param delay The delay in milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
