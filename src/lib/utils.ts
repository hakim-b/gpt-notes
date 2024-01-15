import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string | null | undefined) {
  return name
    ?.split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");
}
