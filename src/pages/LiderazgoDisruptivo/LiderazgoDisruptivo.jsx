import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import LiderazgoDisruptivoImg from '../../assets/images/pictures/LiderazcoDisruptivo.webp';
import LiderazgoDisruptivoNuestroDiferencial1Img from '../../assets/images/pictures/LiderazcoDisruptivoNuestroDiferencial1.webp';
import LiderazgoDisruptivoNuestroDiferencial2Img from '../../assets/images/pictures/LiderazcoDisruptivoNuestroDiferencial2.webp';
import FormularioModal from '../../components/FormularioModal/FormularioModal';

// â”€â”€ Datos â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const infoCards = [
  {
    label: "Inicio",
    value: "11 de Octubre",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: "Modalidad",
    value: "100% Online",
    sub: "Modalidad sincrónica",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    label: "4 encuentros",
    value: "Mar 18:30–20:30",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: "Precio",
    value: "Consultar",
    sub: "Precios especiales para grupos",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

const logros = [
  "Desarrollar una visión global de los proyectos",
  "Liderar la generación de nuevos negocios y equipos, orientados a resultados",
  "Aplicar herramientas de ideación y métodos sistémicos",
  "Entrenar la habilidad de inspirar y motivar a las personas",
];

const modulos = [
  {
    num: "01",
    title: "Cambio de paradigma",
    items: ["Nuestra historia en perspectiva", "Construcción del significado", "Matriz de Innovación", "Canva de estrategia adaptativa"],
    color: "#EC4E8D",
  },
  {
    num: "02",
    title: "Desde adentro hacia afuera",
    items: ["Pensamiento lateral para el liderazgo", "Hackear el flow"],
    color: "#00D8ED",
  },
  {
    num: "03",
    title: "Mindset de crecimiento",
    items: ["Atreverse a liderar", "Liderazgo blindado vs Liderazgo audaz"],
    color: "#EC4E8D",
  },
  {
    num: "04",
    title: "Convertir problemas en desafíos",
    items: ["Metodología de diseño: doble diamante", "Herramientas de ideación y prototipado rápido"],
    color: "#00D8ED",
  },
];

const diferencial = [
  {
    title: "Metodología hands-on",
    body: "No sólo te brindaremos bibliografía y apoyo teórico sobre las temáticas, sino que aprenderás a ser un líder disruptivo liderando. Cada módulo cuenta con actividades prácticas que realizaremos en clase con el apoyo de facilitadores guiándote a cada paso.",
    color: "#EC4E8D",
  },
  {
    title: "Spatial chat",
    body: "El Workshop se realiza de manera virtual en el metaverso de Spatial Chat. Un espacio colaborativo que nos brinda las posibilidades de encuentro y comunicación de un aula presencial, con la comodidad y las posibilidades de extensión de la virtualidad.",
    color: "#00D8ED",
  },
  {
    title: "Mural",
    body: "La presentación teórica y práctica será mediante la plataforma mural, una herramienta que nos permite trabajar de forma colaborativa sobre pizarras virtuales. Todos los participantes del workshop podrán experimentar el uso de la plataforma en primera persona.",
    color: "#EC4E8D",
  },
];

// â”€â”€ FadeIn â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
}

// â”€â”€ Section Separator â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function SectionSeparator() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-2">
      <div style={{
        height: '1px',
        background: 'linear-gradient(to right, transparent, #EC4E8D, transparent)',
        opacity: 0.3,
      }} />
    </div>
  );
}

