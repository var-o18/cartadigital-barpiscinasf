import type { Establishment } from "@/lib/types";
import { FacebookIcon, InstagramIcon } from "./icons";
import { SectionHeading } from "./MenuSection";

/** Pie: información útil para el cliente (alérgenos, IVA, contacto y redes). */
export function Footer({ establishment: est }: { establishment: Establishment }) {
  const social = [
    est.instagramUrl && { href: est.instagramUrl, label: "Instagram", Icon: InstagramIcon },
    est.facebookUrl && { href: est.facebookUrl, label: "Facebook", Icon: FacebookIcon },
  ].filter(Boolean) as { href: string; label: string; Icon: typeof InstagramIcon }[];

  return (
    <footer id="informacion" aria-labelledby="h-informacion" className="mt-14 border-t border-line pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-10">
      <SectionHeading id="h-informacion">Información</SectionHeading>
      <div className="mt-5 grid gap-6 text-[13px] leading-relaxed text-muted md:grid-cols-2 md:gap-10">
        <div className="space-y-2">
          <p>Si tienes alguna alergia o intolerancia alimentaria, consulta a nuestro personal antes de pedir.</p>
          <p>Precios con IVA incluido.</p>
        </div>
        <div className="space-y-2">
          <p className="font-display text-lg font-semibold uppercase tracking-[0.08em] text-foreground">
            {est.kicker} {est.name}
          </p>
          {est.address && <p>{est.address}</p>}
          {est.openingHours && <p className="whitespace-pre-line">{est.openingHours}</p>}
          {est.phone && (
            <p>
              <a href={`tel:${est.phone.replace(/\s/g, "")}`} className="hover:text-foreground">
                {est.phone}
              </a>
            </p>
          )}
          {social.length > 0 && (
            <div className="flex gap-2 pt-2">
              {social.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[4px] border border-line px-3 py-2 text-xs uppercase tracking-[0.12em] text-foreground/85 transition-colors hover:border-gold/50 hover:text-gold"
                >
                  <Icon className="size-3.5" /> {label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
