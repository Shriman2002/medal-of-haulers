/** Small uppercase eyebrow label, wide tracking. */
export function Kicker({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`text-[11px] font-extrabold uppercase tracking-[.18em] ${className}`}
    >
      {children}
    </span>
  );
}
