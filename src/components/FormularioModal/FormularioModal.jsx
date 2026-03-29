import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

// ── Validación ────────────────────────────────────────────────────────────────
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const soloNumeros = /^[0-9]+$/;

function validarCampo(name, value, form = {}) {
  switch (name) {
    case 'tipo':
      return !value ? 'Seleccioná una opción para continuar' : '';
    case 'nombre':
      if (!value.trim()) return 'Tu nombre es requerido';
      if (![...value].every(ch => isNombreChar(ch))) return 'Solo letras';
      if (value.length > 80) return 'Máximo 80 caracteres';
      return '';
    case 'busco':
      return !value ? 'Seleccioná qué estás buscando' : '';
    case 'email':
      if (!value.trim()) return 'El correo es requerido';
      if (!emailRegex.test(value)) return 'Ingresá un correo válido (ej: nombre@empresa.com)';
      return '';
    case 'participantes':
      if (value && !soloNumeros.test(value)) return 'Solo números';
      if (value && parseInt(value) > 100000) return 'Número demasiado alto';
      return '';
    case 'descripcion':
      // Si eligió "Otro...", este campo pasa a ser estrictamente obligatorio
      if (form.busco === 'otro' && (!value || !value.trim())) return 'Por favor, detallá qué estás buscando';
      if (value && value.length > 600) return 'Máximo 600 caracteres';
      return '';
    case 'motivacion':
      if (value && value.length > 600) return 'Máximo 600 caracteres';
      return '';
    default:
      return '';
  }
}

function validarTodo(form) {
  const errors = {};
  Object.keys(form).forEach(name => {
    const err = validarCampo(name, form[name], form);
    if (err) errors[name] = err;
  });
  return errors;
}

// ── Config por taller ─────────────────────────────────────────────────────────
const config = {
  liderazgo: {
    titulo: 'Taller de Liderazgo Disruptivo',
    color: '#EC4E8D',
    colorLight: 'rgba(236,78,141,0.08)',
    buscoOpciones: [
      { value: 'inside_out', label: 'Inside Out – Outside In' },
      { value: 'otro', label: 'Otro...' },
    ],
    descripcionLabel: 'Contanos tu necesidad / Requerimiento',
    descripcionPlaceholder: 'Describí con tus palabras qué tenés en mente...',
  },
  hands_on: {
    titulo: 'Talleres Hands On con Metodologías Ágiles',
    color: '#7C3AED',
    colorLight: 'rgba(124,58,237,0.08)',
    buscoOpciones: [
      { value: 'sprint_estrategia', label: 'Sprint de Estrategia de Innovación' },
      { value: 'hackatones', label: 'Hackatones Maker' },
      { value: 'netiatones', label: 'Netiatones Híbridos' },
      { value: 'sprint_descubrimiento', label: 'Sprint de Descubrimiento de Productos / Servicios' },
      { value: 'otro', label: 'Otro...' },
    ],
    descripcionLabel: 'Contanos qué metodología estás buscando',
    descripcionPlaceholder: 'Describí la metodología o enfoque que tenés en mente...',
  },
  desarrollo: {
    titulo: 'Desarrollo de Productos y Servicios',
    color: '#00A8B8',
    colorLight: 'rgba(0,168,184,0.08)',
    buscoOpciones: [
      { value: 'inside_out', label: 'Inside Out – Outside In' },
      { value: 'maker_uo', label: 'Maker UO' },
      { value: 'otro', label: 'Otro...' },
    ],
    descripcionLabel: 'Contanos qué metodología estás buscando',
    descripcionPlaceholder: 'Describí la metodología o enfoque que tenés en mente...',
  },
};

// ── Radio personalizado ───────────────────────────────────────────────────────
function RadioOption({ name, value, label, checked, onSelect, onDeselect, color, colorLight }) {
  return (
    <label
      className="flex items-center gap-3 cursor-pointer select-none px-4 py-3 rounded-xl border-2 transition-all duration-200"
      style={{ borderColor: checked ? color : '#E6E2EE', background: checked ? colorLight : 'transparent' }}
    >
      <input
        type="radio" name={name} value={value} checked={checked}
        onChange={() => {}}
        onClick={(e) => {
          if (checked) { e.preventDefault(); onDeselect && onDeselect(); }
          else { onSelect && onSelect(); }
        }}
        className="hidden"
      />
      <span
        className="shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200"
        style={{ borderColor: checked ? color : '#C4BAD4' }}
      >
        {checked && <span className="w-2 h-2 rounded-full block" style={{ background: color }} />}
      </span>
      <span className="font-sans text-sm font-medium leading-snug" style={{ color: checked ? '#251B37' : '#6B5F80' }}>
        {label}
      </span>
    </label>
  );
}

