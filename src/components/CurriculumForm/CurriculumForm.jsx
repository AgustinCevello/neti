// src/components/CurriculumForm/CurriculumForm.jsx
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { enviarContacto } from '../../services/sheets';
import {
  CHAR_SETS,
  CV_RULES,
  filterChars,
  formatCooldown,
  getFormMountTime,
  getHoneypotProps,
  recordAttempt,
  runSecurityChecks,
  sanitizeFormData,
  validateForm,
} from '../../utils/formHelpers';

// ── Toast de éxito ────────────────────────────────────────────────────────────
function SuccessToast({ nombre, mensaje = '¡Perfil recibido!' }) {
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
          {mensaje}
        </p>
        <p style={{ margin: '3px 0 0', fontSize: '0.775rem', color: '#6B5F80', lineHeight: 1.45 }}>
          Gracias <strong style={{ color: '#251B37' }}>{nombre.split(' ')[0]}</strong>, lo estaremos revisando.
        </p>
      </div>
    </div>
  );
}

// ── Clases de input ───────────────────────────────────────────────────────────
const BASE = 'w-full font-sans text-sm text-[#251B37] bg-[#faf9fc] border-2 rounded-xl px-4 py-3 outline-none transition-all duration-200 placeholder-[#C4BAD4]';

function inputClass(status) {
  if (status === 'error')   return `${BASE} border-red-400 shadow-[0_0_0_3px_rgba(248,113,113,0.10)]`;
  if (status === 'valid')   return `${BASE} border-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.10)]`;
  if (status === 'focused') return `${BASE} border-[#251B37] shadow-[0_0_0_3px_rgba(37,27,55,0.08)]`;
  return `${BASE} border-[#E6E2EE]`;
}

// ── Field wrapper ─────────────────────────────────────────────────────────────
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

// ── Componente Principal Exportado ────────────────────────────────────────────
export default function CurriculumForm({ onSuccess }) {
  const [form,     setForm]     = useState({ nombre: '', linkedin: '', aceptaLegales: false });
  const [touched,  setTouched]  = useState({});
  const [focused,  setFocused]  = useState('');
  const [loading,  setLoading]  = useState(false);
  const [secError, setSecError] = useState('');

  // Seguridad
  const honeypotRef = useRef(null);
  const mountTime   = useRef(getFormMountTime());

  const apply = (name, value) => setForm(prev => ({ ...prev, [name]: value }));

  const errors = validateForm(form, CV_RULES);

  const getStatus = (name) => {
    if (focused === name) return 'focused';
    if (!touched[name]) return 'idle';
    return errors[name] ? 'error' : 'valid';
  };

  const handleBlur = (name) => {
    setFocused('');
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const makeTextHandlers = (name, maxLen, charSetKey) => ({
    value   : form[name],
    onFocus : () => setFocused(name),
    onBlur  : () => handleBlur(name),
    onKeyDown: (e) => { if (e.key.length > 1) return; if (!CHAR_SETS[charSetKey]?.has(e.key)) e.preventDefault(); },
    onChange : (e) => apply(name, filterChars(e.target.value, charSetKey, maxLen)),
    onPaste  : (e) => {
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData).getData('text');
      const room = maxLen - form[name].length;
      if (room <= 0) return;
      apply(name, form[name] + filterChars(pasted, charSetKey, room));
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setSecError('');

    setTouched({ nombre: true, linkedin: true, aceptaLegales: true });
    if (Object.keys(errors).length > 0) return;

    // ── Comprobaciones de seguridad ─────────────────
    const sec = runSecurityChecks({ honeypotRef, mountTime: mountTime.current });
    if (!sec.ok) {
      if (sec.reason === 'rateLimit') {
        setSecError(`Demasiados intentos. Por favor, esperá ${formatCooldown(sec.remainingMs)}.`);
      } else {
        // Honeypot / tooFast — simular éxito silenciosamente
        apply('nombre', ''); apply('linkedin', ''); apply('aceptaLegales', false);
        setTouched({});
        if (onSuccess) onSuccess();
      }
      return;
    }

    setLoading(true);
    try {
      await enviarContacto(sanitizeFormData({ ...form, tipo: 'Curriculum' }));
      recordAttempt();
      toast.custom(() => <SuccessToast nombre={form.nombre} />, { duration: 5000, position: 'top-right' });
      setForm({ nombre: '', linkedin: '', aceptaLegales: false });
      setTouched({});
      if (onSuccess) onSuccess();
    } finally {
      setLoading(false);
    }
  };

  const honeypotProps = getHoneypotProps();

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 bg-[#faf9fc] p-5 rounded-2xl border-2 border-[#E6E2EE] mt-3">

      {/* Campo Honeypot — invisible para humanos */}
      <input ref={honeypotRef} type="text" {...honeypotProps} />

      <Field label="Nombre completo" required error={errors.nombre} status={getStatus('nombre')}>
        <input type="text" placeholder="¿Cómo te llamás?"
          className={inputClass(getStatus('nombre'))}
          {...makeTextHandlers('nombre', 80, 'nombre')}
          disabled={loading}
        />
      </Field>

      <Field label="Link de LinkedIn" required error={errors.linkedin} status={getStatus('linkedin')}>
        <input type="text" placeholder="linkedin.com/in/tu-perfil"
          className={inputClass(getStatus('linkedin'))}
          {...makeTextHandlers('linkedin', 200, 'url')}
          disabled={loading}
        />
      </Field>

      {/* Checkbox legal */}
      <div className="flex flex-col gap-1 mt-1">
        <label className="flex items-start gap-2.5 cursor-pointer group">
          <div
            className="relative flex shrink-0 items-center justify-center w-[18px] h-[18px] mt-[1px] rounded border-2 transition-colors duration-200"
            style={{
              borderColor: form.aceptaLegales ? '#EC4E8D' : (touched.aceptaLegales && errors.aceptaLegales ? '#f87171' : '#C4BAD4'),
              background: form.aceptaLegales ? '#EC4E8D' : 'transparent',
            }}
          >
            <input
              type="checkbox" name="aceptaLegales"
              className="absolute opacity-0 w-full h-full cursor-pointer"
              checked={form.aceptaLegales}
              disabled={loading}
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

      {/* Mensaje de rate limit */}
      {secError && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="font-sans text-xs text-amber-700">{secError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full relative text-white font-sans font-bold text-sm uppercase tracking-widest py-3 rounded-xl overflow-hidden transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
        style={{ background: 'linear-gradient(135deg, #1a1030 60%, #2d1a4a)' }}
      >
        <span className="absolute top-0 right-0 w-20 h-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(236,78,141,0.55), transparent 70%)' }}
        />
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? 'Enviando...' : 'Enviar Perfil'}
        </span>
      </button>
    </form>
  );
}