import { TRUC } from '../constants';

export function getTruc(lunarDay: number, lunarMonth: number): string {
  return TRUC[(lunarDay + lunarMonth) % 12];
}
