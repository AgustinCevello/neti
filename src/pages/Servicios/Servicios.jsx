// src/pages/Servicios/Servicios.jsx
import { useState, useMemo } from 'react';
import FadeIn from '../../components/FadeIn';
import { Link } from 'react-router-dom';
import EmblaCarousel from '../../components/EmblaCarousel/EmblaCarousel';
import FormularioModal from '../../components/FormularioModal/FormularioModal';
import { useSheetData } from '../../hooks/useSheetData';

import g1 from '../../assets/images/pictures/ServiciosGalery1.webp';
import g2 from '../../assets/images/pictures/ServiciosGalery2.webp';
import g3 from '../../assets/images/pictures/ServiciosGalery3.webp';
import g4 from '../../assets/images/pictures/ServiciosGalery4.webp';
import g5 from '../../assets/images/pictures/ServiciosGalery5.webp';
import g6 from '../../assets/images/pictures/ServiciosGalery6.webp';
import n1 from '../../assets/images/pictures/ServiciosGaleryNetiatones1.webp';
import n2 from '../../assets/images/pictures/ServiciosGaleryNetiatones2.webp';
import n3 from '../../assets/images/pictures/ServiciosGaleryNetiatones3.webp';
import n4 from '../../assets/images/pictures/ServiciosGaleryNetiatones4.webp';
import n5 from '../../assets/images/pictures/ServiciosGaleryNetiatones5.webp';
import n6 from '../../assets/images/pictures/ServiciosGaleryNetiatones6.webp';
import logoNetiBlue from '../../assets/images/icons/logo_neti_blue.webp';

// ── Helpers de layout ─────────────────────────────────────────────────────────

function SectionSeparator() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-2">
      <div style={{
        height: '1px',
        background: 'linear-gradient(to right, transparent, #505AA5, transparent)',
        opacity: 0.25,
      }} />
    </div>
  );
}

function CaptionPhoto({ src, alt, children }) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
      style={{ boxShadow: '0 4px 20px rgba(103,88,155,0.12)' }}
    >
      <img
        src={src} alt={alt} loading="lazy"
        className="w-full object-cover"
        style={{
          WebkitUserSelect: 'none', MozUserSelect: 'none',
          msUserSelect: 'none', userSelect: 'none',
          WebkitUserDrag: 'none', pointerEvents: 'none', display: 'block',
        }}
        draggable={false}
      />
      <div className="px-4 py-2 flex flex-wrap items-center gap-1 border-t border-[#E6E2EE]"
        style={{ background: 'rgba(255,255,255,0.95)' }}>
        <span className="font-sans text-sm">{children}</span>
      </div>
    </div>
  );
}

const workshopsSlides  = [g1, g2, g3, g4, g5, g6];
const netiatonesSlides = [n1, n2, n3, n4, n5, n6];
const carouselOptions  = { slidesToScroll: 'auto', loop: false };

// ── Paletas asignadas cíclicamente (los colores originales del diseño) ─────────
const PALETAS = [
  { from: '#EC4E8D', to: '#f9a8d4', accent: '#EC4E8D' },
  { from: '#7C3AED', to: '#a78bfa', accent: '#7C3AED' },
  { from: '#00D8ED', to: '#6ee7f7', accent: '#00D8ED' },
];

// Keys de FormularioModal asignados cíclicamente
const TALLER_KEYS = ['liderazgo', 'hands_on', 'desarrollo'];

