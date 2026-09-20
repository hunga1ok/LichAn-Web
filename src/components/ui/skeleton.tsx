import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-stone-200/60", className)}
      {...props}
    />
  );
}

function SkeletonLine({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <Skeleton className={cn("h-4 w-full", className)} {...props} />;
}

function SkeletonCircle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <Skeleton className={cn("h-10 w-10 rounded-full", className)} {...props} />;
}

function SkeletonCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-3 rounded-xl border border-stone-100 p-6", className)} {...props}>
      <SkeletonLine className="h-5 w-2/3" />
      <SkeletonLine className="h-4 w-full" />
      <SkeletonLine className="h-4 w-4/5" />
    </div>
  );
}

export { Skeleton, SkeletonLine, SkeletonCircle, SkeletonCard };
