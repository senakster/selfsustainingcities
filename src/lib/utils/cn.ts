import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from 'tailwind-merge'

export const twMerge = extendTailwindMerge({
    extend: {
        theme: {
            animate: ['animate-appear'],
            color: ['theme-primary', 'theme-secondary', 'theme-tertiary', 'theme-quarternary'],
            text: ['text-theme-primary', 'text-theme-secondary', 'text-theme-tertiary', 'text-theme-quarternary', 'text-background','text-foreground'],
        },
    },
})

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}