// ── Skeleton de carga ─────────────────────────────────────────────────────────
function TallerSkeleton() {
  return (
    <div className="relative flex flex-col w-full h-full min-h-[500px] border border-white/20 rounded-3xl overflow-hidden animate-pulse bg-[#f4f1f9]">
      <div className="absolute inset-0 p-[2px]" style={{ background: '#E6E2EE' }}>
        <div className="w-full h-full rounded-[22px] bg-[#f4f1f9]" />
      </div>
      <div className="relative z-10 flex flex-1 p-3 sm:p-4">
        <div className="flex flex-col flex-1 p-6 sm:p-8 gap-5">
          <div className="h-6 bg-[#E6E2EE] rounded-lg w-4/5" />
          <div className="space-y-3 flex-1">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="flex items-start gap-3">
                <div className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C4BAD4]" />
                <div className="h-3 bg-[#E6E2EE] rounded w-full" />
              </div>
            ))}
          </div>
          <div className="mt-10 pt-5 border-t border-[#E6E2EE]">
            <div className="h-4 bg-[#E6E2EE] rounded w-20" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-between w-12 sm:w-16 py-2 shrink-0 gap-4">
          <div className="h-6 bg-[#E6E2EE] rounded w-8" />
          <div className="w-10 h-10 rounded-full bg-[#E6E2EE]" />
        </div>
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function Servicios() {
  const [modalTaller, setModalTaller] = useState(null);

  // ── Datos dinámicos desde Google Sheets ──────────────────────────────────
  const { data: talleresRaw, loading: talleresLoading, error: talleresError } =
    useSheetData('✏️ Gestión Talleres');

  // Mapeamos las filas del sheet al formato que espera el template.
  // Los colores se asignan cíclicamente desde PALETAS según el índice.
  // Los bullets se generan dividiendo el campo "Notas" por saltos de línea.
  const talleres = useMemo(() => {
    return talleresRaw
      .filter(t => {
        // Filtrar talleres inactivos si tienen campo Estado
        const estado = String(t['Estado'] || '').trim().toLowerCase();
        return estado !== 'inactivo' && estado !== 'false' && estado !== 'no';
      })
      .map((t, i) => {
        const paleta = PALETAS[i % PALETAS.length];
        const notas  = String(t['Notas'] || '');
        const items  = notas.split('\n').map(s => s.trim()).filter(Boolean);
        return {
          title:       t['Título del Taller'] || `Taller ${i + 1}`,
          from:        paleta.from,
          to:          paleta.to,
          accent:      paleta.accent,
          items,
          link:        t['Link de Inscripción'] || '/servicios',
          // Datos extra disponibles para tooltips o futuros usos
          facilitador: t['Facilitador'] || '',
          modalidad:   t['Modalidad']   || '',
          precio:      t['Precio']      || '',
          cupo:        t['Cupo Máximo'] || '',
        };
      });
  }, [talleresRaw]);

  return (
    <div className="bg-white overflow-x-hidden">

      {/* ── WORKSHOPS EMPRESAS ────────────────────────────────────────────── */}
      <section className="relative py-16 px-4 md:px-8 overflow-hidden">
        <div style={{
          position: 'absolute', borderRadius: '50%', filter: 'blur(100px)',
          width: 500, height: 500, top: -150, right: -150,
          background: 'radial-gradient(circle, #505AA5 0%, transparent 70%)',
          opacity: 0.05, pointerEvents: 'none',
        }} />

        <div className="relative max-w-5xl mx-auto z-10">
          <FadeIn>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black uppercase text-center mb-14 leading-none tracking-widest">
              <span style={{ WebkitTextStroke: '1.5px #505AA5', color: 'rgba(80,90,165,1)' }}>Workshops </span>
              <span style={{ WebkitTextStroke: '1.5px #5D5FEF', color: 'rgba(93,95,239,0.30)' }}>Empresas</span>
            </h1>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
            <FadeIn delay={80}>
              <div>
                <p className="font-sans text-[#251B37] leading-relaxed mb-4">
                  Nuestros servicios brindan un <strong>recorrido experiencial</strong> sobre el proceso de creación de soluciones innovadoras con impacto real.
                </p>
                <p className="font-sans text-[#251B37] leading-relaxed mb-4">
                  Conectamos a las personas con las tecnologías emergentes, en búsqueda de <strong>potenciar la creatividad</strong>, la diversidad, la colaboración y el pensamiento crítico en los equipos de trabajo de la organización.
                </p>
                <p className="font-sans text-[#251B37] leading-relaxed mb-8">
                  Dejamos instaladas las bases metodológicas de acción, el aprendizaje de nuevas herramientas y <strong>habilidades para los desafíos del futuro</strong>.
                </p>
                <Link to="/contacto" className="font-sans inline-block px-8 py-3 border-2 border-[#251B37] text-[#251B37] font-semibold tracking-widest uppercase text-sm hover:bg-[#251B37] hover:text-white transition-all duration-200">
                  Leer más
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={140}>
              <div className="space-y-3">
                <CaptionPhoto src={g1} alt="Workshop Oracle">
                  <span className="font-bold text-[#251B37]">Oracle</span>
                  <span className="text-[#85789A] text-xs mx-1">Por</span>
                  <span className="text-[#251B37]">Distefano · Durante · Farjoume</span>
                  <span className="text-[#85789A] mx-2">·</span>
                  <span className="text-[#251B37]">Oracle Cloud</span>
                </CaptionPhoto>
                <CaptionPhoto src={g2} alt="Workshop Publicidad Wifi">
                  <span className="font-bold text-[#251B37]">Publicidad Wifi</span>
                  <span className="text-[#85789A] text-xs mx-1">Por</span>
                  <span className="text-[#251B37]">Distefano · Farjoume · Marchetti</span>
                </CaptionPhoto>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={60}>
            <EmblaCarousel slides={workshopsSlides} options={carouselOptions} />
          </FadeIn>
        </div>
      </section>

      <SectionSeparator />

      {/* ── ÚLTIMOS NETIATONES ────────────────────────────────────────────── */}
      <section className="relative py-16 px-4 md:px-8 overflow-hidden" style={{ background: 'rgba(240,230,255,0.2)' }}>
        <div style={{
          position: 'absolute', borderRadius: '50%', filter: 'blur(100px)',
          width: 400, height: 400, bottom: -100, left: -100,
          background: 'radial-gradient(circle, #5D5FEF 0%, transparent 70%)',
          opacity: 0.06, pointerEvents: 'none',
        }} />

        <div className="relative max-w-5xl mx-auto z-10">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase text-center mb-14 leading-none tracking-widest">
              <span style={{ WebkitTextStroke: '1.5px #5D5FEF', color: 'rgba(93,95,239,0.30)' }}>Últimos </span>
              <span style={{ WebkitTextStroke: '1.5px #505AA5', color: 'rgba(80,90,165,1)' }}>Netiatones</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
            <FadeIn delay={80}>
              <div>
                <h3 className="font-sans text-lg font-bold text-[#251B37] mb-4">¿Qué son los Netiatones Híbridos?</h3>
                <p className="font-sans text-[#251B37] leading-relaxed mb-4">
                  Es la versión 3.0 de los maratones makers, desarrollada en el mundo tecnológico del metaverso. Permite una experiencia de hibridación entre lo real y lo virtual. Un espacio donde lo digital y lo físico se encuentran y fusionan, creando interacciones que generan dinámicas de otro mundo.
                </p>
                <p className="font-sans text-[#251B37] leading-relaxed mb-4">
                  Experiencias virtuales que aproximan a las personas a los desafíos presenciales, a la <strong>conexión, interacción y vinculación</strong>. Este modelo requiere el uso de plataformas de metaverso como Spatial Chat o Topia + Mural.
                </p>
                <p className="font-sans text-[#251B37] leading-relaxed mb-8">
                  Se pueden sumar múltiples features: facilitadores, mentores, juegos y productos físicos.
                </p>
                <Link to="/contacto" className="font-sans inline-block px-8 py-3 border-2 border-[#251B37] text-[#251B37] font-semibold tracking-widest uppercase text-sm hover:bg-[#251B37] hover:text-white transition-all duration-200">
                  Leer más
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={140}>
              <div className="space-y-3">
                <CaptionPhoto src={n1} alt="NETI en Rivadavia">
                  <span className="text-[#251B37]">NETI en Rivadavia – Hackaton</span>
                </CaptionPhoto>
                <CaptionPhoto src={n2} alt="Hackaton hibrido">
                  <span className="text-[#251B37]">Hackaton híbrido</span>
                </CaptionPhoto>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={60}>
            <EmblaCarousel slides={netiatonesSlides} options={carouselOptions} />
          </FadeIn>
        </div>
      </section>

      <SectionSeparator />

      {/* ── VENÍ A APRENDER — Cards dinámicas desde Google Sheets ─────────── */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase text-center mb-16 leading-none"
              style={{ WebkitTextStroke: '1.5px var(--color-neti-pink)', color: 'transparent' }}
            >
              Vení a aprender con nosotros
            </h2>
          </FadeIn>

          {/* Mensaje de error (no bloquea el resto de la página) */}
          {talleresError && !talleresLoading && (
            <p className="text-center font-sans text-sm text-[#85789A] mb-8">
              No se pudieron cargar los talleres en este momento. Intentá de nuevo más tarde.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">

            {/* ── ESTADO: Cargando ── */}
            {talleresLoading && [...Array(3)].map((_, i) => (
              <FadeIn key={i} delay={i * 100} className="flex">
                <TallerSkeleton />
              </FadeIn>
            ))}

            {/* ── ESTADO: Datos cargados ── */}
            {!talleresLoading && talleres.map((taller, i) => (
              <FadeIn key={taller.title + i} delay={i * 100} className="flex">
                <div className="relative flex flex-col w-full h-full min-h-[500px] border border-white/20 rounded-3xl overflow-hidden group">

                  {/* Borde exterior colorido */}
                  <div className="absolute inset-0 p-[2px]" style={{ background: taller.from }}>
                    <div className="w-full h-full rounded-[22px] bg-[#140d28]" />
                  </div>

                  {/* Orbe brillante de fondo */}
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                    <div
                      className="w-64 h-64 rounded-full opacity-40 transition-transform duration-700 ease-out group-hover:scale-125 group-hover:opacity-50"
                      style={{
                        background: `radial-gradient(circle, ${taller.to} 0%, ${taller.from} 60%, transparent 100%)`,
                        filter: 'blur(50px)',
                      }}
                    />
                  </div>

                  {/* Contenido principal */}
                  <div className="relative z-10 flex flex-1 p-3 sm:p-4">

                    {/* Panel izquierdo — Cristal / Glassmorphism */}
                    <div
                      className="flex flex-col flex-1 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderTopRightRadius: '64px',
                        borderBottomRightRadius: '24px',
                        borderTopLeftRadius: '16px',
                        borderBottomLeftRadius: '16px',
                      }}
                    >
                      <h3 className="font-sans text-[22px] font-bold text-white leading-tight mb-8 pr-2">
                        {taller.title}
                      </h3>

                      <ul className="space-y-4 flex-1">
                        {taller.items.length > 0
                          ? taller.items.map((item, j) => (
                              <li key={j} className="flex items-start gap-3">
                                <span
                                  className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                                  style={{ background: taller.to, boxShadow: `0 0 8px ${taller.to}` }}
                                />
                                <span className="font-sans text-[13.5px] text-white/80 leading-relaxed">
                                  {item}
                                </span>
                              </li>
                            ))
                          : (
                              <li className="font-sans text-[13.5px] text-white/40 italic">
                                Sin descripción disponible.
                              </li>
                            )
                        }
                      </ul>

                      <div className="mt-10 pt-5 border-t border-white/10">
                        <img
                          src={logoNetiBlue}
                          alt="Logo NETI"
                          className="h-6 w-auto opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                          style={{ filter: 'brightness(0) invert(1)' }}
                        />
                      </div>
                    </div>

                    {/* Panel derecho — Número + Botón */}
                    <div className="flex flex-col items-center justify-between w-12 sm:w-16 py-2 shrink-0">
                      <span
                        className="font-display text-xl font-black tracking-widest"
                        style={{ color: taller.from }}
                      >
                        0{i + 1}
                      </span>

                      <button
                        type="button"
                        onClick={() => setModalTaller(TALLER_KEYS[i % TALLER_KEYS.length])}
                        className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:bg-white/20 cursor-pointer shadow-lg"
                        style={{
                          background: 'rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(12px)',
                          border: '1px solid rgba(255,255,255,0.2)',
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" className="w-4 h-4 ml-0.5">
                          <path d="M4.646 2.146a.5.5 0 0 0 0 .708L7.793 6L4.646 9.146a.5.5 0 1 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" fill="white" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionSeparator />

      {/* ── CASOS DESTACADOS ──────────────────────────────────────────────── */}
      <section className="py-16 px-4 md:px-8" style={{ background: 'rgba(240,230,255,0.2)' }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2
              className="font-display text-4xl md:text-5xl font-black uppercase text-center mb-14"
              style={{ WebkitTextStroke: '1.5px var(--color-neti-pink)', color: 'transparent' }}
            >
              Casos Destacados
            </h2>
          </FadeIn>

          <FadeIn delay={60}>
            <div className="rounded-2xl overflow-hidden mb-8"
              style={{ boxShadow: '0 0 32px 4px rgba(103,88,155,0.15)' }}>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/Q9xZAe3UkW8"
                  title="Hackathon Online NETI"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <p className="font-sans text-xs font-semibold text-[#85789A] uppercase tracking-widest mb-5">Otros</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                'https://www.youtube.com/embed/911-Mc490jc',
                'https://www.youtube.com/embed/Cthlc5KZHLM',
                'https://www.youtube.com/embed/ZgWhLIWC6V4',
              ].map((src, i) => (
                <div key={i} className="rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                  style={{ boxShadow: '0 0 16px 2px rgba(103,88,155,0.12)' }}>
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={src}
                      title={`Video NETI ${i + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {modalTaller && (
        <FormularioModal taller={modalTaller} onClose={() => setModalTaller(null)} />
      )}
    </div>
  );
}