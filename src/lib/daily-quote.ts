/**
 * Câu châm ngôn trong ngày — cùng dữ liệu (`quotes.json`) và cách chọn với Lịch An App
 * để web và app hiển thị cùng một câu trong cùng một ngày.
 */

import quotes from '@/data/quotes/quotes.json';

export interface Quote {
  content: string;
  author: string;
}

function dayOfYear(day: number, month: number, year: number): number {
  return Math.round((Date.UTC(year, month - 1, day) - Date.UTC(year, 0, 1)) / 86_400_000) + 1;
}

export function getDailyQuote(day: number, month: number, year: number): Quote {
  const list = quotes as Quote[];
  return list[(dayOfYear(day, month, year) - 1) % list.length];
}
