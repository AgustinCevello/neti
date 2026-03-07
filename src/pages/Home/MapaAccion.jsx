import { useRef, useEffect, useState } from "react";
import imgInspirar from "../../assets/images/pictures/MapaDeAccionInspirar.png";
import imgEmpatizar from "../../assets/images/pictures/MapaDeAccionEmpatizaryAprender.png";
import imgGenerar from "../../assets/images/pictures/MapaDeAccionGenerarIdeas.png";
import imgPrototipar from "../../assets/images/pictures/MapaDeAccionPrototiparyTestearIdeas.png";
import imgIterar from "../../assets/images/pictures/MapaDeAccionIterarYDesarrollar.png";
import imgFondo from "../../assets/images/pictures/MapaDeAccionFondo.png";
import imgLineaPunteada from "../../assets/images/pictures/MapaDeAccionLineaPunteada.png";

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

            {/* CAPA 1: Fondo */}
            <img
                src={imgFondo}
                alt=""
                aria-hidden="true"
                className="absolute top-0 left-1/2 h-full pointer-events-none select-none"
                style={{ zIndex: 0, transform: 'translateX(-50%)', width: 'auto' }}
            />

            {/* CAPA 2: Línea punteada - solo en pantallas >= 768px */}
            {!esMobile && (
                <img
                    src={imgLineaPunteada}
                    alt=""
                    aria-hidden="true"
                    className="absolute left-1/2 pointer-events-none select-none"
                    style={{ zIndex: 1, transform: 'translateX(-50%)', width: 'auto', height: 'auto', top: lineaStyle.top, bottom: lineaStyle.bottom }}
                />
            )}

            {/* CAPA 3: Contenido */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 2 }}>
                <h2
                    ref={tituloRef}
                    className="text-4xl md:text-6xl font-black text-center mb-24 uppercase tracking-widest text-transparent [-webkit-text-stroke:2px_#C85E99]"
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
                            <img alt="Inspirar" draggable={false} className="w-full h-auto max-w-lg mx-auto pointer-events-none select-none" src={imgInspirar} />
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
                            <img alt="Empatizar y aprender" draggable={false} className="w-full h-auto max-w-lg mx-auto pointer-events-none select-none" src={imgEmpatizar} />
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
                            <img alt="Generar ideas" draggable={false} className="w-full h-auto max-w-lg mx-auto pointer-events-none select-none" src={imgGenerar} />
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
                            <img alt="Prototipar y testear ideas" draggable={false} className="w-full h-auto max-w-lg mx-auto pointer-events-none select-none" src={imgPrototipar} />
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
                            <img alt="Iterar y desarrollar" draggable={false} className="w-full h-auto max-w-lg mx-auto pointer-events-none select-none" src={imgIterar} />
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <a
                        ref={botonRef}
                        className="inline-block px-12 py-4 bg-pink-100 text-transparent font-bold text-xl uppercase tracking-wider rounded-full border-2 border-fuchsia-500 hover:bg-fuchsia-500 hover:text-white transition-colors duration-300 shadow-lg [-webkit-text-stroke:1px_#d946ef]"
                        to="/servicios"
                    >
                        Servicios
                    </a>
                </div>
            </div>
        </section>
    );
}