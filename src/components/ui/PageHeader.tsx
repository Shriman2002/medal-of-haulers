/** Navy page header: gold kicker, large H1, optional intro line. */
export function PageHeader({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="hpad border-b-2 border-gold bg-navy">
      <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-gold">
        {kicker}
      </span>
      <h1 className="mt-2.5 text-page-h1 font-extrabold tracking-[-.02em] text-cream">
        {title}
      </h1>
      {intro ? (
        <p className="mt-2 max-w-[70ch] text-[16px] text-slate-text">{intro}</p>
      ) : null}
    </div>
  );
}
