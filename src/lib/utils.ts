import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ToastActionElement, type ToastProps } from "@/components/ui/toast"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const localStore = {
    get: (key: string) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },
    set: (key: string, value: any) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error writing to localStorage:', error);
        }
    }
};

export function toggleDarkMode() {
    const root = window.document.documentElement;
    root.classList.toggle('dark');
    localStore.set('darkMode', root.classList.contains('dark'));
}

type ToastType = Pick<ToastProps, 'description' | 'title' | 'action' | 'variant'> & {
  duration?: number;
}

export const showNotification = (toast: any, {
  title,
  description,
  action,
  variant = "default",
  duration = 3000
}: ToastType) => {
  toast({
    title,
    description,
    action,
    variant,
    duration
  });
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
