import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import EmblaCarousel from '../../components/EmblaCarousel/EmblaCarousel';
import FormularioModal from '../../components/FormularioModal/FormularioModal';

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
        src={src}
        alt={alt}
        loading="lazy"
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

const workshopsSlides = [g1, g2, g3, g4, g5, g6];
const netiatonesSlides = [n1, n2, n3, n4, n5, n6];
const carouselOptions = { slidesToScroll: 'auto', loop: false };

const talleres = [
  {
    title: "Taller de Liderazgo Disruptivo",
    from: "#EC4E8D",
    to: "#f9a8d4",
    accent: "#EC4E8D",
    items: [
      "Pensado para líderes que quieren desarrollar proyectos innovadores",
      "Para la transformación sistémica de la organización",
      "Del mismo a sí mismo, a su equipo y a las redes de relacionamiento",
      "Liderar los resultados, nuevos negocios y equipos orientados a resultados",
      "Liderar una visión centrada en el cliente",
    ],
    link: "/liderazgo-disruptivo",
  },
  {
    title: "Talleres Hands On con Metodologías Ágiles",
    from: "#7C3AED",
    to: "#a78bfa",
    accent: "#7C3AED",
    items: [
      "Pensado para todos los miembros de la organización que buscan innovar",
      "Surfear el cambio de paradigma. Desarrollar nuevas habilidades",
      "Fuerza en marcos de proyectos innovadores",
      "Eventos multidisciplinares que mejoran el espíritu de colaboración",
      "Crea valor para la organización y sus clientes",
    ],
    link: "/servicios",
  },
  {
    title: "Desarrollo de productos y servicios",
    from: "#00D8ED",
    to: "#6ee7f7",
    accent: "#00D8ED",
    items: [
      "Pensado para aquellas personas curiosas que quieran desarrollar productos innovadores",
      "Sector de prototipado rápido. Combiná la tecnología y el diseño para lograr un prototipo funcional",
      "Guiados por equipos multidisciplinarios de expertos para crear prototipos que surjan en la etapa de ideación",
      "Con laboratorio de prototipado físico: 3D Printing, Maquetado electrónico y/o Mediaciones",
    ],
    link: "/servicios",
  },
];

export default function Servicios() {
  const [modalTaller, setModalTaller] = useState(null);
  const tallerKeys = ['liderazgo', 'hands_on', 'desarrollo'];

  return (
    <div className="bg-white overflow-x-hidden">

      {/* WORKSHOPS EMPRESAS */}
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
              <span style={{ WebkitTextStroke: '2px #505AA5', color: 'rgba(80,90,165,1)' }}>Workshops </span>
              <span style={{ WebkitTextStroke: '2px #5D5FEF', color: 'rgba(93,95,239,0.30)' }}>Empresas</span>
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

      {/* ÚLTIMOS NETIATONES */}
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
              <span style={{ WebkitTextStroke: '2px #5D5FEF', color: 'rgba(93,95,239,0.30)' }}>Últimos </span>
              <span style={{ WebkitTextStroke: '2px #505AA5', color: 'rgba(80,90,165,1)' }}>Netiatones</span>
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
                <CaptionPhoto src={n1} alt="Neti en Rivadavia">
                  <span className="text-[#251B37]">Neti en Rivadavia – Hackaton</span>
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

      {/* VENI A APRENDER */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase text-center mb-14 leading-none"
              style={{ WebkitTextStroke: '2px #EC4E8D', color: 'transparent' }}>
              Vení a aprender con nosotros
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {talleres.map((taller, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="relative w-full h-[560px] border border-white/40 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 p-1" style={{ background: taller.from }}>
                    <div className="w-full h-full rounded-xl bg-[#1a1030]"
                      style={{ borderTopRightRadius: '80px', borderBottomRightRadius: '32px' }} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center" style={{ backdropFilter: 'blur(12px)' }}>
                    <div
                      className="w-48 h-48 rounded-full animate-spin"
                      style={{
                        background: `radial-gradient(circle, ${taller.to} 0%, ${taller.from} 60%, transparent 100%)`,
                        animationDuration: '12s',
                        opacity: 0.5,
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 p-4 flex justify-between">
                    <div className="w-[75%] p-4 flex flex-col rounded-xl backdrop-blur-md"
                      style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                      <span className="font-sans text-lg font-bold text-white leading-snug mb-4">{taller.title}</span>
                      <ul className="space-y-2.5 flex-1">
                        {taller.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="shrink-0 mt-0.5 text-base font-bold" style={{ color: taller.to }}>·</span>
                            <span className="font-sans text-[13px] text-white/75 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 text-xs font-sans text-white/30 tracking-widest uppercase">NETI</div>
                    </div>
                    <div className="flex flex-col items-end justify-between py-1">
                      <span className="font-display text-sm font-black" style={{ color: 'rgba(255,255,255,0.35)' }}>0{i + 1}</span>
                      <button
                        type="button"
                        onClick={() => setModalTaller(tallerKeys[i])}
                        className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 cursor-pointer"
                        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" className="w-4 h-4">
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

      {/* CASOS DESTACADOS */}
      <section className="py-16 px-4 md:px-8" style={{ background: 'rgba(240,230,255,0.2)' }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase text-center mb-14"
              style={{ WebkitTextStroke: '2px #EC4E8D', color: 'transparent' }}>
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