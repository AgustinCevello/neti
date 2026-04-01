import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { enviarContacto } from '../../services/sheets';

// ── Whitelists & Constants ────────────────────────────────────────────────────
const LC = 'abcdefghijklmnopqrstuvwxyz';
const UC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ACCENTS = 'áéíóúÁÉÍÓÚüÜñÑ';
const DIGITS = '0123456789';
const PUNCT = ` .,;:!?¡¿()'"- `;
const EMAIL_CHARS = LC + UC + DIGITS + '@.-_+';
const TEL_CHARS = DIGITS + '+-() ';
const URL_CHARS = LC + UC + DIGITS + '/:.-_?=&#%+@';

const NOMBRE_SET = new Set([...LC, ...UC, ...ACCENTS, ' ', '-', "'"].flat());
const TEXTO_SET = new Set([...LC, ...UC, ...ACCENTS, ...DIGITS, ...PUNCT]);
const EMAIL_SET = new Set([...EMAIL_CHARS]);
const TEL_SET = new Set([...TEL_CHARS]);
const URL_SET = new Set([...URL_CHARS]);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Validación Principal ──────────────────────────────────────────────────────
function validar({ nombre, email, telefono, linkedin, mensaje, aceptaLegales }) {
  const errors = {};
  if (!nombre.trim()) errors.nombre = 'El nombre es requerido';
  else if (nombre.length > 80) errors.nombre = 'Máximo 80 caracteres';
  if (!email.trim()) errors.email = 'El email es requerido';
  else if (!emailRegex.test(email)) errors.email = 'Ingresá un correo válido';
  if (telefono && telefono.length < 6) errors.telefono = 'Número demasiado corto';
  else if (telefono && telefono.length > 20) errors.telefono = 'Máximo 20 caracteres';
  if (linkedin && !linkedin.includes('linkedin.com')) errors.linkedin = 'Debe ser un link válido';
  else if (linkedin && linkedin.length > 200) errors.linkedin = 'URL demasiado larga';
  if (!mensaje.trim()) errors.mensaje = 'El mensaje es requerido';
  else if (mensaje.length < 10) errors.mensaje = 'Mínimo 10 caracteres';
  else if (mensaje.length > 500) errors.mensaje = 'Máximo 500 caracteres';
  if (!aceptaLegales) errors.aceptaLegales = 'Debes aceptar las políticas para continuar';
  return errors;
}

// ── Componentes UI Internos ───────────────────────────────────────────────────
function SuccessToast({ nombre, mensaje = "¡Mensaje recibido!" }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '12px',
      background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(20px) saturate(180%)',
      borderRadius: '16px', padding: '14px 16px', border: '1px solid rgba(255,255,255,0.6)',
      boxShadow: '0 8px 32px rgba(20,13,40,0.15), 0 0 0 1px rgba(0,0,0,0.04), 3px 0 0 0 #EC4E8D inset',
      minWidth: '280px', maxWidth: '340px', fontFamily: 'IBM Plex Sans, system-ui, sans-serif',
    }}>
      <div style={{
        width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
        background: 'linear-gradient(135deg, #EC4E8D, #a855f7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(236,78,141,0.4)',
      }}>
        <svg fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24" width="18" height="18"><polyline points="20 6 9 17 4 12" /></svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: '0.875rem', color: '#251B37', lineHeight: 1.3 }}>{mensaje}</p>
        <p style={{ margin: '3px 0 0', fontSize: '0.775rem', color: '#6B5F80', lineHeight: 1.45 }}>
          Gracias <strong style={{ color: '#251B37' }}>{nombre.split(' ')[0]}</strong>, te respondemos a la brevedad.
        </p>
      </div>
    </div>
  );
}

