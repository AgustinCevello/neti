import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import dobleDiamante from '../../assets/images/pictures/DobleDiamante.png';
import equipoFondo from '../../assets/images/pictures/ElEquipoFondo.png';
import nosotros1 from '../../assets/images/pictures/Nosotros1.png';
import nosotros2 from '../../assets/images/pictures/Nosotros2.png';
import nosotros3 from '../../assets/images/pictures/Nosotros3.png';
import nosotros4 from '../../assets/images/pictures/Nosotros4.png';
import mara from '../../assets/images/pictures/EmpleadoMara.png';
import esteban1 from '../../assets/images/pictures/EmpleadoEsteban1.png';
import euge from '../../assets/images/pictures/EmpleadoEuge.png';
import esteban2 from '../../assets/images/pictures/EmpleadoEsteban2.png';
import estefania from '../../assets/images/pictures/EmpleadoEstefi.png';
import sorelys from '../../assets/images/pictures/EmpleadoSorelys.png';
import juani from '../../assets/images/pictures/EmpleadoJuani.png';

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

// ── Datos ─────────────────────────────────────────────────────────────────────
const teamMembers = [
    { name: "Mara Provenzano", role: "Cofundadora-DEO", linkedin: "https://www.linkedin.com/in/marapro/", img: mara },
    { name: "Esteban Bonomi", role: "Cofundador-COO", linkedin: "https://www.linkedin.com/in/esteban-bonomi-642720116/", img: esteban1 },
    { name: "Euge Abratti Bogdanich", role: "Diseñadora de experiencia", linkedin: "https://www.linkedin.com/in/eugenia-abratti-bogdanich/", img: euge },
    { name: "Santiago Marchetti", role: "Facilitador IoT", linkedin: "https://www.linkedin.com/in/santiago-marchetti/", img: esteban2 },
    { name: "Estefania Cedermaz", role: "Facilitadora SD", linkedin: "https://www.linkedin.com/in/estefaniacedermazservicedesigner/", img: estefania },
    { name: "Sorelys Marcano Martinez", role: "Facilitadora SD", linkedin: "https://www.linkedin.com/in/sorelys-marcano-martinez", img: sorelys },
    { name: "Juan Ignacio Franchi", role: "Diseñador UX/UI", linkedin: "https://www.linkedin.com/in/juan-ignacio-franchi-5356a81b7/", img: juani },
];

const diamanteTexts = [
    { num: "01", text: "Para que el modelo funcione, es necesario tener una cultura de empresa que valore y fomente el diseño como herramientas de resolución de problemas." },
    { num: "02", text: "El primer diamante engloba las etapas de descubrimiento y definición, y sirve para entender, en vez de asumir, cuál es el problema." },
    { num: "03", text: "El segundo diamante incluye las fases de desarrollo y entrega. Aquí se trata de proporcionar soluciones al problema, codiseñando con las personas involucradas." },
    { num: "04", text: "No es necesario pasar de forma lineal por cada una de estas etapas. De hecho, se recomienda avanzar y retroceder en cada fase." },
];

const noSelect = {
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
    WebkitUserDrag: "none",
    pointerEvents: "none",
};

const LinkedInIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);
const TeamCard = ({ member, delay = 0 }) => {
    return (
        <FadeIn delay={delay}>
            <div className="flex flex-col items-center w-full">
                <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group mb-5 block w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44"
                >
                    <img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-full object-contain"
                        style={{ ...noSelect, pointerEvents: "none" }}
                        draggable={false}
                    />
                    <div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "radial-gradient(circle 50px at center, rgba(0,119,181,0.80) 0%, rgba(0,119,181,0.0) 100%)" }}
                    >
                        <div className="text-white scale-0 group-hover:scale-100 transition-transform duration-300 delay-75">
                            <LinkedInIcon />
                        </div>
                    </div>
                </a>
                <span className="font-sans text-[10px] sm:text-xs font-semibold text-[#EC4E8D] uppercase tracking-widest mb-1 text-center leading-tight">{member.role}</span>
                <h3 className="font-sans font-bold text-[#251B37] text-center text-xs sm:text-sm leading-tight">{member.name}</h3>
            </div>
        </FadeIn>
    );
};

const SocialIcon = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#251B37] hover:text-[#EC4E8D] transition-colors">
        {children}
    </a>
);

