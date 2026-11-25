import type { Establishment, Menu } from "@/lib/types";

// Foto de ambiente de reserva si el bar no tiene imagen de cabecera.
const FALLBACK_COVER = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=2000&q=70&auto=format&fit=crop";

// El banner del bar (1946×808) se reparte en tres capas de la MISMA imagen, recortadas con
// máscaras: palmeras izquierdas, logotipo y palmeras derechas. Así las palmeras quedan
// siempre pegadas a los bordes de la pantalla (no se cortan a ningún ancho) y cada capa
// puede animarse por separado al entrar.
const MASK_LEFT = "linear-gradient(to right, #000 0%, #000 19%, transparent 31%)";
const MASK_RIGHT = "linear-gradient(to left, #000 0%, #000 19%, transparent 31%)";
const MASK_CENTER = "linear-gradient(to right, transparent 27%, #000 32%, #000 68%, transparent 73%)";
/** Altura de la línea dorada dentro de la imagen original (383 px de 808). */
const LINE_TOP = "47.4%";

/** Banda superior de la carta. */
export function CoverBanner({ establishment: est, menu }: { establishment: Establishment; menu: Menu }) {
  if (est.coverUrl && est.coverHasLogo) {
    return <LayeredBanner src={est.coverUrl} alt={`${est.kicker} ${est.name}`} season={menu.name} />;
  }
  return <SimpleBanner establishment={est} menu={menu} />;
}

function LayeredBanner({ src, alt, season }: { src: string; alt: string; season: string }) {
  const layer = "absolute inset-y-0 h-full w-auto max-w-none select-none";
  return (
    <header
      className="relative isolate h-[clamp(210px,31vw,430px)] overflow-hidden pt-[env(safe-area-inset-top)]"
      style={{ background: "radial-gradient(ellipse 70% 90% at 50% 45%, #1d1c1a 0%, #141413 55%, #111111 100%)" }}
    >
      <h1 className="sr-only">{alt}</h1>

      <div className="absolute inset-x-0 bottom-0 top-[env(safe-area-inset-top)]">
        {/* Línea dorada de lado a lado: une las capas en pantallas más anchas que la imagen. */}
        <span
          aria-hidden
          className="banner-line absolute inset-x-[4%] h-px bg-gradient-to-r from-transparent via-[#b8935a]/80 to-transparent"
          style={{ top: LINE_TOP }}
        />

        {/* Palmeras izquierdas */}
        <div aria-hidden className="banner-palm-left absolute inset-y-0 left-0 origin-left">
          <div className="banner-sway-left h-full origin-top-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" draggable={false} className={`${layer} left-0`} style={{ maskImage: MASK_LEFT, WebkitMaskImage: MASK_LEFT }} />
          </div>
        </div>

        {/* Palmeras derechas */}
        <div aria-hidden className="banner-palm-right absolute inset-y-0 right-0 origin-right">
          <div className="banner-sway-right h-full origin-top-right">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" draggable={false} className={`${layer} right-0`} style={{ maskImage: MASK_RIGHT, WebkitMaskImage: MASK_RIGHT }} />
          </div>
        </div>

        {/* Logotipo centrado */}
        <div className="banner-logo absolute inset-0 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            fetchPriority="high"
            draggable={false}
            className="h-full w-auto max-w-none select-none"
            style={{ maskImage: MASK_CENTER, WebkitMaskImage: MASK_CENTER }}
          />
        </div>
      </div>

      {/* Fundido inferior hacia el fondo de la página. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-background" />

      <p className="banner-season absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.3em] text-foreground/70 sm:bottom-3 sm:text-[10px] lg:bottom-4">
        {season}
      </p>
    </header>
  );
}

function SimpleBanner({ establishment: est, menu }: { establishment: Establishment; menu: Menu }) {
  const photo = est.coverUrl ?? FALLBACK_COVER;
  return (
    <header className="relative isolate flex h-[210px] items-center justify-center overflow-hidden bg-background pt-[env(safe-area-inset-top)] sm:h-[270px] lg:h-[320px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo} alt="" aria-hidden className="absolute inset-0 -z-20 size-full object-cover brightness-[0.45]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-12 bg-gradient-to-b from-transparent to-background" />

      <div className="banner-logo flex size-[124px] flex-col items-center justify-center rounded-[3px] border border-white/12 bg-[#0f0f0f]/90 px-3 text-center sm:size-[150px] lg:size-[164px]">
        {est.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={est.logoUrl} alt={`Logotipo de ${est.kicker} ${est.name}`} className="size-full object-contain p-2" />
        ) : (
          <>
            <p className="font-display text-[9px] font-medium uppercase tracking-[0.3em] text-muted sm:text-[10px]">{est.kicker}</p>
            <h1 className="mt-1.5 font-display text-[19px] font-semibold uppercase leading-[1.05] tracking-[0.06em] text-foreground sm:text-[22px] lg:text-2xl">
              {est.name}
            </h1>
            <span className="mt-2.5 h-px w-8 bg-gold" aria-hidden />
            <p className="mt-2 text-[8px] font-medium uppercase tracking-[0.22em] text-muted sm:text-[9px]">{menu.name}</p>
          </>
        )}
      </div>
    </header>
  );
}
