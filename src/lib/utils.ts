import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ignoreTimezone(date: Date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
}
