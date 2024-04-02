import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMilliseconds = now.getTime() - date.getTime();

  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;

  if (diffMilliseconds < minute) {
    const seconds = Math.round(diffMilliseconds / 1000);
    return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
  } else if (diffMilliseconds < hour) {
    const minutes = Math.round(diffMilliseconds / minute);
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else if (diffMilliseconds < day) {
    const hours = Math.round(diffMilliseconds / hour);
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else {
    const days = Math.round(diffMilliseconds / day);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }
}
