"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Sigue qué sección de la carta está a la vista y permite ir a una con scroll suave.
 * `getOffset` devuelve la altura de lo que queda fijo arriba (barra móvil), para compensarla.
 */
export function useActiveSection(ids: string[], getOffset: () => number) {
  const key = ids.join("|");
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  const lock = useRef(false);
  const unlockTimer = useRef<number | undefined>(undefined);
  const offsetRef = useRef(getOffset);

  useEffect(() => {
    offsetRef.current = getOffset;
  }, [getOffset]);

  useEffect(() => {
    const list = key ? key.split("|") : [];
    let frame = 0;
    const update = () => {
      frame = 0;
      if (lock.current) return;
      const offset = offsetRef.current() + 32;
      let current: string | null = null;
      for (const id of list) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && list.length) current = list[list.length - 1];
      setActive(current ?? list[0] ?? null);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [key]);

  const goTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setActive(id);
    // Bloquear el resaltado automático mientras dura el desplazamiento suave.
    lock.current = true;
    window.clearTimeout(unlockTimer.current);
    const unlock = () => {
      lock.current = false;
      window.removeEventListener("scrollend", unlock);
    };
    window.addEventListener("scrollend", unlock);
    unlockTimer.current = window.setTimeout(unlock, 900);
    const top = el.getBoundingClientRect().top + window.scrollY - offsetRef.current() - 16;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return { active, goTo };
}
