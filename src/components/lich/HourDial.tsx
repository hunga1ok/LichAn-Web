'use client';

import { useSyncExternalStore } from 'react';
import { DIA_CHI } from '@/lib/constants';
import { chiIndexForHour } from '@/lib/lunar/day-verdict';
import { vnNow, type VnNow } from '@/lib/vn-date';

// Kho đồng hồ dùng chung cho mọi component, chỉ đổi giá trị khi sang phút mới
let clockSnapshot: VnNow | null = null;

function readClock(): VnNow {
  const n = vnNow();
  if (!clockSnapshot || clockSnapshot.minute !== n.minute || clockSnapshot.hour !== n.hour || clockSnapshot.day !== n.day) {
    clockSnapshot = n;
  }
  return clockSnapshot;
}

function subscribeClock(onChange: () => void) {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
}

/** Ngày giờ hiện tại theo giờ Việt Nam, tự cập nhật mỗi 30 giây. Null khi dựng trên máy chủ. */
export function useVnClock(): VnNow | null {
  return useSyncExternalStore(subscribeClock, readClock, () => null);
}

/** Cung tròn từ góc a0 đến a1 (độ, 0° = 12 giờ, theo chiều kim đồng hồ). */
function arcPath(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p = (a: number) => {
    const rad = ((a - 90) * Math.PI) / 180;
    return `${(cx + r * Math.cos(rad)).toFixed(2)} ${(cy + r * Math.sin(rad)).toFixed(2)}`;
  };
  return `M${p(a0)} A${r} ${r} 0 0 1 ${p(a1)}`;
}

/**
 * Vòng 12 canh giờ, Tý ở đỉnh (nửa đêm), giờ hoàng đạo tô vàng và kim chỉ giờ hiện tại
 * — chuyển từ `LAHourDial.kt` của app.
 */
export function HourDial({
  goodChi,
  now,
  size = 172,
}: {
  goodChi: Set<string>;
  now: { hour: number; minute: number } | null;
  size?: number;
}) {
  const outer = 50;
  const ring = outer * 0.36;
  const mid = outer - ring / 2;
  const inner = outer - ring;
  const gap = 2.5;
  const currentIndex = now ? chiIndexForHour(now.hour) : -1;
  const handAngle = now ? (now.hour + now.minute / 60) * 15 : 0;
  const handRad = ((handAngle - 90) * Math.PI) / 180;
  const handLength = inner - 4;
  const current = currentIndex >= 0 ? DIA_CHI[currentIndex] : null;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={
        current
          ? `Đồng hồ canh giờ. Bây giờ là giờ ${current}${goodChi.has(current) ? ', giờ hoàng đạo' : ''}`
          : 'Đồng hồ canh giờ'
      }
      className="shrink-0"
    >
      {DIA_CHI.map((chi, i) => {
        const isCurrent = i === currentIndex;
        const isGood = goodChi.has(chi);
        const center = i * 30;
        const rad = ((center - 90) * Math.PI) / 180;
        const stroke = isCurrent ? 'var(--la-primary)' : isGood ? 'var(--la-gold)' : 'var(--la-surface-variant)';
        const textColor = isCurrent ? 'var(--la-on-primary)' : isGood ? 'var(--la-on-gold)' : 'var(--la-on-surface-variant)';
        return (
          <g key={chi}>
            <path
              d={arcPath(50, 50, mid, center - 15 + gap / 2, center + 15 - gap / 2)}
              fill="none"
              stroke={stroke}
              strokeWidth={ring}
            />
            <text
              x={50 + mid * Math.cos(rad)}
              y={50 + mid * Math.sin(rad)}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={6.6}
              fontWeight={isCurrent || isGood ? 600 : 400}
              fill={textColor}
            >
              {chi}
            </text>
          </g>
        );
      })}
      <circle cx={50} cy={50} r={inner - 1} fill="var(--la-surface)" />
      {now && (
        <>
          <line
            x1={50}
            y1={50}
            x2={50 + handLength * Math.cos(handRad)}
            y2={50 + handLength * Math.sin(handRad)}
            stroke="var(--la-on-surface)"
            strokeWidth={2.2}
            strokeLinecap="round"
          />
          <circle cx={50} cy={50} r={2.6} fill="var(--la-on-surface)" />
        </>
      )}
    </svg>
  );
}
