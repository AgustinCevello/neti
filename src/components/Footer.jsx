import { Link, useLocation } from 'react-router-dom';
import logoNeti from '../assets/images/icons/logo_neti_withe.webp';

export default function Footer() {
  const location = useLocation();
  const isContactPage = location.pathname === '/contacto';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative w-full overflow-hidden text-white font-sans border-t border-white/10"
      style={{
        background: "linear-gradient(145deg, #3d3566 0%, #1e1433 45%, #0f0a1a 100%)",
      }}
    >
      {/* Glows decorativos */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(236,78,141,0.15) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[400px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(0,216,237,0.1) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-10 z-10">
        
        {/* ZONA SUPERIOR: Columnas de contenido */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-10 mb-20">
          
          {/* Columna 1: Marca / About */}
          <div className="flex flex-col gap-5">
            <img 
              src={logoNeti} 
              alt="NETI Logo" 
              className="h-12 w-auto object-contain object-left"
            />
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Somos una comunidad diversa que entrelaza saberes y funciona como catalizadora de innovaciones para las organizaciones y las personas.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://www.linkedin.com/company/no-est-todo-inventado-neti-/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-fuchsia hover:bg-white/10 hover:border-fuchsia/30 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V24h-4V8.5zM8.5 8.5h3.84v2.13h.05c.53-1 1.84-2.13 3.79-2.13 4.05 0 4.8 2.67 4.8 6.14V24h-4v-8.5c0-2.03-.04-4.63-2.82-4.63-2.83 0-3.26 2.21-3.26 4.49V24h-4V8.5z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/netimakers/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-fuchsia hover:bg-white/10 hover:border-fuchsia/30 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.745 2.014 2.086.673 3.427.085 5.269 0 7.124-.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.673 3.697 2.014 5.038 1.341 1.341 3.183 1.929 5.038 2.014C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.673 5.038-2.014 1.341-1.341 1.929-3.183 2.014-5.038.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.085-1.855-.673-3.697-2.014-5.038C20.645.745 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a
                href="https://noestatodoinventado.medium.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-fuchsia hover:bg-white/10 hover:border-fuchsia/30 transition-all duration-300"
                aria-label="Medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Columna 2: Talleres */}
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-fuchsia/80">
              Talleres
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/liderazgo-disruptivo" className="group flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia/50 group-hover:bg-fuchsia transition-colors" />
                  Liderazgo Disruptivo
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="group flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia/50 group-hover:bg-fuchsia transition-colors" />
                  Hands On (Metodologias Agiles)
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="group flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia/50 group-hover:bg-fuchsia transition-colors" />
                  Desarrollo de Productos
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Navegacion */}
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-cyan/80">
              Navegacion
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/" className="group flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan/50 group-hover:bg-cyan transition-colors" />
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="group flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan/50 group-hover:bg-cyan transition-colors" />
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="group flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan/50 group-hover:bg-cyan transition-colors" />
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/eventos" className="group flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan/50 group-hover:bg-cyan transition-colors" />
                  Eventos
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="group flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan/50 group-hover:bg-cyan transition-colors" />
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-fuchsia/80">
              Contacto
            </h4>
            <p className="text-sm text-white/60 leading-relaxed">
              Tenes un desafio en mente?<br />
              Nos encantaria escucharlo.
            </p>
            {isContactPage ? (
              <button 
                onClick={scrollToTop}
                className="premium-cta-btn w-fit !py-3 !px-6 !text-sm"
              >
                Escribinos
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            ) : (
              <Link 
                to="/contacto"
                className="premium-cta-btn w-fit !py-3 !px-6 !text-sm"
              >
                Escribinos
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            )}
          </div>

        </div>

        {/* ZONA INFERIOR: Copyright & Credits */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <p className="text-xs text-white/40 text-center md:text-left">
            {new Date().getFullYear()} NETI. Contenido bajo{" "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-fuchsia underline underline-offset-2 transition-colors"
            >
              CC BY 4.0
            </a>
          </p>

          <a
            href="https://agustincervello.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/40 hover:text-cyan transition-colors"
          >
            Disenado por Agus
          </a>

        </div>
      </div>
    </footer>
  );
}