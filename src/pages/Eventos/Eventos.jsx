import { useRef, useState, useMemo, useEffect } from 'react';
import FadeIn from '../../components/FadeIn';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { enviarInscripcionEvento } from '../../services/sheets';
import { useSheetData } from '../../hooks/useSheetData';

import heroImg      from '../../assets/images/pictures/Eventosherosection.webp';
import separadorImg from '../../assets/images/pictures/separadoreventossection.webp';
import mapaInspirar from '../../assets/images/pictures/MapaDeAccionInspirar.webp';
import mara         from '../../assets/images/pictures/EmpleadoMara.webp';
import esteban      from '../../assets/images/pictures/EmpleadoEsteban3.webp';
import maraP        from '../../assets/images/pictures/EmpleadoMaraProvenzano.webp';
import euge         from '../../assets/images/pictures/EmpleadoEuge.webp';
import juani        from '../../assets/images/pictures/EmpleadoJuani.webp';
import dreamLogo        from '../../assets/images/empresas/dream.webp';
import globantLogo      from '../../assets/images/empresas/globant.webp';
import mercedesLogo     from '../../assets/images/empresas/mercedes.webp';
import nanotecnologiaLogo from '../../assets/images/empresas/nanotecnologia.webp';
import telefonicaLogo   from '../../assets/images/empresas/telefonica.webp';
import FondoCuadricula from '../../assets/images/pictures/FondoCuadricula.png';
const noSelect = {
  WebkitUserSelect: 'none', MozUserSelect: 'none',
  msUserSelect: 'none', userSelect: 'none',
  WebkitUserDrag: 'none', pointerEvents: 'none',
};

const infoCards = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    label: '¿Qué?',
    text: 'Un espacio de innovación, co-creación y aprendizaje. Combinamos workshops, fórums y actividades prácticas para transformar ideas en soluciones reales.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    label: '¿Cuándo?',
    text: 'Fecha inicio y final. Es un único día, las horas que abarca.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    label: '¿Dónde?',
    text: 'Si tiene parte presencial, híbrido o "nos encontraremos por zoom/meet/spatialchat/topia", va acá.',
  },
];

const oradores = [
  { name: 'Mara Provenzano',      role: 'Cofundadora',               img: mara,    bio: 'Mara Provenzano is a Social Communicator graduated from Universidad de Buenos Aires, but her career was forged with an imperfect combination of a bit of everything.' },
  { name: 'Esteban Bonomi',       role: 'Cofundador',                img: esteban, bio: 'Esteban Bonomi is a Social Communicator graduated from Universidad de Buenos Aires, but his career was forged with an imperfect combination of a bit of everything.' },
  { name: 'Mara Provenzano',      role: 'Diseñadora',                img: maraP,   bio: 'Mara Provenzano is a Social Communicator graduated from Universidad de Buenos Aires, but her career was forged with an imperfect combination of a bit of everything.' },
  { name: 'Euge Abratti',         role: 'Diseñadora de experiencia', img: euge,    bio: 'Euge is a Social Communicator graduated from Universidad de Buenos Aires, but her career was forged with an imperfect combination of a bit of everything.' },
  { name: 'Juan Ignacio Franchi', role: 'Diseñador UX/UI',           img: juani,   bio: 'Juani Franchi is a Social Communicator graduated from Universidad de Buenos Aires, but his career was forged with an imperfect combination of a bit of everything.' },
];

const organizadores = [dreamLogo, globantLogo, mercedesLogo, nanotecnologiaLogo, telefonicaLogo];

const MESES_ES       = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const MESES_ES_UPPER = MESES_ES.map(m => m.toUpperCase());

function extraerMes(fecha) {
  if (!fecha) return null;
  const str = String(fecha);

  const isoMatch = str.match(/^\d{4}-(\d{2})-\d{2}/);
  if (isoMatch) return MESES_ES_UPPER[parseInt(isoMatch[1], 10) - 1] ?? null;

  const lower = str.toLowerCase();
  for (let i = 0; i < MESES_ES.length; i++) {
    if (lower.includes(MESES_ES[i])) return MESES_ES_UPPER[i];
  }

  const slashMatch = str.match(/\d{1,2}\/(\d{1,2})\/\d{4}/);
  if (slashMatch) return MESES_ES_UPPER[parseInt(slashMatch[1], 10) - 1] ?? null;

  return null;
}

