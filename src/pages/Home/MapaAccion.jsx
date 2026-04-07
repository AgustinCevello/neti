import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import imgFondo from "../../assets/images/pictures/MapaDeAccionFondo.webp";
import imgInspirar from "../../assets/images/pictures/MapaDeAccionInspirar.webp";
import imgEmpatizar from "../../assets/images/pictures/MapaDeAccionEmpatizaryAprender.webp";
import imgGenerar from "../../assets/images/pictures/MapaDeAccionGenerarIdeas.webp";
import imgPrototipar from "../../assets/images/pictures/MapaDeAccionPrototiparyTestearIdeas.webp";
import imgIterar from "../../assets/images/pictures/MapaDeAccionIterarYDesarrollar.webp";
import imgLineaPunteada from "../../assets/images/pictures/MapaDeAccionLineaPunteada.webp";

const TextoConGlow = ({ children, align = "left" }) => (
  <div className={`relative text-center md:text-${align} mb-8 md:mb-0`}>
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: '-40% -30%',
        background: 'radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.4) 60%, transparent 80%)',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
    <div className="relative" style={{ zIndex: 1 }}>
      {children}
    </div>
  </div>
);

export default function MapaAccion() {
  const tituloRef = useRef(null);
  const botonRef = useRef(null);
  const seccionRef = useRef(null);
  const [lineaStyle, setLineaStyle] = useState({ top: '12%', bottom: '8%' });
  const [esMobile, setEsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const calcular = () => {
      setEsMobile(window.innerWidth < 768);
      if (!tituloRef.current || !botonRef.current || !seccionRef.current) return;
      const seccionRect = seccionRef.current.getBoundingClientRect();
      const tituloRect = tituloRef.current.getBoundingClientRect();
      const botonRect = botonRef.current.getBoundingClientRect();
      setLineaStyle({
        top: `${tituloRect.bottom - seccionRect.top}px`,
        bottom: `${seccionRect.bottom - botonRect.top}px`,
      });
    };

    calcular();
    const resizeObserver = new ResizeObserver(calcular);
    if (seccionRef.current) resizeObserver.observe(seccionRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section ref={seccionRef} className="py-20 relative overflow-hidden">

      {/* CAPA 1: Fondo (Corregido y Centrado) */}
      <img
        src={imgFondo}
        alt=""
        width={708} // user's provided original file's width
        height={3009} // user's provided original file's height
        aria-hidden="true"
        className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 h-full w-auto object-contain pointer-events-none select-none"
        style={{ zIndex: 0 }}
      />

      {/* CAPA 2: Línea punteada - solo en pantallas >= 768px */}
      {!esMobile && (
        <img
          src={imgLineaPunteada}
          alt=""
          loading="lazy"
          aria-hidden="true"
          className="absolute left-1/2 pointer-events-none select-none"
          style={{ 
            zIndex: 1, 
            transform: 'translateX(-50%)', 
            top: lineaStyle.top, 
            height: `calc(100% - ${lineaStyle.top} - ${lineaStyle.bottom})`,
            width: 'auto'
          }}
        />
      )}
      {/* CAPA 3: Contenido */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 2 }}>
        <h2
          ref={tituloRef}
          className="text-4xl md:text-6xl font-black text-center mb-24 uppercase tracking-widest text-transparent [-webkit-text-stroke:1.5px_#C85E99]"
        >
          Mapa de Acción
        </h2>

        <div className="relative">
          {/* Inspirar */}
          <div className="flex flex-col md:flex-row-reverse items-center mb-32 relative">
            <div className="md:w-1/2 md:pl-12">
              <TextoConGlow align="left">
                <h3 className="text-xl font-bold mb-2">Call to action</h3>
                <p className="text-gray-600">Dentro de lo cotidiano, surge el llamado al cambio. Es nuestro deber convertir los problemas en desafíos y embarcarnos en la aventura.</p>
              </TextoConGlow>
            </div>
            <div className="md:w-1/2 md:pr-12">
              <img alt="Inspirar" width={442} height={692} loading="lazy" draggable={false} className="w-full h-auto max-w-lg mx-auto pointer-events-none select-none" src={imgInspirar} />
            </div>
          </div>

          {/* Empatizar */}
          <div className="flex flex-col md:flex-row items-center mb-32 relative">
            <div className="md:w-1/2 md:pr-12">
              <TextoConGlow align="right">
                <h3 className="text-xl font-bold mb-2">Mundo externo a la organización</h3>
                <p className="text-gray-600">Aventurándonos en terreno desconocido, donde no se conocen las reglas ni limitaciones. Nos encontramos con guías que nos ayudarán a entender este nuevo mundo.</p>
              </TextoConGlow>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <img alt="Empatizar y aprender" width={597} height={826} loading="lazy" draggable={false} className="w-full h-auto max-w-lg mx-auto pointer-events-none select-none" src={imgEmpatizar} />
            </div>
          </div>

          {/* Generar ideas */}
          <div className="flex flex-col md:flex-row-reverse items-center mb-32 relative">
            <div className="md:w-1/2 md:pl-12">
              <TextoConGlow align="left">
                <h3 className="text-xl font-bold mb-2">Convertir los desafíos en soluciones</h3>
                <p className="text-gray-600">Diferentes tipos de problemas surgirán con la información que obtuvimos hasta ahora. Llega el momento de superarnos, debemos tener miradas objetivas.</p>
              </TextoConGlow>
            </div>
            <div className="md:w-1/2 md:pr-12">
              <img alt="Generar ideas" width={409} height={443} loading="lazy" draggable={false} className="w-full h-auto max-w-lg mx-auto pointer-events-none select-none" src={imgGenerar} />
            </div>
          </div>

          {/* Prototipar */}
          <div className="flex flex-col md:flex-row items-center mb-32 relative">
            <div className="md:w-1/2 md:pr-12">
              <TextoConGlow align="right">
                <h3 className="text-xl font-bold mb-2">Las pruebas</h3>
                <p className="text-gray-600">Iniciamos con el armado, las pruebas y empezamos a comprobar la factibilidad de nuestras ideas.</p>
              </TextoConGlow>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <img alt="Prototipar y testear ideas" width={412} height={485} loading="lazy" draggable={false} className="w-full h-auto max-w-lg mx-auto pointer-events-none select-none" src={imgPrototipar} />
            </div>
          </div>

          {/* Iterar */}
          <div className="flex flex-col md:flex-row-reverse items-center mb-20 relative">
            <div className="md:w-1/2 md:pl-12">
              <TextoConGlow align="left">
                <h3 className="text-xl font-bold mb-2">Emprender/Sprints</h3>
                <p className="text-gray-600">Nuestras ideas llegaron a buen puerto, pero como todo diseño, siempre se puede mejorar. En esta etapa repetimos las pruebas y analizamos los resultados de la solución.</p>
              </TextoConGlow>
            </div>
            <div className="md:w-1/2 md:pr-12">
              <img alt="Iterar y desarrollar" width={568} height={740} loading="lazy" draggable={false} className="w-full h-auto max-w-lg mx-auto pointer-events-none select-none" src={imgIterar} />
            </div>
          </div>
        </div>

        {/* Botón CTA Mejorado */}
        <div className="text-center mt-12 flex justify-center pb-8">
          <Link
            ref={botonRef}
            to="/servicios"
            className="group relative inline-flex items-center justify-center gap-3 px-10 md:px-14 py-4 md:py-5 text-white font-sans font-bold text-base md:text-lg uppercase tracking-widest rounded-full overflow-hidden transition-all duration-300 hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, #1a1030 40%, #251B37 100%)',
              boxShadow: '0 8px 32px rgba(236,78,141,0.25)',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(236,78,141,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(236,78,141,0.25)'; }}
          >
            {/* Brillo interior fucsia */}
            <span
              className="absolute top-0 right-0 w-32 h-full pointer-events-none transition-transform duration-500 group-hover:translate-x-4"
              style={{ background: 'radial-gradient(ellipse at center, rgba(236,78,141,0.6), transparent 70%)' }}
            />
            
            <span className="relative z-10 flex items-center gap-3">
              Servicios
              <svg 
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" 
                fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}