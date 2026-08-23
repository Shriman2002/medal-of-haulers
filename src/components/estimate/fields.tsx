/**
 * Form field shells. Inputs are 16px (below that, iOS zooms on focus), 2px ink
 * border, white fill, zero radius — per the handoff.
 */
const CONTROL =
  "w-full min-w-0 border-2 border-ink bg-white p-[15px] font-sans text-[16px]";

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[12px] font-extrabold uppercase tracking-[.1em] text-ink-70">
      {children}
    </span>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <span role="alert" className="text-[12.5px] font-semibold text-[#a3261c]">
      {message}
    </span>
  );
}

export function Field({
  label,
  error,
  full = false,
  children,
}: {
  label: string;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-[7px] ${full ? "col-span-full" : ""}`}>
      <FieldLabel>{label}</FieldLabel>
      {children}
      <FieldError message={error} />
    </label>
  );
}

export const controlClass = CONTROL;

/** Step heading over a 2px rule; the rule turns gold inside conditional panels. */
export function StepHeading({
  children,
  tone = "ink",
}: {
  children: React.ReactNode;
  tone?: "ink" | "gold";
}) {
  return (
    <>
      <h2 className="mb-1.5 text-[13px] font-extrabold uppercase tracking-[.16em]">
        {children}
      </h2>
      <div
        className={`mb-[18px] h-0.5 ${tone === "gold" ? "bg-gold-deep" : "bg-ink"}`}
      />
    </>
  );
}
