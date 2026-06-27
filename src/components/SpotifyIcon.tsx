import {
  SPOTIFY_BRAND,
  SPOTIFY_ICON_PATH,
} from "@/lib/brand-icons";

type SpotifyIconProps = {
  size?: number;
  className?: string;
  tone?: "brand" | "mono";
};

export function SpotifyIcon({
  size = 18,
  className,
  tone = "mono",
}: SpotifyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={tone === "brand" ? SPOTIFY_BRAND : "currentColor"}
      aria-hidden
      className={className}
    >
      <path d={SPOTIFY_ICON_PATH} />
    </svg>
  );
}
