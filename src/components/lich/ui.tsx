import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/*
 * Các khối giao diện dùng chung, bám theo component của Lịch An App
 * (LACard / DetailCard, SectionHeader, DetailRow, Badge dạng viên thuốc).
 */

/** Thẻ chi tiết: nền surface, viền mảnh, bo 16px (LAShapes.lg). */
export function DetailCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <section className={cn('rounded-lg border border-outline bg-surface px-4 pt-2 pb-3', className)}>{children}</section>
  );
}

/** Tiêu đề thẻ, có thể kèm liên kết hành động bên phải. */
export function SectionHeader({
  title,
  as: Tag = 'h2',
  actionLabel,
  actionHref,
}: {
  title: string;
  as?: 'h2' | 'h3';
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex min-h-10 items-center justify-between gap-2">
      <Tag className="text-[15px] font-semibold text-on-surface">{title}</Tag>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="px-1 py-2 text-sm font-semibold text-primary hover:underline">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

/** Dòng nhãn — giá trị, giá trị căn phải. */
export function DetailRow({
  label,
  value,
  labelHint,
  valueHint,
  danger,
  href,
}: {
  label: string;
  value: React.ReactNode;
  labelHint?: string;
  valueHint?: string;
  danger?: boolean;
  href?: string;
}) {
  const body = (
    <>
      <div className="flex-1">
        <div className="text-[15px] text-muted">{label}</div>
        {labelHint && <div className="text-xs text-muted">{labelHint}</div>}
      </div>
      <div className="flex-1 text-right">
        <div className={cn('inline-flex items-center gap-0.5 text-[15px] font-semibold', danger ? 'text-danger' : 'text-on-surface')}>
          {value}
          {href && <ChevronRight className="h-4 w-4 text-muted" aria-hidden />}
        </div>
        {valueHint && <div className="text-sm text-muted">{valueHint}</div>}
      </div>
    </>
  );
  // Kẻ phân cách chỉ giữa hai dòng liền nhau, không kẻ dưới tiêu đề thẻ
  const cls = 'la-row flex items-start gap-3 py-2 border-outline [.la-row+&]:border-t';
  return href ? (
    <Link href={href} className={cn(cls, 'hover:bg-surface-variant/50 -mx-1 px-1 rounded')}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

type PillTone = 'primary' | 'gold' | 'danger' | 'neutral';

const PILL_TONES: Record<PillTone, string> = {
  primary: 'bg-primary-container text-on-primary-container',
  gold: 'bg-secondary-container text-on-secondary-container',
  danger: 'bg-danger-container text-on-danger-container',
  neutral: 'bg-surface-variant text-on-surface',
};

/** Nhãn dạng viên thuốc (Badge / chip của app). */
export function Pill({ tone = 'primary', className, children }: { tone?: PillTone; className?: string; children: React.ReactNode }) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium', PILL_TONES[tone], className)}>
      {children}
    </span>
  );
}
