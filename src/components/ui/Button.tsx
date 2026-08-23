import Link from "next/link";

/**
 * The four button treatments in the design. Labels are 800-weight uppercase and
 * flush left; hover states swap colour instantly (no transition anywhere).
 */
export type ButtonVariant = "gold" | "navy" | "outlineNavy" | "outlineLight";

const VARIANTS: Record<ButtonVariant, string> = {
  gold: "bg-gold text-navy border-2 border-gold hover:bg-gold-light hover:border-gold-light",
  navy: "bg-navy text-gold border-2 border-navy hover:bg-navy-raised",
  // Outlined on a navy surface — muted border until hover brings gold forward.
  outlineNavy:
    "bg-transparent text-gold border-2 border-navy-border-muted hover:border-gold",
  // Outlined on a light surface.
  outlineLight:
    "bg-transparent text-ink border-2 border-ink hover:bg-hatch-a",
};

const BASE =
  "inline-block text-left font-extrabold uppercase tracking-[.06em] no-underline cursor-pointer";

const SIZES = {
  sm: "text-[13px] px-5 py-[15px]",
  md: "text-[14px] px-[22px] py-4",
  lg: "text-[15px] px-[26px] py-[19px]",
  xl: "text-[16px] px-[30px] py-5",
} as const;

type Props = {
  variant: ButtonVariant;
  size?: keyof typeof SIZES;
  children: React.ReactNode;
  className?: string;
} & (
  | { href: string; type?: never; onClick?: never; disabled?: never }
  | {
      href?: never;
      type?: "button" | "submit";
      onClick?: () => void;
      disabled?: boolean;
    }
);

export function Button({
  variant,
  size = "md",
  children,
  className = "",
  ...rest
}: Props) {
  const classes = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;

  if ("href" in rest && rest.href) {
    const { href } = rest;
    // tel:/mailto:/http links need a plain anchor; internal routes get prefetching.
    return /^(tel:|mailto:|https?:)/.test(href) ? (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener" }
          : {})}
      >
        {children}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = "button", onClick, disabled } = rest;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes} disabled:cursor-not-allowed disabled:opacity-70`}
    >
      {children}
    </button>
  );
}
