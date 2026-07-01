import { ANNIVERSARY_LOGO, ANNIVERSARY_LOGO_ALT } from "@/lib/anniversary-assets";

type AnniversaryRibbonProps = {
  className?: string;
};

/** Assinatura editorial discreta — uma por página. */
export function AnniversaryRibbon({ className = "" }: AnniversaryRibbonProps) {
  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full border border-hairline bg-black/25 px-3 py-2 ${className}`.trim()}
    >
      <img
        className="h-7 w-auto opacity-90"
        src={ANNIVERSARY_LOGO}
        alt={ANNIVERSARY_LOGO_ALT}
        width={84}
        height={28}
        loading="lazy"
        decoding="async"
      />
      <p className="section-caption !mb-0 text-foreground-muted">
        Quase três décadas na Savassi
      </p>
    </div>
  );
}
