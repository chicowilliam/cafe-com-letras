import { INSTAGRAM_BRAND } from "@/lib/brand-icons";

type InstagramIconProps = {
  size?: number;
  className?: string;
  tone?: "brand" | "mono";
};

/** Camera glyph — stroke style aligned with Lucide icons in the footer. */
export function InstagramIcon({
  size = 18,
  className,
  tone = "mono",
}: InstagramIconProps) {
  const stroke = tone === "brand" ? INSTAGRAM_BRAND : "currentColor";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill={stroke} stroke="none" />
    </svg>
  );
}
