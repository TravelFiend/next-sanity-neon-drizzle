import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const conditionalClasses = (...args: ClassValue[]): string => {
  return twMerge(clsx(args));
};

export default conditionalClasses;