function formatearFecha(fechaIso) {
  if (!fechaIso) return '';
  const str = String(fechaIso);
  if (!str.includes('T')) return str;
  try {
    const [datePart, timePart] = str.split('T');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');
    return `${Number(day)}/${Number(month)}/${year} ${Number(hour)}:${minute}`;
  } catch {
    return str;
  }
}

function generarLinkGoogleCalendar(item) {
  const title = encodeURIComponent(item['Nombre del Evento'] || 'Evento NETI');
  const details = encodeURIComponent(item['Descripción'] || item['Notas'] || '');
  
  let datesQuery = '';
  const fechaStr = String(item['Fecha'] || '');
  
  if (fechaStr.includes('T')) {
    try {
      const [datePart, timePart] = fechaStr.split('T');
      const [year, month, day] = datePart.split('-');
      const [hourStr, minStr] = timePart.split(':');
      
      const ms = Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hourStr), Number(minStr));
      
      const startStr = new Date(ms).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      const endStr = new Date(ms + 2 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      
      datesQuery = `&dates=${startStr}/${endStr}`;
    } catch { /* fecha inválida, se omite el rango */ }
  }
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}${datesQuery}`;
}

const emailRegex  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LC          = 'abcdefghijklmnopqrstuvwxyz';
const UC          = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ACCENTS     = '\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00fc\u00dc\u00f1\u00d1';
const EMAIL_CHARS = LC + UC + '0123456789@.-_+';
const NOMBRE_SET  = new Set([...LC, ...UC, ...ACCENTS, ' ', '-', "'"]);
const EMAIL_SET   = new Set([...EMAIL_CHARS]);
const isNombreChar = ch => NOMBRE_SET.has(ch);
const isEmailChar  = ch => EMAIL_SET.has(ch);

function validateForm({ nombre, apellido, email, aceptaLegales }) {
  const errors = {};
  if (!nombre.trim())            errors.nombre        = 'El nombre es requerido';
  else if (nombre.length > 30)   errors.nombre        = 'Máximo 30 caracteres';
  if (!apellido.trim())          errors.apellido      = 'El apellido es requerido';
  else if (apellido.length > 30) errors.apellido      = 'Máximo 30 caracteres';
  if (!email.trim())             errors.email         = 'El email es requerido';
  else if (!emailRegex.test(email)) errors.email      = 'Email inválido';
  if (!aceptaLegales)            errors.aceptaLegales = 'Debes aceptar las políticas';
  return errors;
}

function SuccessToast({ nombre, email }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '12px',
      background: 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderRadius: '16px', padding: '14px 16px',
      border: '1px solid rgba(255,255,255,0.6)',
      boxShadow: '0 8px 32px rgba(20,13,40,0.15), 0 0 0 1px rgba(0,0,0,0.04), 3px 0 0 0 #EC4E8D inset',
      minWidth: '280px', maxWidth: '340px',
      fontFamily: 'IBM Plex Sans, system-ui, sans-serif',
    }}>
      <div style={{
        width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
        background: 'linear-gradient(135deg, #EC4E8D, #a855f7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(236,78,141,0.4)',
      }}>
        <svg fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24" width="18" height="18">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: '0.875rem', color: '#251B37', lineHeight: 1.3 }}>
          ¡Inscripción enviada!
        </p>
        <p style={{ margin: '3px 0 0', fontSize: '0.775rem', color: '#6B5F80', lineHeight: 1.45 }}>
          Gracias <strong style={{ color: '#251B37' }}>{nombre}</strong>, te escribimos a{' '}
          <span style={{ color: '#EC4E8D', fontWeight: 600, wordBreak: 'break-all' }}>{email}</span>
        </p>
      </div>
    </div>
  );
}

function InscripcionForm({ evento }) {
  const [form, setForm]           = useState({ nombre: '', apellido: '', email: '', aceptaLegales: false });
  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(false);
  const sendingRef = useRef(false);
  const btnRef     = useRef(null);

  const applyNombre = (name, raw) => {
    const clean = raw.split('').filter(ch => isNombreChar(ch)).join('').slice(0, 30);
    setForm(prev => ({ ...prev, [name]: clean }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const applyEmail = (raw) => {
    let clean = raw.split('').filter(ch => isEmailChar(ch)).join('').slice(0, 100);
    if ((clean.match(/@/g) || []).length > 1) {
      const i = clean.indexOf('@');
      clean = clean.slice(0, i + 1) + clean.slice(i + 1).replace(/@/g, '');
    }
    clean = clean.replace(/\.{2,}/g, '.');
    setForm(prev => ({ ...prev, email: clean }));
    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'nombre' || name === 'apellido') { applyNombre(name, value); return; }
    if (name === 'email') { applyEmail(value); return; }
  };

  const handleKeyDown = (e, type) => {
    if (e.key.length > 1) return;
    if (type === 'nombre' && !isNombreChar(e.key)) { e.preventDefault(); return; }
    if (type === 'email'  && !isEmailChar(e.key))  { e.preventDefault(); return; }
  };

  const handlePaste = (e, type) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData('text');
    if (type === 'nombre' || type === 'apellido') applyNombre(type, form[type] + pasted);
    else if (type === 'email') applyEmail(form.email + pasted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sendingRef.current) return;
    const errs = validateForm(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); btnRef.current?.blur(); return; }

    sendingRef.current = true;
    btnRef.current?.blur();
    const { nombre, email } = form;
    const eventoNombre = evento?.['Nombre del Evento'] || 'Evento NETI';
    await enviarInscripcionEvento({ ...form, evento: eventoNombre });

    setTimeout(() => {
      setSubmitted(true);
      toast.custom(() => <SuccessToast nombre={nombre} email={email} />, {
        duration: 5000, position: 'top-right',
      });
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="text-center py-12"
        style={{ animation: 'thanksFadeIn 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards', opacity: 0 }}>
        <div className="w-16 h-16 rounded-full bg-[#EC4E8D] flex items-center justify-center mx-auto mb-4"
          style={{ animation: 'thanksPop 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.1s forwards', opacity: 0, transform: 'scale(0)' }}>
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-sans font-bold text-[#251B37] text-xl mb-2"
          style={{ animation: 'thanksFadeIn 0.5s ease 0.3s forwards', opacity: 0 }}>
          ¡Gracias por inscribirte!
        </h3>
        <p className="font-sans text-[#85789A] text-sm"
          style={{ animation: 'thanksFadeIn 0.5s ease 0.5s forwards', opacity: 0 }}>
          Te contactaremos pronto con más información.
        </p>
      </div>
    );
  }

  const fields = [
    { id: 'nombre',   label: 'Nombre',   type: 'text',  placeholder: 'Tu nombre',    maxLen: 30,  showCounter: true,  inputType: 'nombre' },
    { id: 'apellido', label: 'Apellido', type: 'text',  placeholder: 'Tu apellido',  maxLen: 30,  showCounter: true,  inputType: 'nombre' },
    { id: 'email',    label: 'E-mail',   type: 'email', placeholder: 'tu@email.com', maxLen: 100, showCounter: false, inputType: 'email'  },
  ];

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {fields.map(({ id, label, type, placeholder, maxLen, showCounter, inputType }) => (
          <div key={id}>
            <label className="block font-sans text-sm font-semibold text-[#251B37] mb-1">{label}</label>
            <input
              type={type} name={id} value={form[id]}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, inputType)}
              onPaste={(e)   => handlePaste(e, inputType)}
              placeholder={placeholder} maxLength={maxLen}
              className={`w-full font-sans text-sm text-[#251B37] border-b-2 py-2 px-0 bg-transparent outline-none transition-colors duration-200 placeholder-[#85789A]/50 ${errors[id] ? 'border-red-400' : 'border-[#E6E2EE] focus:border-[#EC4E8D]'}`}
            />
            <div className="flex justify-between items-start mt-1 min-h-[18px]">
              {errors[id] ? <p className="font-sans text-xs text-red-400">{errors[id]}</p> : <span />}
              {showCounter && form[id].length > 0 && (
                <span className="font-sans text-[11px] text-[#85789A]/50 ml-auto">{form[id].length}/{maxLen}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1 mb-10">
        <label className="flex items-start gap-2.5 cursor-pointer group">
          <div
            className="relative flex shrink-0 items-center justify-center w-[18px] h-[18px] mt-[1px] rounded border-2 transition-colors duration-200"
            style={{
              borderColor: form.aceptaLegales ? '#EC4E8D' : (errors.aceptaLegales ? '#f87171' : '#E6E2EE'),
              background:  form.aceptaLegales ? '#EC4E8D' : 'transparent',
            }}
          >
            <input
              type="checkbox" name="aceptaLegales"
              className="absolute opacity-0 w-full h-full cursor-pointer m-0 p-0"
              checked={form.aceptaLegales}
              onChange={(e) => {
                const checked = e.target.checked;
                setForm(prev => ({ ...prev, aceptaLegales: checked }));
                if (checked) setErrors(prev => ({ ...prev, aceptaLegales: null }));
              }}
            />
            {form.aceptaLegales && (
              <svg className="w-3.5 h-3.5 text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="font-sans text-[12px] leading-[18px] text-[#85789A] select-none flex-1">
            He leído y acepto la{' '}
            <Link to="/politica-de-privacidad" target="_blank" className="font-semibold text-[#EC4E8D] underline hover:opacity-70 transition-opacity">
              Política de Privacidad
            </Link> y los{' '}
            <Link to="/terminos-y-condiciones" target="_blank" className="font-semibold text-[#EC4E8D] underline hover:opacity-70 transition-opacity">
              Términos y Condiciones
            </Link>.
          </span>
        </label>
        {errors.aceptaLegales && (
          <p className="font-sans text-[10px] text-red-400 pl-[26px] m-0">{errors.aceptaLegales}</p>
        )}
      </div>

      <div className="text-center">
        <button ref={btnRef} type="submit" className="uiverse-btn">
          <div className="uiverse-outline" />
          <div className="uiverse-state uiverse-state--default">
            <div className="uiverse-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="1.2em" width="1.2em">
                <g style={{ filter: 'url(#shadow)' }}>
                  <path fill="currentColor" d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z" />
                  <path fill="currentColor" d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z" />
                </g>
                <defs>
                  <filter id="shadow">
                    <feDropShadow floodOpacity="0.6" stdDeviation="0.8" dy="1" dx="0" />
                  </filter>
                </defs>
              </svg>
            </div>
            <p>
              {'Inscribirse'.split('').map((char, i) => (
                <span key={i} style={{ '--i': i }}>{char === ' ' ? '\u00A0' : char}</span>
              ))}
            </p>
          </div>
          <div className="uiverse-state uiverse-state--sent">
            <div className="uiverse-icon">
              <svg stroke="black" strokeWidth="0.5px" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none">
                <g style={{ filter: 'url(#shadow)' }}>
                  <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z" fill="currentColor" />
                  <path d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z" fill="currentColor" />
                </g>
              </svg>
            </div>
            <p>
              {['¡', 'L', 'i', 's', 't', 'o', '!'].map((char, i) => (
                <span key={i} style={{ '--i': i + 5 }}>{char}</span>
              ))}
            </p>
          </div>
        </button>
      </div>
    </form>
  );
}

// ── Modal de Inscripción dinámico ──────────────────────────────────────────────
function ModalInscripcion({ evento, onClose }) {
  const overlayRef = useRef(null);
  const mouseDownTarget = useRef(null);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY;
    body.dataset.scrollY = String(scrollY);
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';
    return () => {
      const sy = parseInt(body.dataset.scrollY || '0', 10);
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      body.style.overflow = '';
      html.style.overflow = '';
      window.scrollTo(0, sy);
    };
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const nombreEvento = evento['Nombre del Evento'] || 'Evento NETI';
  const fechaEvento = formatearFecha(evento['Fecha']);
  const descEvento = evento['Descripción'] || evento['Notas'] || '';
  const extracto = descEvento.length > 120 ? descEvento.slice(0, 120) + '…' : descEvento;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(20,13,40,0.65)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
      onMouseDown={(e) => { mouseDownTarget.current = e.target; }}
      onMouseUp={(e) => {
        if (mouseDownTarget.current === overlayRef.current && e.target === overlayRef.current) onClose();
        mouseDownTarget.current = null;
      }}
    >
      <div
        className="relative w-full max-w-[640px] flex flex-col rounded-2xl overflow-hidden bg-white"
        style={{
          maxHeight: '92vh',
          boxShadow: '0 32px 80px rgba(20,13,40,0.35), 0 0 0 1px rgba(255,255,255,0.06)',
          animation: 'modalIn 0.38s cubic-bezier(0.34,1.48,0.64,1)',
        }}
      >
        {/* Header dinámico con datos del evento */}
        <div className="relative flex-shrink-0 px-6 pt-7 pb-5 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #EAE5F5 0%, #F7DDE9 50%, #DAEEF5 100%)' }} />
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full pointer-events-none"
            style={{ background: 'rgba(236,78,141,0.12)', filter: 'blur(20px)' }} />
          <div className="absolute -bottom-4 left-10 w-24 h-24 rounded-full pointer-events-none"
            style={{ background: 'rgba(168,85,247,0.10)', filter: 'blur(16px)' }} />

          <div className="relative z-10 pr-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block font-sans text-[10px] font-bold text-white bg-[#EC4E8D] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Inscripción
              </span>
              {fechaEvento && (
                <span className="inline-flex items-center gap-1 font-sans text-[10px] font-semibold text-[#6B5F80] bg-white/60 px-2.5 py-0.5 rounded-full">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {fechaEvento}
                </span>
              )}
            </div>
            <h1 className="font-sans font-extrabold text-xl text-[#251B37] mb-1.5 leading-tight">
              {nombreEvento}
            </h1>
            {extracto && (
              <p className="font-sans text-xs text-[#6B5F80] leading-relaxed">
                {extracto}
              </p>
            )}
          </div>

          <button onClick={onClose} aria-label="Cerrar"
            className="absolute top-3 right-3 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#6B5F80] transition-all duration-200 hover:text-[#251B37] hover:scale-110 hover:bg-white/80">
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body con el formulario */}
        <div className="overflow-y-auto flex-1 px-6 py-6"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#EC4E8D44 transparent' }}>
          <InscripcionForm evento={evento} />
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

// ── Botón de inscripción condicional ──────────────────────────────────────────
const INSCRIPCION_BTN_CLASSES = 'flex items-center justify-center gap-2 font-sans text-xs text-white bg-[#EC4E8D] border border-[#EC4E8D] rounded-full px-4 py-2 hover:bg-[#d83876] hover:border-[#d83876] transition-colors whitespace-nowrap cursor-pointer';

function BotonInscripcion({ item, onInscripcion }) {
  const link = item['Link de Inscripción'];
  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={INSCRIPCION_BTN_CLASSES}
      >
        Más info / Unirme
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={() => onInscripcion(item)}
      className={INSCRIPCION_BTN_CLASSES}
    >
      Más info / Unirme
    </button>
  );
}

function SpeakerCard({ speaker, delay }) {
  return (
    <FadeIn delay={delay} className="flex flex-col items-center text-center">
      <img
        src={speaker.img} alt={speaker.name}
        loading="lazy" width={300} height={300}
        className="w-36 h-36 md:w-48 md:h-48 object-contain mb-4"
        style={noSelect} draggable={false}
      />
      <span className="font-sans text-xs font-bold text-[#EC4E8D] uppercase tracking-widest mb-1">{speaker.role}</span>
      <h3 className="font-sans font-bold text-[#251B37] text-sm md:text-base mb-2">{speaker.name}</h3>
      <p className="font-sans text-xs md:text-sm text-[#85789A] leading-relaxed max-w-[160px]">{speaker.bio}</p>
    </FadeIn>
  );
}

function ActividadSkeleton() {
  return (
    <div className="snap-start shrink-0 w-56 border-2 border-[#E6E2EE] rounded-2xl p-5 flex flex-col gap-3 animate-pulse">
      <div className="h-3 bg-[#E6E2EE] rounded w-2/3" />
      <div className="h-3 bg-[#E6E2EE] rounded w-full" />
      <div className="h-3 bg-[#E6E2EE] rounded w-4/5" />
    </div>
  );
}

function AgendaItemSkeleton() {
  return (
    <div className="grid md:grid-cols-[200px_1fr_auto] gap-4 items-center py-5 border-b border-[#E6E2EE] animate-pulse">
      <div className="space-y-2">
        <div className="h-5 bg-[#E6E2EE] rounded-full w-24" />
        <div className="h-3 bg-[#E6E2EE] rounded w-32" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-[#E6E2EE] rounded w-3/4" />
        <div className="h-3 bg-[#E6E2EE] rounded w-full" />
      </div>
      <div className="h-8 bg-[#E6E2EE] rounded-full w-40" />
    </div>
  );
}

function NotasRender({ text }) {
  if (!text) return null;
  const items = String(text).split(';').map(s => s.trim()).filter(Boolean);
  
  if (items.length === 0) return null;
  
  return (
    <ul className="flex flex-col gap-1.5 mt-2">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-2">
          <span className="shrink-0 mt-[6px] w-[5px] h-[5px] rounded-full bg-[#EC4E8D]" />
          <span className="font-sans text-xs text-[#85789A] leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Eventos() {
  const [activeTab, setActiveTab]             = useState('');
  const [search,    setSearch]                = useState('');
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  const actividadesRef = useRef(null);
  const scrollActividades = (dir) => {
    actividadesRef.current?.scrollBy({ left: dir * 240, behavior: 'smooth' });
  };

  const { data: cronogramaRaw, loading: cronogramaLoading } = useSheetData('✏️ Cronograma Eventos');

  const cronogramaVisible = useMemo(() => {
    return cronogramaRaw.filter(item => {
      const estado = String(item['Estado'] || '').trim().toLowerCase();
      return estado !== 'inactivo' && estado !== 'false' && estado !== 'no';
    });
  }, [cronogramaRaw]);

  // Actividades = todos los eventos visibles, sin filtrar por tipo
  const actividadesItems = cronogramaVisible;

  const meses = useMemo(() => {
    const seen = new Set();
    const result = [];
    cronogramaVisible.forEach(item => {
      const mes = extraerMes(item['Fecha']);
      if (mes && !seen.has(mes)) { seen.add(mes); result.push(mes); }
    });
    return result;
  }, [cronogramaVisible]);

  const currentTab = activeTab || (meses.length > 0 ? meses[0] : '');

  const agendaFiltrada = useMemo(() => {
    return cronogramaVisible.filter(item => {
      const mes         = extraerMes(item['Fecha']);
      const matchMes    = !currentTab || mes === currentTab;
      const q           = search.toLowerCase();
      const matchSearch = !q ||
        (item['Nombre del Evento'] || '').toLowerCase().includes(q) ||
        (item['Descripción']       || '').toLowerCase().includes(q) ||
        (item['Tipo de Evento']    || '').toLowerCase().includes(q);
      return matchMes && matchSearch;
    });
  }, [cronogramaVisible, currentTab, search]);

  return (
    <div className="bg-white overflow-x-hidden">

      {/* HERO */}
      <section className="relative w-full overflow-hidden">
        <img src={heroImg} alt="Evento NETI" width={1920} height={600} className="w-full h-auto block" style={noSelect} draggable={false} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(37,27,55,0.85) 0%, rgba(37,27,55,0.2) 60%, transparent 100%)' }} />
        <div className="absolute bottom-6 md:bottom-10 left-4 md:left-16 right-4 md:right-auto">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-none"
            style={{ WebkitTextStroke: '1.5px #ffffff', color: 'white' }}>
            Slogan del evento
          </h1>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="py-14 px-4 md:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {infoCards.map((card, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full border-2 border-[#EC4E8D] flex items-center justify-center text-[#EC4E8D] mb-4">
                  {card.icon}
                </div>
                <h2 className="font-sans font-bold text-[#251B37] text-lg mb-2">{card.label}</h2>
                <p className="font-sans text-sm text-[#85789A] leading-relaxed">{card.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SEPARADOR */}
      <div className="w-full">
        <img src={separadorImg} alt="Separador" loading="lazy" width={1920} height={200} className="w-full object-cover max-h-48" style={noSelect} draggable={false} />
      </div>

      {/* PROPUESTA DE VALOR */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <img src={mapaInspirar} alt="Inspirar" loading="lazy" width={800} height={600} className="w-full object-contain" style={noSelect} draggable={false} />
          </FadeIn>
          <FadeIn delay={100}>
            <p className="font-sans font-bold text-[#251B37] text-xl md:text-2xl leading-relaxed mb-6">
              Propuesta de valor. Describir en un párrafo el objetivo del evento, mostrar lo que va a enganchar a la gente. Usar palabras clave.
            </p>
            <p className="font-sans text-[#85789A] leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ACTIVIDADES */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase mb-10" style={{ color: '#35112F' }}>
              Actividades
            </h2>
          </FadeIn>

          <div
            ref={actividadesRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none' }}
          >
            {cronogramaLoading && [...Array(5)].map((_, i) => <ActividadSkeleton key={i} />)}

            {!cronogramaLoading && actividadesItems.length === 0 && (
              <p className="font-sans text-sm text-[#85789A] py-4">
                No hay actividades programadas por el momento.
              </p>
            )}

            {!cronogramaLoading && actividadesItems.map((item, i) => (
              <div
                key={i}
                className="snap-start shrink-0 w-56 border-2 border-[#EC4E8D] rounded-2xl p-5 flex flex-col gap-2"
                style={{ boxShadow: '0 0 12px rgba(236,78,141,0.08)' }}
              >
                <span className="font-sans text-xs font-bold text-[#EC4E8D] uppercase tracking-widest">
                  {item['Tipo de Evento'] || 'Actividad'}
                </span>
                <h3 className="font-sans font-bold text-[#251B37] text-sm leading-tight">
                  {item['Nombre del Evento'] || ''}
                </h3>
                <p className="font-sans text-xs text-[#85789A]">
                  {formatearFecha(item['Fecha']) || '—'}
                </p>
                <div className="flex-1 overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)', maxHeight: '60px' }}>
                  <NotasRender text={item['Descripción'] || item['Notas'] || ''} />
                </div>
                <BotonInscripcion item={item} onInscripcion={setEventoSeleccionado} />
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => scrollActividades(-1)}
              aria-label="Anterior"
              className="w-9 h-9 rounded-full border-2 border-[#EC4E8D] text-[#EC4E8D] flex items-center justify-center hover:bg-[#EC4E8D] hover:text-white transition-colors"
            >
              <svg viewBox="0 0 12 12" className="w-4 h-4">
                <path d="M7.354 2.146a.5.5 0 0 0-.708 0L3.146 5.646a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L4.207 6l3.147-3.146a.5.5 0 0 0 0-.708z" fill="currentColor" />
              </svg>
            </button>
            <button
              onClick={() => scrollActividades(1)}
              aria-label="Siguiente"
              className="w-9 h-9 rounded-full border-2 border-[#EC4E8D] text-[#EC4E8D] flex items-center justify-center hover:bg-[#EC4E8D] hover:text-white transition-colors"
            >
              <svg viewBox="0 0 12 12" className="w-4 h-4">
                <path d="M4.646 2.146a.5.5 0 0 0 0 .708L7.793 6 4.646 9.146a.5.5 0 1 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ORADORES */}
      <section 
        className="py-16 px-4 md:px-8 bg-fixed bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${FondoCuadricula})` }}
      >
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase mb-14" style={{ color: '#35112F' }}>
              Oradores
            </h2>
          </FadeIn>
          <div className="hidden md:flex flex-row flex-nowrap overflow-x-auto gap-10 pb-4 justify-center" style={{ scrollbarWidth: 'none' }}>
            {oradores.map((s, i) => <SpeakerCard key={i} speaker={s} delay={i * 80} />)}
          </div>
          <div className="grid grid-cols-2 gap-8 md:hidden">
            {oradores.map((s, i) => <SpeakerCard key={i} speaker={s} delay={i * 80} />)}
          </div>
        </div>
      </section>

      {/* AGENDA */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <FadeIn>
              <h2 className="font-display text-4xl md:text-5xl font-black uppercase" style={{ color: '#35112F' }}>
                Agenda
              </h2>
            </FadeIn>
            <div className="flex items-center border border-[#E6E2EE] rounded-full px-4 py-2 gap-2">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar evento"
                className="font-sans text-sm text-[#251B37] bg-transparent outline-none w-36 placeholder-[#85789A]/60"
              />
              <svg className="w-4 h-4 text-[#85789A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
          </div>

          {(meses.length > 0 || cronogramaLoading) && (
            <div className="flex gap-6 mb-8 border-b border-[#E6E2EE]">
              {cronogramaLoading
                ? ['', '', ''].map((_, i) => (
                    <div key={i} className="h-4 w-16 bg-[#E6E2EE] rounded animate-pulse mb-3" />
                  ))
                : meses.map(mes => (
                    <button
                      key={mes}
                      onClick={() => setActiveTab(mes)}
                      className={`font-sans font-bold text-sm pb-3 border-b-2 transition-colors duration-200 ${
                        currentTab === mes
                          ? 'border-[#EC4E8D] text-[#EC4E8D]'
                          : 'border-transparent text-[#85789A] hover:text-[#251B37]'
                      }`}
                    >
                      {mes}
                    </button>
                  ))
              }
            </div>
          )}

          <div className="space-y-0">
            {cronogramaLoading && [...Array(4)].map((_, i) => <AgendaItemSkeleton key={i} />)}

            {!cronogramaLoading && agendaFiltrada.length === 0 && (
              <p className="font-sans text-sm text-[#85789A] py-8 text-center">
                {search ? 'No se encontraron eventos para tu búsqueda.' : 'No hay eventos en este período.'}
              </p>
            )}

            {!cronogramaLoading && agendaFiltrada.map((item, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="grid md:grid-cols-[200px_1fr_auto] gap-4 items-center py-5 border-b border-[#E6E2EE]">
                  <div>
                    <span className="inline-block font-sans text-xs font-bold text-white bg-[#EC4E8D] px-3 py-1 rounded-full mb-2">
                      {item['Tipo de Evento'] || 'Evento'}
                    </span>
                    <p className="font-sans text-xs text-[#85789A]">{formatearFecha(item['Fecha']) || '—'}</p>
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-[#251B37] text-sm mb-1">
                      {item['Nombre del Evento'] || ''}
                    </h3>
                    <NotasRender text={item['Descripción'] || item['Notas'] || ''} />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0 items-start">
                    <a
                      href={generarLinkGoogleCalendar(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-sans text-xs text-[#251B37] border border-[#E6E2EE] rounded-full px-4 py-2 hover:border-[#EC4E8D] hover:text-[#EC4E8D] transition-colors whitespace-nowrap"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      Agregar al calendario
                    </a>
                    <BotonInscripcion item={item} onInscripcion={setEventoSeleccionado} />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ORGANIZADORES */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase mb-12" style={{ color: '#35112F' }}>
              Organizadores
            </h2>
          </FadeIn>
          <FadeIn delay={80}>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
              {organizadores.map((logo, i) => (
                <img key={i} src={logo} alt={`Organizador ${i + 1}`}
                  loading="lazy" width={200} height={100}
                  className="h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                  style={noSelect} draggable={false} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* MODAL DE INSCRIPCIÓN DINÁMICO */}
      {eventoSeleccionado !== null && (
        <ModalInscripcion
          evento={eventoSeleccionado}
          onClose={() => setEventoSeleccionado(null)}
        />
      )}

      <style>{`
        @keyframes thanksFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes thanksPop    { from { opacity: 0; transform: scale(0); }        to { opacity: 1; transform: scale(1); } }
      `}</style>

    </div>
  );
}