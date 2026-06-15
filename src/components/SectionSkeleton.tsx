type SectionSkeletonProps = {
  className?: string;
};

export function SectionSkeleton({ className = "" }: SectionSkeletonProps) {
  return (
    <div
      aria-hidden
      className={`w-full bg-surface motion-safe:animate-pulse ${className}`}
    />
  );
}
