import { useEffect, useRef, useState, useCallback } from "react";
import MapaAccion from "./MapaAccion";
import Empresas from "./Empresas";

import slide1 from "../../assets/images/pictures/carruselherosection1.webp";
import slide2 from "../../assets/images/pictures/carruselherosection2.webp";
import slide3 from "../../assets/images/pictures/carruselherosection3.webp";

const slides = [slide1, slide2, slide3];

export default function Home() {
  const heroRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.9s ease, transform 0.9s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, []);

  const goTo = useCallback((index) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => setAnimating(false), 700);
  }, [animating]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(next, 10000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 10000);
  };

  const handleNext = () => { next(); resetTimer(); };
  const handlePrev = () => { prev(); resetTimer(); };
  const handleDot = (i) => { goTo(i); resetTimer(); };

  return (
    <main className="bg-white overflow-x-hidden">
      {/* â”€â”€ HERO CARRUSEL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="relative w-full min-h-[60vh] md:min-h-[75vh] flex flex-col justify-end overflow-hidden">

        {/* Slides */}
        {slides.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <img
              src={src}
              alt={`Slide ${i + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Flecha izquierda â€” chevron simple, pegado al borde */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 text-white/40 hover:text-white/90 transition-colors duration-200 p-1"
          aria-label="Anterior"
        >
          <svg width="16" height="28" viewBox="0 0 16 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="12 2 2 14 12 26" />
          </svg>
        </button>

        {/* Flecha derecha â€” chevron simple, pegado al borde */}
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 text-white/40 hover:text-white/90 transition-colors duration-200 p-1"
          aria-label="Siguiente"
        >
          <svg width="16" height="28" viewBox="0 0 16 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 2 14 14 4 26" />
          </svg>
        </button>

        {/* Título + dots */}
        <div ref={heroRef} className="relative z-10 px-6 md:px-10 pb-4 max-w-4xl w-full">
          <h1
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-none uppercase mb-3"
            style={{
              WebkitTextStroke: "1.5px #ffffff",
              color: "transparent",
              fontWeight: 900,
            }}
          >
            Laboratorio
            <br />
            de innovación
          </h1>

          {/* Dots â€” pegados debajo del título, alineados a la izquierda */}
          <div className="flex gap-[6px] items-center">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDot(i)}
                aria-label={`Slide ${i + 1}`}
                className="p-0 bg-transparent border-none cursor-pointer flex items-center"
              >
                <div
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '18px' : '7px',
                    height: '7px',
                    background: i === current ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Banda */}
        <div
          className="relative z-10 w-full backdrop-blur-sm py-4 px-6"
          style={{ background: 'linear-gradient(to bottom, #B891A5, #4A527C)' }}
        >
          <p className="font-sans text-white text-sm md:text-base max-w-3xl mx-auto text-center leading-relaxed">
            Trabajamos para encontrar soluciones de alto impacto con el objetivo
            de disminuir la incertidumbre y enfocar el proceso en la solución
            del problema a través del usuario.
          </p>
        </div>
      </section>

      <MapaAccion />
      <Empresas />
    </main>
  );
}
