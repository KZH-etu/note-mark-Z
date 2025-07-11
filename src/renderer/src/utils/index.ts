import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const locale = (window as any)?.context.locale || 'en-US';

export const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'UTC',
});

export const formatDateFromTimestamp = (timestamp: number) => dateFormatter.format(timestamp);

export const cn = (...args: ClassValue[]) => {
    return twMerge(clsx(args))
}