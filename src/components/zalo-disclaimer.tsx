import { tr } from "@/lib/i18n/i18n";

export const ZALO_DISCLAIMER =
  "formzolo (formzalo.com) is an independent service and is not affiliated with, endorsed by, or connected to Zalo or VNG Corporation.";

export function ZaloDisclaimer({ className = "" }: { className?: string }) {
  return (
    <p data-testid="zalo-disclaimer" className={`text-xs leading-snug text-ink/60 ${className}`}>
      {tr("formzolo (formzalo.com) is an independent service and is not affiliated with, endorsed by, or connected to Zalo or VNG Corporation.")}
    </p>
  );
}
