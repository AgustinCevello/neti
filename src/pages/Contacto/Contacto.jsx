import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import tallerImg from '../../assets/images/pictures/ContactoTaller.png';
import bannerImg from '../../assets/images/pictures/ContactoBanner.png';
import losEsperamosImg from '../../assets/images/pictures/ContactoLosEsperamos.png';

// ── FadeIn ────────────────────────────────────────────────────────────────────
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

const noSelect = {
  WebkitUserSelect: 'none', MozUserSelect: 'none',
  msUserSelect: 'none', userSelect: 'none',
  WebkitUserDrag: 'none', pointerEvents: 'none',
};

// ── Componente principal ──────────────────────────────────────────────────────
export default function Contacto() {
  return (
    <div className="bg-white overflow-x-hidden">

      {/* ── SOMOS NETI ───────────────────────────────────────────────── */}
      <section className="pt-16 pb-10 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h1
              className="font-display text-5xl md:text-7xl font-black uppercase text-center mb-14 tracking-widest"
              style={{ WebkitTextStroke: '2px #EC4E8D', color: 'transparent' }}
            >
              Somos NETI
            </h1>
          </FadeIn>

          {/* 2 columnas */}
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Foto izquierda */}
            <FadeIn delay={80}>
              <img
                src={tallerImg}
                alt="Taller NETI"
                className="w-full h-full object-cover rounded-2xl"
                style={noSelect}
                draggable={false}
              />
            </FadeIn>

            {/* Contenido derecha */}
            <FadeIn delay={140}>
              <div>
                <h2 className="font-sans text-2xl md:text-3xl font-bold text-[#251B37] mb-5">
                  El universo de la innovación
                </h2>

                <p className="font-sans font-bold text-[#251B37] text-base leading-relaxed mb-5">
                  Innovar es hacer. Y nuestro ADN es 100% MAKER, somos parte de una expresión cultural que cree que fallar es mejor que nunca intentarlo.
                </p>

                <blockquote className="font-sans text-sm italic text-[#85789A] leading-relaxed mb-5 pl-4 border-l-2 border-[#EC4E8D]">
                  "Tendemos a sobrestimar el efecto de una tecnología a corto plazo y a subestimar el efecto a largo plazo". – Roy Amara fue investigador, científico y ex presidente del Institute for the Future.
                </blockquote>

                {/* Divisor */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#EC4E8D] to-transparent mb-7" />

                {/* Links */}
                <div className="space-y-5 mb-8">
                  <div>
                    <p className="font-sans font-bold text-[#251B37] text-base mb-2">
                      ¿Querés hacer un taller con nosotros?
                    </p>
                    <Link
                      to="/servicios"
                      className="inline-flex items-center gap-2 font-sans font-semibold text-[#EC4E8D] hover:gap-3 transition-all duration-200"
                    >
                      Servicios
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                  <div>
                    <p className="font-sans font-bold text-[#251B37] text-base mb-2">
                      ¿Querés ser parte de nuestra comunidad?
                    </p>
                    <a
                      href="mailto:contacto@noestatodoinventado.com"
                      className="inline-flex items-center gap-2 font-sans font-semibold text-[#EC4E8D] hover:gap-3 transition-all duration-200"
                    >
                      Dejar curriculum
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Botón + RRSS */}
                <div className="flex items-center gap-6 flex-wrap">
                  <a
                    href="mailto:contacto@noestatodoinventado.com"
                    className="font-display font-black text-lg uppercase tracking-widest px-8 py-3 border-2 border-[#251B37] text-[#251B37] hover:bg-[#251B37] hover:text-white transition-all duration-200"
                  >
                    Contacto
                  </a>

                  {/* RRSS */}
                  <div className="flex gap-4 items-center">
                    <a href="https://www.linkedin.com/company/no-est-todo-inventado-neti-/" target="_blank" rel="noopener noreferrer" className="text-[#251B37] hover:text-[#EC4E8D] transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/netimakers/" target="_blank" rel="noopener noreferrer" className="text-[#251B37] hover:text-[#EC4E8D] transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.745 2.014 2.086.673 3.427.085 5.269 0 7.124-.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.673 3.697 2.014 5.038 1.341 1.341 3.183 1.929 5.038 2.014C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.673 5.038-2.014 1.341-1.341 1.929-3.183 2.014-5.038.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.085-1.855-.673-3.697-2.014-5.038C20.645.745 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                      </svg>
                    </a>
                    <a href="https://noestatodoinventado.medium.com/" target="_blank" rel="noopener noreferrer" className="text-[#251B37] hover:text-[#EC4E8D] transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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

      {/* ── BANNER FOTOS ─────────────────────────────────────────────── */}
      <FadeIn delay={60}>
        <div className="w-full my-10">
          <img
            src={bannerImg}
            alt="NETI comunidad"
            className="w-full object-cover max-h-52"
            style={noSelect}
            draggable={false}
          />
        </div>
      </FadeIn>

      {/* ── PÁRRAFO CENTRAL ──────────────────────────────────────────── */}
      <section className="py-12 px-4 md:px-8">
        <FadeIn>
          <p className="font-sans text-[#251B37] text-xl md:text-2xl text-center max-w-4xl mx-auto leading-relaxed font-medium">
            Somos una comunidad diversa que entrelaza saberes y funciona como catalizadora de innovaciones para las personas. Aplicamos metodologías ágiles como "llave" para destrabar la transformación y el crecimiento en sus organizaciones.
          </p>
        </FadeIn>
      </section>

      {/* ── ¡LOS ESPERAMOS! ──────────────────────────────────────────── */}
      <section className="pt-8 pb-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2
              className="font-display text-5xl md:text-7xl font-black uppercase text-center mb-10 tracking-widest"
              style={{ WebkitTextStroke: '2px #EC4E8D', color: 'transparent' }}
            >
              ¡Los esperamos!
            </h2>
          </FadeIn>

          <FadeIn delay={100}>
            <img
              src={losEsperamosImg}
              alt="Comunidad NETI"
              className="w-full object-cover rounded-2xl"
              style={noSelect}
              draggable={false}
            />
          </FadeIn>
        </div>
      </section>

    </div>
  );
}