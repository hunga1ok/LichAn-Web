import { moonCycleFraction, moonPhaseOf } from '@/lib/lunar';

/**
 * Hình trăng thật theo ngày âm — chuyển từ `LAMoonPhase.kt` của app.
 * Đường phân sáng tối là một elip, bán trục ngang co về 0 ở thượng/hạ huyền.
 */
export default function MoonPhase({ lunarDay, size = 104 }: { lunarDay: number; size?: number }) {
  const fraction = moonCycleFraction(lunarDay);
  const r = 49;
  const c = 50;
  const k = Math.cos(2 * Math.PI * fraction);
  const rx = Math.abs(k) * r;
  const waxing = fraction < 0.5;
  const gibbous = k < 0;
  // Vẽ viền sáng từ đỉnh xuống đáy, rồi theo đường phân sáng tối quay lại đỉnh
  const limbSweep = waxing ? 1 : 0;
  const terminatorSweep = waxing ? (gibbous ? 1 : 0) : gibbous ? 0 : 1;
  const d = `M${c} ${c - r} A${r} ${r} 0 0 ${limbSweep} ${c} ${c + r} A${rx.toFixed(2)} ${r} 0 0 ${terminatorSweep} ${c} ${c - r} Z`;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={`${moonPhaseOf(lunarDay)}, ngày ${lunarDay} âm lịch`}
      className="shrink-0"
    >
      <circle cx={c} cy={c} r={r} fill="#2C3858" stroke="#4A5677" strokeWidth={1.5} />
      <path d={d} fill="#F2E3B3" />
    </svg>
  );
}
