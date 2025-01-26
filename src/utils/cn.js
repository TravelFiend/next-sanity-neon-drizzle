import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const conditionalClasses = (...args) => {
  return twMerge(clsx(args));
};

export default conditionalClasses;
