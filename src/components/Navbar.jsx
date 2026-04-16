import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logoFuchsia from '../assets/images/icons/logo_neti_fuchsia.webp';
import logoBlack from '../assets/images/icons/logo_neti_black.webp';

const NavUnderline = ({ isActive }) => (
  <div
    className={`absolute left-0 w-full pointer-events-none transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}
    style={{ bottom: '2px' }}
  >
    <div className="relative">
      <div className="h-[3px] w-full rounded-full bg-[#ec4e8d]" />
      <div className="absolute top-[2px] left-[6%] flex gap-[3px]">
        <div className="w-[4px] h-[7px] bg-[#ec4e8d] rounded-b-full" />
        <div className="w-[4px] h-[7px] bg-[#ec4e8d] rounded-b-full" />
      </div>
    </div>
  </div>
);

const HamburgerIcon = ({ isOpen, duration = 500 }) => (
  <svg
    strokeWidth={2.5}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 32 32"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-7 h-7 transition-transform ease-in-out"
    style={{
      transitionDuration: `${duration}ms`,
      transform: isOpen ? 'rotate(-45deg)' : 'rotate(0deg)',
    }}
  >
    <path
      style={{
        transitionDuration: `${duration}ms`,
        strokeDasharray: isOpen ? '20 300' : '12 63',
        strokeDashoffset: isOpen ? '-32.42px' : '0px',
        transition: `stroke-dasharray ${duration}ms ease-in-out, stroke-dashoffset ${duration}ms ease-in-out`,
      }}
      d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
    />
    <path d="M7 16 27 16" />
  </svg>
);

const navLinks = [
  { name: 'Inicio', path: '/' },
  { name: 'Nosotros', path: '/nosotros' },
  { name: 'Liderazgo Disruptivo', path: '/liderazgo-disruptivo' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Eventos', path: '/eventos' },
  { name: 'Contacto', path: '/contacto' },
];

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isOpen, setIsOpen] = useState(false);

  // Bloquear scroll -” compatible iOS Safari
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isOpen) {
      const scrollY = window.scrollY;
      // Guardamos el scroll en un data attribute para recuperarlo al cerrar
      body.dataset.scrollY = String(scrollY);
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
    } else {
      const scrollY = parseInt(body.dataset.scrollY || '0', 10);
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflow = '';
      html.style.overflow = '';
      window.scrollTo(0, scrollY);
    }

    return () => {
      const scrollY = parseInt(body.dataset.scrollY || '0', 10);
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflow = '';
      html.style.overflow = '';
      if (scrollY) window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Cerrar al cambiar de ruta
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* â”€â”€ BARRA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <header className="sticky top-0 z-50 transition-colors duration-300 bg-white/65 backdrop-blur-[18px] backdrop-saturate-[180%] border-b border-white/30 shadow-[0_2px_16px_rgba(103,88,155,0.07)]">
        <div className="w-full px-6 lg:px-16">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <Link to="/" className="group flex items-center">
              <img
                src={isHome ? logoFuchsia : logoBlack}
                alt="NETI"
                className="h-10 w-auto block group-hover:hidden"
              />
              <img
                src={logoFuchsia}
                alt="NETI"
                className="h-10 w-auto hidden group-hover:block"
              />
            </Link>

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative group font-medium text-base transition-colors duration-200 py-2 ${isActive ? 'text-[#EC4E8D]' : 'text-black'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      <NavUnderline isActive={isActive} />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Botón hamburguesa */}
            <button
              onClick={() => setIsOpen(o => !o)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              className="md:hidden text-[#251B37] hover:text-[#EC4E8D] transition-colors duration-200 focus:outline-none z-[60] relative min-w-[44px] min-h-[44px] flex items-center justify-center p-2"
            >
              <HamburgerIcon isOpen={isOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* â”€â”€ OVERLAY FULLSCREEN MOBILE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        id="mobile-menu"
        aria-hidden={!isOpen}
        className="fixed inset-0 z-40 md:hidden flex flex-col transition-all duration-500"
        style={{
          background: isOpen ? 'rgba(103,88,155,0.18)' : 'rgba(103,88,155,0)',
          backdropFilter: isOpen ? 'blur(28px) saturate(160%)' : 'blur(0px)',
          WebkitBackdropFilter: isOpen ? 'blur(28px) saturate(160%)' : 'blur(0px)',
          pointerEvents: isOpen ? 'auto' : 'none',
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
        }}
        onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}
      >
        <div
          className="mx-4 mt-24 rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(240,230,255,0.72)',
            backdropFilter: 'blur(32px) saturate(200%)',
            WebkitBackdropFilter: 'blur(32px) saturate(200%)',
            border: '1px solid rgba(255,255,255,0.5)',
            boxShadow: '0 8px 40px rgba(103,88,155,0.18)',
            transform: isOpen ? 'translateY(0)' : 'translateY(-24px)',
            transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          {navLinks.map((link, i) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-7 py-5 text-xl font-semibold transition-colors duration-150 ${isActive
                  ? 'text-[#EC4E8D] bg-white/30'
                  : 'text-[#251B37] hover:bg-white/20'
                } ${i < navLinks.length - 1 ? 'border-b border-white/40' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#EC4E8D] shrink-0" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
