import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from 'tailwind-merge'

export const twMerge = extendTailwindMerge({
    extend: {
        theme: {
            color: ['theme-primary', 'theme-secondary', 'theme-tertiary', 'theme-quarternary'],
        },
    },
})

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}
