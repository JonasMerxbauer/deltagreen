import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fromDateToString(date: Date) {
  date = new Date(date);
  date.setTime(date.getTime() - date.getTimezoneOffset() * 60000);
  const dateAsString = date.toISOString().substr(0, 19);
  return dateAsString;
}