const BASE_INPUT = 'w-full font-sans text-sm text-[#251B37] bg-[#faf9fc] border-2 rounded-xl px-4 py-3 outline-none transition-all duration-200 placeholder-[#C4BAD4]';
function inputClass(status) {
  if (status === 'error')   return `${BASE_INPUT} border-red-400 shadow-[0_0_0_3px_rgba(248,113,113,0.10)]`;
  if (status === 'valid')   return `${BASE_INPUT} border-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.10)]`;
  if (status === 'focused') return `${BASE_INPUT} border-[#251B37] shadow-[0_0_0_3px_rgba(37,27,55,0.08)]`;
  return `${BASE_INPUT} border-[#E6E2EE]`;
}

function Field({ label, required, hint, error, status, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-col gap-0.5">
        <label className="font-sans text-[11px] font-bold uppercase tracking-widest text-[#6B5F80]">
          {label}{required && <span className="text-[#EC4E8D] ml-1">*</span>}
        </label>
        {hint && <p className="font-sans text-xs text-[#9B8FB0]">{hint}</p>}
      </div>
      {children}
      {status === 'error' && error && (
        <p className="font-sans text-xs text-red-400 flex items-center gap-1.5">
          <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// ── Formulario Principal ──────────────────────────────────────────────────────
function ContactoForm({ onSuccess }) {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', linkedin: '', mensaje: '', aceptaLegales: false });
  const [touched, setTouched] = useState({});
  const [focused, setFocused] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const apply = (name, value) => setForm(prev => ({ ...prev, [name]: value }));

  const getStatus = (name) => {
    if (focused === name) return 'focused';
    if (!touched[name]) return 'idle';
    const errs = validar(form);
    const isOptional = ['telefono', 'linkedin'].includes(name);
    if (isOptional && !form[name].trim()) return 'idle';
    return errs[name] ? 'error' : 'valid';
  };

  const handleBlur = (name) => {
    setFocused('');
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const makeTextHandlers = (name, maxLen, charSet) => ({
    value: form[name],
    onFocus: () => setFocused(name),
    onBlur: () => handleBlur(name),
    onKeyDown: (e) => { if (e.key.length > 1) return; if (!charSet.has(e.key)) e.preventDefault(); },
    onChange: (e) => apply(name, e.target.value.split('').filter(ch => charSet.has(ch)).join('').slice(0, maxLen)),
    onPaste: (e) => {
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData).getData('text');
      const room = maxLen - form[name].length;
      if (room <= 0) return;
      apply(name, form[name] + pasted.split('').filter(ch => charSet.has(ch)).join('').slice(0, room));
    },
  });

  const emailHandlers = {
    value: form.email,
    onFocus: () => setFocused('email'),
    onBlur: () => handleBlur('email'),
    onKeyDown: (e) => {
      if (e.key.length > 1) return;
      if (!EMAIL_SET.has(e.key)) { e.preventDefault(); return; }
      if (e.key === '@' && form.email.includes('@')) { e.preventDefault(); return; }
      if (e.key === '.' && form.email.slice(-1) === '.') { e.preventDefault(); return; }
    },
    onChange: (e) => {
      let v = e.target.value.split('').filter(ch => EMAIL_SET.has(ch)).join('').slice(0, 100);
      if ((v.match(/@/g) || []).length > 1) {
        const i = v.indexOf('@');
        v = v.slice(0, i + 1) + v.slice(i + 1).replace(/@/g, '');
      }
      apply('email', v.replace(/\.{2,}/g, '.'));
    },
    onPaste: (e) => {
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData).getData('text');
      apply('email', (form.email + pasted).split('').filter(ch => EMAIL_SET.has(ch)).join('').slice(0, 100));
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setTouched({ nombre: true, email: true, telefono: true, linkedin: true, mensaje: true, aceptaLegales: true });
    const errs = validar(form);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      await enviarContacto({ ...form, tipo: 'Contacto General' });
      setSubmitted(true);
      toast.custom(() => <SuccessToast nombre={form.nombre} />, { duration: 5000, position: 'top-right' });
      setTimeout(() => onSuccess?.(), 1500);
    } finally {
      setLoading(false);
    }
  };

  const errors = validar(form);

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-10 gap-4">
        <div className="w-16 h-16 rounded-full bg-[#EC4E8D] flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h3 className="font-sans font-bold text-[#251B37] text-xl">¡Gracias por escribirnos!</h3>
        <p className="font-sans text-[#85789A] text-sm">Te respondemos a la brevedad.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nombre completo" required error={errors.nombre} status={getStatus('nombre')}>
          <div className="relative">
            <input type="text" placeholder="¿Cómo te llamás?" className={inputClass(getStatus('nombre'))} {...makeTextHandlers('nombre', 80, NOMBRE_SET)} />
            {form.nombre.length > 50 && (
              <span className="absolute right-3 bottom-3 font-sans text-[11px] pointer-events-none" style={{ color: form.nombre.length / 80 > 0.85 ? '#EC4E8D' : '#C4BAD4' }}>
                {form.nombre.length}/80
              </span>
            )}
          </div>
        </Field>
        <Field label="Email" required error={errors.email} status={getStatus('email')}>
          <input type="email" placeholder="nombre@empresa.com" className={inputClass(getStatus('email'))} {...emailHandlers} />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Teléfono" hint="Opcional — con código de país" error={errors.telefono} status={getStatus('telefono')}>
          <input type="text" placeholder="+54 11 1234 5678" className={inputClass(getStatus('telefono'))} {...makeTextHandlers('telefono', 20, TEL_SET)} />
        </Field>
        <Field label="LinkedIn" hint="Opcional — tu perfil o el de tu empresa" error={errors.linkedin} status={getStatus('linkedin')}>
          <input type="text" placeholder="linkedin.com/in/tu-perfil" className={inputClass(getStatus('linkedin'))} {...makeTextHandlers('linkedin', 200, URL_SET)} />
        </Field>
      </div>

      <Field label="¿En qué podemos ayudarte?" required error={errors.mensaje} status={getStatus('mensaje')}>
        <div className="relative">
          <textarea
            placeholder="Contanos sobre tu proyecto, necesidad o consulta..." rows={5}
            className={`${inputClass(getStatus('mensaje'))} min-h-[120px] resize-y`}
            value={form.mensaje} onFocus={() => setFocused('mensaje')} onBlur={() => handleBlur('mensaje')}
            onKeyDown={(e) => { if (e.key.length > 1) return; if (!TEXTO_SET.has(e.key)) e.preventDefault(); }}
            onChange={(e) => apply('mensaje', e.target.value.split('').filter(ch => TEXTO_SET.has(ch)).join('').slice(0, 500))}
            onPaste={(e) => {
              e.preventDefault();
              const pasted = (e.clipboardData || window.clipboardData).getData('text');
              const room = 500 - form.mensaje.length;
              if (room <= 0) return;
              apply('mensaje', form.mensaje + pasted.split('').filter(ch => TEXTO_SET.has(ch)).join('').slice(0, room));
            }}
          />
          {form.mensaje.length > 0 && (
            <span className="absolute right-3 bottom-3 font-sans text-[11px] pointer-events-none" style={{ color: form.mensaje.length / 500 > 0.85 ? '#EC4E8D' : '#C4BAD4' }}>
              {form.mensaje.length}/500
            </span>
          )}
        </div>
      </Field>

      <div className="flex flex-col gap-1 mt-1">
        <label className="flex items-start gap-2.5 cursor-pointer group">
          <div className="relative flex shrink-0 items-center justify-center w-[18px] h-[18px] mt-[1px] rounded border-2 transition-colors duration-200"
            style={{ 
              borderColor: form.aceptaLegales ? '#EC4E8D' : (touched.aceptaLegales && errors.aceptaLegales ? '#f87171' : '#C4BAD4'),
              background: form.aceptaLegales ? '#EC4E8D' : 'transparent'
            }}>
            <input 
              type="checkbox" 
              name="aceptaLegales"
              className="absolute opacity-0 w-full h-full cursor-pointer"
              checked={form.aceptaLegales}
              onChange={(e) => {
                apply('aceptaLegales', e.target.checked);
                setTouched(prev => ({ ...prev, aceptaLegales: true }));
              }}
            />
            {form.aceptaLegales && (
              <svg className="w-3.5 h-3.5 text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="font-sans text-[12px] leading-[18px] text-[#6B5F80] select-none">
            He leído y acepto la{' '}
            <Link to="/politica-de-privacidad" target="_blank" className="font-semibold text-[#EC4E8D] underline hover:opacity-70 transition-opacity">
              Política de Privacidad
            </Link> y los{' '}
            <Link to="/terminos-y-condiciones" target="_blank" className="font-semibold text-[#EC4E8D] underline hover:opacity-70 transition-opacity">
              Términos y Condiciones
            </Link>.
          </span>
        </label>
        {touched.aceptaLegales && errors.aceptaLegales && (
          <p className="font-sans text-[10px] text-red-400 pl-[26px]">{errors.aceptaLegales}</p>
        )}
      </div>

      <div>
        <button
          type="submit" disabled={loading}
          className="relative text-white font-sans font-bold text-sm uppercase tracking-widest px-10 py-3.5 rounded-xl overflow-hidden transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #1a1030 60%, #2d1a4a)', boxShadow: '0 4px 20px rgba(236,78,141,0.2)' }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(236,78,141,0.35)'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(236,78,141,0.2)'; }}
        >
          <span className="absolute top-0 right-0 w-20 h-full pointer-events-none" style={{ background: 'radial-gradient(ellipse at top right, rgba(236,78,141,0.55), transparent 70%)' }} />
          <span className="relative z-10 flex items-center gap-2">
            {loading ? 'Enviando...' : (
              <>Enviar mensaje <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg></>
            )}
          </span>
        </button>
      </div>
      <p className="font-sans text-[11px] text-[#C4BAD4]">Los campos marcados con <span className="text-[#EC4E8D]">*</span> son obligatorios</p>
    </form>
  );
}

// ── Modal Principal ────────────────────────────────────────────────────────────
export default function ContactoModal({ onClose }) {
  // Ref para trackear si el mousedown empezó en el backdrop
  const mouseDownOnBackdrop = useRef(false);

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

    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    
    return () => {
      const sy = parseInt(body.dataset.scrollY || '0', 10);
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      body.style.overflow = '';
      html.style.overflow = '';
      window.scrollTo(0, sy);
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const handleBackdropMouseDown = (e) => {
    // Solo marcar como "started on backdrop" si el mousedown fue directamente sobre él
    mouseDownOnBackdrop.current = e.target === e.currentTarget;
  };

  const handleBackdropMouseUp = (e) => {
    // Cerrar solo si tanto el inicio como el fin del click ocurrieron en el backdrop
    if (mouseDownOnBackdrop.current && e.target === e.currentTarget) {
      onClose();
    }
    mouseDownOnBackdrop.current = false;
  };

  return (
    <>
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(20,13,40,0.6)', backdropFilter: 'blur(6px)' }}
        onMouseDown={handleBackdropMouseDown}
        onMouseUp={handleBackdropMouseUp}
      >
        <div
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
          style={{ animation: 'modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards' }}
          // Evitar que los eventos del modal burbujeen al backdrop
          onMouseDown={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full border-2 border-[#E6E2EE] text-[#85789A] hover:border-[#EC4E8D] hover:text-[#EC4E8D] transition-all duration-200" aria-label="Cerrar">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
          <div className="sticky top-0 z-10 px-8 pt-8 pb-4 bg-white">
            <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-widest" style={{ WebkitTextStroke: '2px #EC4E8D', color: 'transparent' }}>
              Contacto
            </h2>
            <p className="font-sans text-[#85789A] text-sm mt-1">Completá el formulario y nos ponemos en contacto a la brevedad.</p>
          </div>
          <div className="mx-8 h-px bg-gradient-to-r from-transparent via-[#EC4E8D] to-transparent opacity-30 mb-6" />
          <div className="px-8 pb-8">
            <ContactoForm onSuccess={onClose} />
          </div>
        </div>
      </div>
    </>
  );
}