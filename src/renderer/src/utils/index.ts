import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const dateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'UTC',
});

export const formatDateFromTimestamp = (timestamp: number) => dateFormatter.format(timestamp);

export const cn = (...args: ClassValue[]) => {
    return twMerge(clsx(args))
}