// ── Field wrapper ─────────────────────────────────────────────────────────────
function Field({ label, hint, required, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-0.5">
        <label className="font-sans text-[11px] font-bold uppercase tracking-widest text-[#6B5F80]">
          {label}{required && <span className="text-[#EC4E8D] ml-1">*</span>}
        </label>
        {hint && <p className="font-sans text-xs text-[#9B8FB0]">{hint}</p>}
      </div>
      {children}
      {error && (
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

// ── Input clases ──────────────────────────────────────────────────────────────
const BASE = 'w-full font-sans text-sm text-[#251B37] bg-[#faf9fc] border-2 rounded-xl px-4 py-3 outline-none transition-all duration-200 placeholder-[#C4BAD4]';
function inputClass(state) {
  if (state === 'valid')   return `${BASE} border-[#00C9B1] shadow-[0_0_0_3px_rgba(0,201,177,0.10)]`;
  if (state === 'invalid') return `${BASE} border-red-400 shadow-[0_0_0_3px_rgba(248,113,113,0.10)]`;
  return `${BASE} border-[#E6E2EE]`;
}

function SectionDivider({ label }) {
  return (
    <div className="flex items-center gap-3 pt-1">
      <div className="h-px flex-1 bg-[#E6E2EE]" />
      <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#C4BAD4]">{label}</span>
      <div className="h-px flex-1 bg-[#E6E2EE]" />
    </div>
  );
}

function CharCount({ current, max }) {
  return (
    <span className="font-sans text-[11px] pointer-events-none" style={{ color: current / max > 0.85 ? '#EC4E8D' : '#C4BAD4' }}>
      {current}/{max}
    </span>
  );
}

// ── Whitelists ────────────────────────────────────────────────────────────────
const LC      = 'abcdefghijklmnopqrstuvwxyz';
const UC      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ACCENTS = 'áéíóúÁÉÍÓÚüÜñÑ';
const DIGITS  = '0123456789';
const PUNCT   = ` .,;:!?¡¿()'"- `;
const EMAIL_CHARS = LC + UC + DIGITS + '@.-_+';

const makeSet = (str) => new Set([...str]);
const NOMBRE_SET = makeSet(LC + UC + ACCENTS + ' ');
const TEXTO_SET  = makeSet(LC + UC + ACCENTS + DIGITS + PUNCT);
const EMAIL_SET  = makeSet(EMAIL_CHARS);

const isNombreChar = (ch) => NOMBRE_SET.has(ch);
const isTextoChar  = (ch) => TEXTO_SET.has(ch);
const isEmailChar  = (ch) => EMAIL_SET.has(ch);

const NOMBRE_ALLOWED = { test: (ch) => isNombreChar(ch) };
const TEXTO_ALLOWED  = { test: (ch) => isTextoChar(ch) };
const EMAIL_ALLOWED  = { test: (ch) => isEmailChar(ch) };

// ── Toast personalizado ───────────────────────────────────────────────────────
function SuccessToast({ nombre, email, color }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderRadius: '16px',
      padding: '14px 16px',
      border: '1px solid rgba(255,255,255,0.6)',
      boxShadow: `0 8px 32px rgba(20,13,40,0.15), 0 0 0 1px rgba(0,0,0,0.04), 0 -1px 0 0 rgba(255,255,255,0.8) inset, 3px 0 0 0 ${color} inset`,
      minWidth: '280px',
      maxWidth: '340px',
      fontFamily: 'var(--font-sans, system-ui, sans-serif)',
    }}>
      <div style={{
        width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
        background: `linear-gradient(135deg, ${color}, #a855f7)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 4px 12px ${color}44`,
      }}>
        <svg fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24" width="18" height="18">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: '0.875rem', color: '#251B37', lineHeight: 1.3 }}>
          ¡Consulta enviada!
        </p>
        <p style={{ margin: '3px 0 0', fontSize: '0.775rem', color: '#6B5F80', lineHeight: 1.45 }}>
          Gracias <strong style={{ color: '#251B37' }}>{nombre.split(' ')[0]}</strong>, te escribimos a{' '}
          <span style={{ color, fontWeight: 600, wordBreak: 'break-all' }}>{email}</span>
        </p>
      </div>
    </div>
  );
}

// ── Formulario interno ────────────────────────────────────────────────────────
function FormContent({ taller, onClose }) {
  const cfg = config[taller];

  const [form, setForm] = useState({
    tipo: '', nombre: '', busco: '', descripcion: '',
    experiencia: '', participantes: '', email: '', motivacion: '',
    aceptaLegales: false,
  });
  const [touched, setTouched] = useState({});
  const [blurred,  setBlurred]  = useState({});
  const [errors,   setErrors]   = useState({});

  const getState = (name) => {
    if (!touched[name]) return '';
    if (errors[name]) return 'invalid';
    const requeridos = ['tipo', 'nombre', 'busco', 'email', 'aceptaLegales'];
    // Validamos dinámicamente si seleccionó otro
    if (form.busco === 'otro') requeridos.push('descripcion');

    if (requeridos.includes(name) && !form[name]) return '';
    return form[name] ? 'valid' : '';
  };

  const getEmailError = () => {
    if (!touched.email) return null;
    if (!form.email.trim()) return errors.email;
    if (!blurred.email) return null;
    return errors.email || null;
  };

  const applyField = (name, next) => {
    setForm(prev => {
      const updated = { ...prev, [name]: next };
      // Limpiar descripción si cambia la opción a algo que no sea "otro"
      if (name === 'busco' && next !== 'otro') updated.descripcion = '';
      
      // Actualizamos errores validando con el nuevo estado completo de form
      setErrors(prevErrs => ({
        ...prevErrs,
        [name]: validarCampo(name, next, updated),
        // Validamos la descripción en tiempo real si el usuario juega con el radio "busco"
        ...(name === 'busco' ? { descripcion: validarCampo('descripcion', updated.descripcion, updated) } : {})
      }));
      
      return updated;
    });
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handle = (e) => {
    const { name, value } = e.target;
    if (name === 'participantes' && value !== '' && !/^[0-9]*$/.test(value)) return;
    applyField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setBlurred(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validarCampo(name, value, form) }));
  };

  const handleNombreKeyDown = (e) => { if (e.key.length > 1) return; if (!NOMBRE_ALLOWED.test(e.key)) e.preventDefault(); };
  const handleNombreChange  = (e) => {
    applyField('nombre', e.target.value.split('').filter(ch => NOMBRE_ALLOWED.test(ch)).join('').slice(0, 80));
  };
  const handleNombrePaste = (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData('text');
    const room = 80 - form.nombre.length;
    if (room <= 0) return;
    applyField('nombre', form.nombre + pasted.split('').filter(ch => NOMBRE_ALLOWED.test(ch)).join('').slice(0, room));
  };

  const makeHandlers = (fieldName, maxLen) => ({
    onKeyDown: (e) => { if (e.key.length > 1) return; if (!TEXTO_ALLOWED.test(e.key)) e.preventDefault(); },
    onChange:  (e) => {
      applyField(fieldName, e.target.value.split('').filter(ch => TEXTO_ALLOWED.test(ch)).join('').slice(0, maxLen));
    },
    onPaste: (e) => {
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData).getData('text');
      const room = maxLen - form[fieldName].length;
      if (room <= 0) return;
      applyField(fieldName, form[fieldName] + pasted.split('').filter(ch => TEXTO_ALLOWED.test(ch)).join('').slice(0, room));
    },
  });

  const handleEmailKeyDown = (e) => {
    if (e.key.length > 1) return;
    if (!EMAIL_ALLOWED.test(e.key)) { e.preventDefault(); return; }
    if (e.key === '@' && form.email.includes('@'))     { e.preventDefault(); return; }
    if (e.key === '.' && form.email.slice(-1) === '.') { e.preventDefault(); return; }
    if ((e.key === '@' || e.key === '.') && form.email.length === 0) { e.preventDefault(); return; }
  };
  const handleEmailChange = (e) => {
    applyField('email', e.target.value.split('').filter(ch => EMAIL_ALLOWED.test(ch)).join('').slice(0, 100));
  };
  const handleEmailPaste = (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData('text');
    const room = 100 - form.email.length;
    if (room <= 0) return;
    let next = form.email + pasted.split('').filter(ch => EMAIL_ALLOWED.test(ch)).join('').slice(0, room);
    if ((next.match(/@/g) || []).length > 1) {
      const i = next.indexOf('@');
      next = next.slice(0, i + 1) + next.slice(i + 1).replace(/@/g, '');
    }
    next = next.replace(/\.{2,}/g, '.').replace(/^[@.]+/, '');
    applyField('email', next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    setBlurred(allTouched);
    
    const errs = validarTodo(form);
    
    // VALIDACIÓN DEL CHECKBOX: Si no está marcado, agregamos el error
    if (!form.aceptaLegales) {
      errs.aceptaLegales = 'Debes aceptar la Política de Privacidad y Términos';
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const { nombre, email } = form;
    const color = cfg.color;

    // 1. Cerrar el modal primero (libera el body: fixed)
    onClose();

    // 2. Lanzar el toast cuando el body ya está libre
    setTimeout(() => {
      toast.custom(
        () => <SuccessToast nombre={nombre} email={email} color={color} />,
        { duration: 5000, position: 'top-right' }
      );
    }, 400);
  };

  // Cálculo de progreso dinámico 
  const requiredFields = ['tipo', 'nombre', 'busco', 'email', 'aceptaLegales'];
  if (form.busco === 'otro') requiredFields.push('descripcion');

  const completed = requiredFields.filter(f => form[f] && !errors[f]).length;
  const progress  = (completed / requiredFields.length) * 100;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

      {/* Progreso */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#C4BAD4]">Completado</span>
          <span className="font-sans text-[10px] font-bold text-[#C4BAD4]">{completed}/{requiredFields.length}</span>
        </div>
        <div className="h-1 bg-[#F0EBF8] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${cfg.color}, #a855f7)` }} />
        </div>
      </div>

      {/* Badge taller */}
      <div className="text-xs font-sans font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-2"
        style={{ background: cfg.colorLight, color: cfg.color }}>
        <span className="w-1.5 h-1.5 rounded-full inline-block shrink-0" style={{ background: cfg.color }} />
        {cfg.titulo}
      </div>

      <SectionDivider label="Sobre vos" />

      <Field label="¿Representás a una empresa o consultás a título personal?" required error={touched.tipo && errors.tipo}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
          {[
            { value: 'individual', label: 'Soy un individuo / freelance' },
            { value: 'empresa',    label: 'Represento a una empresa u organización' },
          ].map(op => (
            <RadioOption key={op.value} name="tipo" value={op.value} label={op.label}
              checked={form.tipo === op.value} onSelect={() => applyField("tipo", op.value)} onDeselect={() => applyField("tipo", "")}
              color="#16a34a" colorLight="rgba(22,163,74,0.08)" />
          ))}
        </div>
      </Field>

      <Field label="Nombre completo" required error={touched.nombre && errors.nombre}>
        <div className="relative">
          <input type="text" name="nombre" value={form.nombre}
            onChange={handleNombreChange} onBlur={handleBlur}
            onKeyDown={handleNombreKeyDown} onPaste={handleNombrePaste}
            placeholder="¿Cómo te llamás?" className={inputClass(getState('nombre'))} />
          {form.nombre.length > 40 && (
            <span className="absolute right-3 bottom-3 pointer-events-none">
              <CharCount current={form.nombre.length} max={80} />
            </span>
          )}
        </div>
      </Field>

      <SectionDivider label="Lo que buscás" />

      <Field label="¿Qué tipo de servicio te interesa?" required error={touched.busco && errors.busco}>
        <div className="flex flex-col gap-2 pt-0.5">
          {cfg.buscoOpciones.map(op => (
            <RadioOption key={op.value} name="busco" value={op.value} label={op.label}
              checked={form.busco === op.value} onSelect={() => applyField("busco", op.value)} onDeselect={() => applyField("busco", "")}
              color="#16a34a" colorLight="rgba(22,163,74,0.08)" />
          ))}
        </div>
      </Field>

      {form.busco === 'otro' && (
        <Field 
          label={cfg.descripcionLabel} 
          required 
          error={touched.descripcion && errors.descripcion}
          hint="Detallá qué estás buscando para poder ayudarte mejor"
        >
          <div className="relative">
            <textarea name="descripcion" value={form.descripcion} onBlur={handleBlur}
              {...makeHandlers('descripcion', 600)} placeholder={cfg.descripcionPlaceholder} rows={3}
              className={`${inputClass(getState('descripcion'))} min-h-[110px] resize-y`} />
            {form.descripcion.length > 0 && (
              <span className="absolute right-3 bottom-3 pointer-events-none">
                <CharCount current={form.descripcion.length} max={600} />
              </span>
            )}
          </div>
        </Field>
      )}

      <SectionDivider label="Contexto" />

      <Field label="¿Tu área o equipo tiene experiencia previa en innovación?" hint="Nos ayuda a calibrar el nivel del taller">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-0.5">
          {[
            { value: 'si',   label: 'Sí, tenemos experiencia' },
            { value: 'algo', label: 'Algo, estamos empezando' },
            { value: 'no',   label: 'No, es territorio nuevo' },
          ].map(op => (
            <RadioOption key={op.value} name="experiencia" value={op.value} label={op.label}
              checked={form.experiencia === op.value} onSelect={() => applyField("experiencia", op.value)} onDeselect={() => applyField("experiencia", "")}
              color="#16a34a" colorLight="rgba(22,163,74,0.08)" />
          ))}
        </div>
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Cantidad de participantes estimada" hint="Opcional" error={touched.participantes && errors.participantes}>
          <input type="text" name="participantes" value={form.participantes}
            onChange={handle} onBlur={handleBlur}
            placeholder="Ej: 20" maxLength={6}
            className={inputClass(getState('participantes'))} />
        </Field>

        <Field label="Correo electrónico" required error={getEmailError()} hint="Te contactaremos por acá">
          <input type="email" name="email" value={form.email}
            onChange={handleEmailChange} onBlur={handleBlur}
            onKeyDown={handleEmailKeyDown} onPaste={handleEmailPaste}
            placeholder="nombre@empresa.com"
            className={inputClass(getState('email'))} />
        </Field>
      </div>

      <Field label="¿Por qué creés que tu organización necesita esta capacitación?" hint="Opcional — mientras más contexto, mejor podemos ayudarte">
        <div className="relative">
          <textarea name="motivacion" value={form.motivacion} onBlur={handleBlur}
            {...makeHandlers('motivacion', 600)}
            placeholder="Contanos un poco sobre tu equipo, el desafío que enfrentan o lo que esperan lograr..." rows={5}
            className={`${inputClass(getState('motivacion'))} min-h-[120px]`} />
          {form.motivacion.length > 0 && (
            <span className="absolute right-3 bottom-3 pointer-events-none">
              <CharCount current={form.motivacion.length} max={600} />
            </span>
          )}
        </div>
      </Field>

      {/* ─── INICIO DEL CHECKBOX LEGAL ALINEADO PERFECTO ─── */}
      <div className="flex flex-col gap-1 mt-2">
        <label className="flex items-start gap-2.5 cursor-pointer group">
          
          {/* Caja del Checkbox */}
          <div className="relative flex items-center justify-center shrink-0 w-[18px] h-[18px] rounded border-2 transition-colors duration-200"
            style={{ 
              borderColor: form.aceptaLegales ? cfg.color : (touched.aceptaLegales && errors.aceptaLegales ? '#f87171' : '#C4BAD4'),
              background: form.aceptaLegales ? cfg.color : 'transparent'
            }}>
            <input 
              type="checkbox" 
              name="aceptaLegales"
              className="absolute opacity-0 w-full h-full cursor-pointer m-0 p-0"
              checked={form.aceptaLegales}
              onChange={(e) => {
                const checked = e.target.checked;
                setForm(prev => ({ ...prev, aceptaLegales: checked }));
                setTouched(prev => ({ ...prev, aceptaLegales: true }));
                if (checked) setErrors(prev => ({ ...prev, aceptaLegales: null }));
              }}
            />
            {form.aceptaLegales && (
              <svg className="w-3.5 h-3.5 text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>

          {/* Texto Legal */}
          <span className="font-sans text-[11.5px] leading-[18px] text-[#6B5F80] select-none flex-1">
            He leído y acepto la{' '}
            <Link to="/politica-de-privacidad" target="_blank" className="font-semibold underline hover:opacity-70 transition-opacity" style={{ color: cfg.color }}>
              Política de Privacidad
            </Link> y los{' '}
            <Link to="/terminos-y-condiciones" target="_blank" className="font-semibold underline hover:opacity-70 transition-opacity" style={{ color: cfg.color }}>
              Términos y Condiciones
            </Link>.
          </span>

        </label>
        
        {/* Mensaje de error */}
        {touched.aceptaLegales && errors.aceptaLegales && (
          <p className="font-sans text-[10px] text-red-400 pl-[28px] m-0">{errors.aceptaLegales}</p>
        )}
      </div>
      {/* ─── FIN DEL CHECKBOX LEGAL ─── */}

      {/* Botón enviar */}
      <div className="flex justify-center pt-2 pb-1">
        <button type="submit"
          className="relative text-white font-sans font-bold text-sm uppercase tracking-widest px-10 py-3.5 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98]"
          style={{ background: `linear-gradient(135deg, #1a1030 60%, #2d1a4a)`, boxShadow: `0 4px 20px ${cfg.color}33` }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 28px ${cfg.color}55`; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 4px 20px ${cfg.color}33`; }}>
          <span className="absolute top-0 right-0 w-20 h-full pointer-events-none"
            style={{ background: `radial-gradient(ellipse at top right, ${cfg.color}88, transparent 70%)` }} />
          <span className="relative z-10 flex items-center gap-2">
            Enviar consulta
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>

      <p className="text-center font-sans text-[11px] text-[#C4BAD4]">
        Los campos marcados con <span className="text-[#EC4E8D]">*</span> son obligatorios
      </p>
    </form>
  );
}

// ── Modal principal ───────────────────────────────────────────────────────────
export default function FormularioModal({ taller, onClose }) {
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

  const cfg = config[taller] || config.liderazgo;

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
        className="relative w-full max-w-[600px] flex flex-col rounded-2xl overflow-hidden bg-white"
        style={{
          maxHeight: '92vh',
          boxShadow: '0 32px 80px rgba(20,13,40,0.35), 0 0 0 1px rgba(255,255,255,0.06)',
          animation: 'fm-in 0.38s cubic-bezier(0.34,1.48,0.64,1)',
        }}
      >
        {/* Header */}
        <div className="relative flex-shrink-0 px-6 pt-7 pb-5 overflow-hidden">
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, #EAE5F5 0%, #F7DDE9 50%, #DAEEF5 100%)` }} />
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full pointer-events-none"
            style={{ background: `${cfg.color}22`, filter: 'blur(20px)' }} />
          <div className="absolute -bottom-4 left-10 w-24 h-24 rounded-full pointer-events-none"
            style={{ background: '#a855f722', filter: 'blur(16px)' }} />
          <div className="relative z-10 pr-10">
            <h1 className="font-sans font-extrabold text-xl text-[#251B37] mb-1.5 leading-tight">
              ¡Vamos a construir algo juntos!
            </h1>
            <p className="font-sans text-xs text-[#6B5F80] leading-relaxed">
              Completá este formulario y nos pondremos en contacto para armar la propuesta ideal para tu equipo.
            </p>
          </div>
          <button onClick={onClose} aria-label="Cerrar"
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-[#6B5F80] transition-all duration-200 hover:text-[#251B37] hover:scale-110 hover:bg-white/80">
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-6"
          style={{ scrollbarWidth: 'thin', scrollbarColor: `${cfg.color}44 transparent` }}>
          <FormContent taller={taller} onClose={onClose} />
        </div>
      </div>

      <style>{`
        @keyframes fm-in {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}