// â”€â”€ Componente principal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function LiderazgoDisruptivo() {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <div className="bg-white overflow-x-hidden">

      {/* â”€â”€ HERO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="relative pt-16 pb-20 px-4 md:px-8 overflow-hidden">
        <div className="hero-bg-gradient hero-bg-gradient-1" />
        <div className="hero-bg-gradient hero-bg-gradient-2" />
        <div className="hero-bg-gradient hero-bg-gradient-3" />

        <div className="relative max-w-5xl mx-auto text-center z-10">
          <FadeIn>
            <h1
              className="font-display text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none mb-10"
              style={{ WebkitTextStroke: '1.5px var(--color-neti-pink)', color: 'transparent' }}
            >
              Liderazgo<br />Disruptivo
            </h1>
          </FadeIn>

          <FadeIn delay={100}>
            <p className="font-sans text-[#85789A] text-base md:text-lg italic max-w-3xl mx-auto leading-relaxed mb-14">
              "Líder: cualquier persona que asume la responsabilidad de encontrar el potencial en las personas y los procesos, y que tiene el coraje de desarrollar ese potencial."
              <span className="block mt-2 not-italic font-semibold text-[#251B37]">– Brené Brown</span>
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {infoCards.map((card, i) => (
              <FadeIn key={i} delay={i * 80} className="h-full">
                <div className="glass-card flex flex-col items-center justify-start gap-3 p-5 rounded-2xl h-full">
                  <div className="w-10 h-10 rounded-full bg-[#EC4E8D] flex items-center justify-center text-white shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <p className="font-sans text-xs font-bold uppercase tracking-widest text-[#85789A] mb-0.5">{card.label}</p>
                    <p className="font-sans font-bold text-[#251B37] text-sm">{card.value}</p>
                    {card.sub && <p className="font-sans text-xs text-[#85789A] mt-0.5">{card.sub}</p>}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionSeparator />

      {/* â”€â”€ A QUIÃ‰NES ESTÁ DIRIGIDO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-20 px-4 md:px-8" style={{ background: 'rgba(240,230,255,0.25)' }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <FadeIn>
            <img
              src={LiderazgoDisruptivoImg}
              alt="Workshop NETI"
              className="w-full h-full object-cover rounded-3xl"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
              draggable={false}
            />
          </FadeIn>

          <div className="space-y-10">
            <FadeIn delay={100}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#EC4E8D] flex items-center justify-center text-white shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h2 className="font-sans text-xl font-bold text-[#251B37]">¿A quiénes está dirigido?</h2>
                </div>
                <p className="font-sans text-[#85789A] leading-relaxed text-sm">
                  Pensado para personas que quieran adoptar competencias de liderazgo disruptivo y que tengan en cuenta la importancia del capital humano para generar proyectos de alto impacto innovador.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={180}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#00D8ED] flex items-center justify-center text-white shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h2 className="font-sans text-xl font-bold text-[#251B37]">¿Qué lográs con el Workshop?</h2>
                </div>
                <ul className="space-y-3">
                  {logros.map((logro, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#EC4E8D] font-black mt-0.5">·</span>
                      <span className="font-sans text-sm text-[#251B37] leading-relaxed">{logro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionSeparator />

      {/* â”€â”€ 4 MÃ“DULOS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2
              className="font-display text-4xl md:text-6xl font-black text-center mb-14 uppercase tracking-widest"
              style={{ WebkitTextStroke: '1.5px var(--color-neti-pink)', color: 'transparent' }}
            >
              4 Módulos
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {modulos.map((mod, i) => (
              <FadeIn key={i} delay={i * 80} className="h-full">
                <div className="module-card flex flex-col relative p-6 rounded-2xl bg-white overflow-hidden h-full">
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: mod.color }} />
                  <div
                    className="absolute -top-3 -right-1 font-display font-black leading-none select-none pointer-events-none"
                    style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', color: 'rgba(133,120,154,0.06)' }}
                  >
                    {mod.num}
                  </div>
                  <div className="w-3 h-3 rounded-full mb-4 mt-2" style={{ background: mod.color }} />
                  <h3 className="font-sans font-bold text-[#251B37] text-base mb-4 leading-snug">{mod.title}</h3>
                  <ul className="space-y-2">
                    {mod.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="text-xs mt-1" style={{ color: mod.color }}>·</span>
                        <span className="font-sans text-xs text-[#85789A] leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionSeparator />

      {/* â”€â”€ NUESTRO DIFERENCIAL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-20 px-4 md:px-8" style={{ background: 'rgba(240,230,255,0.25)' }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2
              className="font-display text-4xl md:text-6xl font-black mb-14 uppercase tracking-widest"
              style={{ WebkitTextStroke: '1.5px var(--color-neti-pink)', color: 'transparent' }}
            >
              Nuestro diferencial
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-14 items-start">
            <FadeIn>
              <div className="space-y-4">
                <img
                  src={LiderazgoDisruptivoNuestroDiferencial1Img}
                  alt="Spatial Chat"
                  className="w-full object-cover rounded-2xl"
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                  draggable={false}
                />
                <img
                  src={LiderazgoDisruptivoNuestroDiferencial2Img}
                  alt="Mural"
                  className="w-full object-cover rounded-2xl ml-0 md:ml-8"
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                  draggable={false}
                />
              </div>
            </FadeIn>

            <div className="space-y-8">
              {diferencial.map((item, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div className="pl-4 border-l-2" style={{ borderColor: item.color }}>
                    <h3 className="font-sans font-bold text-[#251B37] text-lg mb-3">{item.title}</h3>
                    <p className="font-sans text-sm text-[#85789A] leading-relaxed">{item.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionSeparator />

      {/* â”€â”€ CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-20 px-4 text-center">
        <FadeIn>
          <button
            onClick={() => setModalAbierto(true)}
            className="premium-cta-btn"
          >
            Inscripción
          </button>
        </FadeIn>
      </section>

      {modalAbierto && (
        <FormularioModal taller="liderazgo" onClose={() => setModalAbierto(false)} />
      )}

    </div>
  );
}