export default function Nosotros() {
    return (
        <div className="bg-white overflow-hidden">

            {/* ── SECCIÓN 1 ────────────────────────────────────────────────── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
                <FadeIn>
                    <h1
                        className="font-display text-5xl md:text-7xl font-black text-center mb-8 uppercase tracking-widest"
                        style={{ WebkitTextStroke: "2px #EC4E8D", color: "transparent" }}
                    >
                        NOSOTROS
                    </h1>
                </FadeIn>

                <FadeIn delay={100}>
                    <h2 className="font-sans text-2xl md:text-3xl font-bold text-center text-[#251B37] mb-16 max-w-4xl mx-auto leading-relaxed">
                        Somos Diseñadores, Creadores y Makers que combinan tecnologías exponenciales con lógicas de diseño y co-creación.
                    </h2>
                </FadeIn>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <FadeIn delay={150}>
                        <div>
                            <h3 className="font-sans text-xl font-bold text-[#251B37] mb-4">
                                ¿Sentís que tu organización necesita trabajar en su modelo de innovación?
                            </h3>
                            <p className="font-sans text-[#251B37] mb-4 leading-relaxed">
                                En NETI actuamos como <strong>catalizadores de innovación</strong> y ayudamos a <strong>desarrollar soluciones integrales</strong>. Que acompañan y empoderan a las empresas e instituciones para dar respuesta a las exigencias que viven frente a los cambios tecnológicos del nuevo paradigma digital.
                            </p>
                            <p className="font-sans text-[#251B37] mb-8 leading-relaxed">
                                Nos centramos en las <strong>necesidades de las personas</strong>, basándonos en su experiencia, sus percepciones y emociones, y en las características específicas de cada organización para potenciar el aprendizaje de <strong>nuevas herramientas y habilidades para el futuro</strong>.
                            </p>
                            <Link
                                to="/contacto"
                                className="font-sans inline-block px-8 py-3 border border-[#251B37] text-[#251B37] font-semibold tracking-widest uppercase text-sm hover:bg-[#251B37] hover:text-white transition-all duration-200 mb-8"
                            >
                                Contacto
                            </Link>
                            <div className="flex gap-4 mt-4">
                                <SocialIcon href="https://www.linkedin.com/company/no-est-todo-inventado-neti-/">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                </SocialIcon>
                                <SocialIcon href="https://www.instagram.com/netimakers/">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975-2.242-1.247-3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.745 2.014 2.086.673 3.427.085 5.269 0 7.124-.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.673 3.697 2.014 5.038 1.341 1.341 3.183 1.929 5.038 2.014C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.673 5.038-2.014 1.341-1.341 1.929-3.183 2.014-5.038.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.085-1.855-.673-3.697-2.014-5.038C20.645.745 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
                                </SocialIcon>
                                <SocialIcon href="https://noestatodoinventado.medium.com/">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" /></svg>
                                </SocialIcon>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={200}>
                        <div className="grid grid-cols-2 gap-3 h-[520px]">
                            <img src={nosotros1} alt="NETI 1" className="w-full h-full object-cover rounded-2xl" style={noSelect} draggable={false} />
                            <img src={nosotros2} alt="NETI 2" className="w-full object-cover rounded-2xl mt-[-8%] h-[108%]" style={noSelect} draggable={false} />
                            <img src={nosotros3} alt="NETI 3" className="w-full object-cover rounded-2xl h-[95%]" style={noSelect} draggable={false} />
                            <img src={nosotros4} alt="NETI 4" className="w-full h-full object-cover rounded-2xl" style={noSelect} draggable={false} />
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* ── SECCIÓN 2 — Doble Diamante ─────────────────────────────── */}
            <div className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <FadeIn>
                        <h2
                            className="font-display text-4xl md:text-6xl font-black text-center mb-16 uppercase tracking-widest"
                            style={{ WebkitTextStroke: "2px #EC4E8D", color: "transparent" }}
                        >
                            DOBLE DIAMANTE
                        </h2>
                    </FadeIn>

                    <FadeIn delay={80}>
                        <div className="w-full mb-16">
                            <img src={dobleDiamante} alt="Doble Diamante" className="w-full object-contain" style={noSelect} draggable={false} />
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
                        {diamanteTexts.map(({ num, text }, i) => (
                            <FadeIn key={num} delay={i * 80}>
                                <div className="relative bg-white border border-[#85789A]/20 p-8 rounded-2xl overflow-hidden shadow-[0_0_18px_2px_rgba(103,88,155,0.13)]">
                                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#85789A]/30 rounded-l-2xl" />
                                    <div
                                        className="absolute bottom-0 right-3 font-display font-black leading-none select-none pointer-events-none"
                                        style={{ fontSize: 'clamp(4rem, 8vw, 6.5rem)', color: 'rgba(133,120,154,0.06)' }}
                                    >
                                        {num}
                                    </div>
                                    <p className="relative z-10 font-sans text-[#251B37] text-base leading-relaxed">{text}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    <FadeIn delay={100}>
                        <div className="text-right max-w-5xl mx-auto">
                            <span className="font-sans text-[#85789A] italic text-sm font-medium tracking-wide">- Design council</span>
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* ── SECCIÓN 3 — El Equipo ───────────────────────────────────── */}
            <div
                className="py-20 px-4"
                style={{
                    backgroundImage: `url(${equipoFondo})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center top',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'white',
                }}
            >
                <div className="max-w-6xl mx-auto">
                    <FadeIn>
                        <h2
                            className="font-display text-4xl md:text-6xl font-black text-center mb-16 uppercase tracking-widest"
                            style={{ WebkitTextStroke: "2px #EC4E8D", color: "transparent" }}
                        >
                            EL EQUIPO
                        </h2>
                    </FadeIn>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 justify-items-center mb-16">
                        {teamMembers.slice(0, 3).map((member, idx) => (
                            <TeamCard key={idx} member={member} delay={idx * 80} />
                        ))}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 justify-items-center">
                        {teamMembers.slice(3).map((member, idx) => (
                            <TeamCard key={idx + 3} member={member} delay={idx * 60} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}