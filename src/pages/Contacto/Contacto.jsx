import { useState } from 'react';
import FadeIn from '../../components/FadeIn';
import { Link } from 'react-router-dom';

import ContactoModal from '../../components/ContactoModal/ContactoModal';
import CurriculumForm from '../../components/CurriculumForm/CurriculumForm';

import tallerImg from '../../assets/images/pictures/ContactoTaller.webp';
import bannerImg from '../../assets/images/pictures/ContactoBanner.webp';
import losEsperamosImg from '../../assets/images/pictures/ContactoLosEsperamos.webp';

const noSelect = {
  WebkitUserSelect: 'none', MozUserSelect: 'none',
  msUserSelect: 'none', userSelect: 'none',
  WebkitUserDrag: 'none', pointerEvents: 'none',
};

// ── Componente Principal ──────────────────────────────────────────────────────
export default function Contacto() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [mostrarCV, setMostrarCV] = useState(false);

  return (
    <div className="bg-white overflow-x-hidden relative min-h-screen">
      
      {/* ── Estilos de Animación para los "Blobs" flotantes ── */}
      <style>{`
        @keyframes float-slow {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(50px, -60px) scale(1.1); }
          66% { transform: translate(-40px, 40px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-float {
          animation: float-slow 20s ease-in-out infinite;
        }
        .delay-2000 { animation-delay: 2s; }
        .delay-5000 { animation-delay: 5s; }
      `}</style>

      {/* ── Fondo interactivo: Círculos difuminados en movimiento ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] right-[5%] w-[400px] h-[400px] bg-[#EC4E8D] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-float" />
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#00D8ED] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-float delay-2000" />
        <div className="absolute top-[60%] left-[30%] w-[600px] h-[600px] bg-[#251B37] rounded-full mix-blend-multiply filter blur-[150px] opacity-[0.08] animate-float delay-5000" />
      </div>

      <section className="pt-16 px-4 md:px-8 relative z-10" style={{ minHeight: '680px' }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h1 className="font-display text-5xl md:text-7xl font-black uppercase text-center mb-14 tracking-widest relative" style={{ WebkitTextStroke: '1.5px var(--color-neti-pink)', color: 'transparent' }}>
              Somos NETI
            </h1>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* ── Imagen del Taller: sin hover ── */}
            <FadeIn delay={80}>
              <div className="relative">
                <img 
                  src={tallerImg} 
                  alt="Taller NETI" 
                  className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-[#251B37]/15" 
                  style={noSelect} 
                  draggable={false} 
                />
              </div>
            </FadeIn>

            <FadeIn delay={140}>
              <div>
                <h2 className="font-sans text-2xl md:text-3xl font-black text-[#251B37] mb-5 tracking-tight">
                  El universo de la innovación<span className="text-[#EC4E8D]">.</span>
                </h2>
                <p className="font-sans text-[#251B37] text-base leading-relaxed mb-6 font-medium relative z-10">
                  Innovar es hacer. Y nuestro ADN es 100% MAKER, somos parte de una expresión cultural que cree que fallar es mejor que nunca intentarlo.
                </p>
                
                {/* ── Cita con estilo editorial ── */}
                <blockquote className="relative font-sans text-sm md:text-base italic text-[#85789A] leading-relaxed mb-8 p-6 rounded-r-xl bg-gradient-to-r from-[#EC4E8D]/[0.03] to-transparent border-l-4 border-[#EC4E8D]">
                  <span className="absolute top-2 left-3 text-4xl text-[#EC4E8D] opacity-20 font-serif">"</span>
                  <span className="relative z-10">Tendemos a sobrestimar el efecto de una tecnología a corto plazo y a subestimar el efecto a largo plazo.</span>
                  <span className="block mt-3 text-xs not-italic font-bold text-[#251B37] uppercase tracking-wider">— Roy Amara</span>
                </blockquote>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#EC4E8D]/50 to-transparent mb-8" />

                <div className="space-y-6 mb-10 relative z-10">
                  <div className="group">
                    <p className="font-sans font-bold text-[#251B37] text-base mb-1">¿Querés hacer un taller con nosotros?</p>
                    <Link to="/servicios" className="inline-flex items-center gap-2 font-sans font-semibold text-[#EC4E8D] group-hover:gap-3 transition-all duration-300">
                      Servicios 
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
                  <div className="group">
                    <p className="font-sans font-bold text-[#251B37] text-base mb-1">¿Querés ser parte de nuestra comunidad?</p>
                    <button onClick={() => setMostrarCV(!mostrarCV)} className="inline-flex items-center gap-2 font-sans font-semibold text-[#EC4E8D] group-hover:gap-3 transition-all duration-300">
                      Dejar currículum 
                      <svg className={`w-4 h-4 transition-transform duration-300 ${mostrarCV ? 'rotate-90' : 'group-hover:translate-x-1'}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                    
                    <div className="grid transition-[grid-template-rows] duration-500 ease-in-out mt-2" style={{ gridTemplateRows: mostrarCV ? '1fr' : '0fr' }}>
                      <div className="overflow-hidden">
                        <div className="pt-2">
                          <CurriculumForm onSuccess={() => setMostrarCV(false)} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── CTA y Redes Sociales ── */}
                <div className="flex items-center gap-6 flex-wrap mt-4 relative z-10">
                  <button
                    onClick={() => setModalAbierto(true)}
                    className="relative font-black text-lg uppercase tracking-widest px-8 py-3 border-2 border-[#251B37] text-[#251B37] overflow-hidden group/btn transition-all duration-300 hover:text-white hover:shadow-lg hover:shadow-[#251B37]/20"
                  >
                    <span className="relative z-10">Contacto</span>
                    <div className="absolute inset-0 bg-[#251B37] transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
                  </button>

                  <div className="flex gap-2 items-center">
                    <a
                      href="https://www.linkedin.com/company/no-est-todo-inventado-neti-/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-[#251B37] hover:text-white hover:bg-[#EC4E8D] rounded-full transition-all duration-200"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    </a>
                    <a
                      href="https://www.instagram.com/netimakers/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-[#251B37] hover:text-white hover:bg-[#EC4E8D] rounded-full transition-all duration-200"
                      aria-label="Instagram"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.745 2.014 2.086.673 3.427.085 5.269 0 7.124-.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.673 3.697 2.014 5.038 1.341 1.341 3.183 1.929 5.038 2.014C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.673 5.038-2.014 1.341-1.341 1.929-3.183 2.014-5.038.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.085-1.855-.673-3.697-2.014-5.038C20.645.745 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
                    </a>
                    <a
                      href="https://noestatodoinventado.medium.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-[#251B37] hover:text-white hover:bg-[#EC4E8D] rounded-full transition-all duration-200"
                      aria-label="Medium"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Banner: margen fijo grande para que el formulario no lo empuje ── */}
      <FadeIn delay={60}>
        <div className="w-full mt-64 mb-12 relative z-10">
          <div className="absolute inset-0 bg-[#251B37]/5 pointer-events-none" />
          <img src={bannerImg} alt="NETI comunidad" className="w-full object-cover max-h-[250px] shadow-sm" style={noSelect} draggable={false} />
        </div>
      </FadeIn>

      <section className="py-10 px-4 md:px-8 relative z-10">
        <FadeIn>
          <div className="relative max-w-4xl mx-auto">
            {/* Detalle decorativo superior */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-[#EC4E8D] to-transparent opacity-50" />
            <p className="font-sans text-[#251B37] text-xl md:text-2xl text-center leading-relaxed font-medium">
              Somos una comunidad diversa que entrelaza saberes y funciona como catalizadora de innovaciones para las personas. Aplicamos metodologías ágiles como <span className="font-bold text-[#EC4E8D]">"llave"</span> para destrabar la transformación y el crecimiento en sus organizaciones.
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="pt-12 pb-20 px-4 md:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="font-display text-5xl md:text-7xl font-black uppercase text-center mb-12 tracking-widest relative" style={{ WebkitTextStroke: '1.5px var(--color-neti-pink)', color: 'transparent' }}>
              ¡Los esperamos!
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="relative group">
              <img src={losEsperamosImg} alt="Comunidad NETI" className="w-full object-cover rounded-3xl shadow-2xl shadow-[#251B37]/15 transition-transform duration-700 hover:scale-[1.01]" style={noSelect} draggable={false} />
            </div>
          </FadeIn>
        </div>
      </section>

      {modalAbierto && (
        <ContactoModal onClose={() => setModalAbierto(false)} />
      )}

    </div>
  );
}