import { useState, useEffect, useRef } from 'react';

// ── Validación ────────────────────────────────────────────────────────────────
const soloTexto = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s.,;:()\-']+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const soloNumeros = /^[0-9]+$/;

function validar(form) {
  const errors = {};
  if (!form.quien) errors.quien = 'Requerido';
  if (!form.nombre.trim()) errors.nombre = 'Requerido';
  else if (!soloTexto.test(form.nombre)) errors.nombre = 'Solo letras y puntuación básica';
  else if (form.nombre.length > 80) errors.nombre = 'Máximo 80 caracteres';
  if (!form.busco) errors.busco = 'Requerido';
  if (!form.email.trim()) errors.email = 'Requerido';
  else if (!emailRegex.test(form.email)) errors.email = 'Email inválido';
  if (form.participantes && !soloNumeros.test(form.participantes)) errors.participantes = 'Solo números';
  if (form.descripcion && form.descripcion.length > 600) errors.descripcion = 'Máximo 600 caracteres';
  if (form.motivacion && form.motivacion.length > 600) errors.motivacion = 'Máximo 600 caracteres';
  return errors;
}

// ── Config por taller ─────────────────────────────────────────────────────────
const config = {
  liderazgo: {
    titulo: 'Taller de Liderazgo Disruptivo',
    color: '#EC4E8D',
    buscoOpciones: ['Inside Out - Outside In', 'Otro'],
    descripcionLabel: 'CONTANOS TU NECESIDAD/REQUERIMIENTO',
    descripcionPlaceholder: 'Describí la metodología en mente...',
    showDescripcion: true,
  },
  hands_on: {
    titulo: 'Talleres Hands On con Metodologías Ágiles',
    color: '#7C3AED',
    buscoOpciones: ['Sprint de Estrategia de Innovación', 'Hackatones Maker', 'Netiatones Híbridos', 'Sprint descubrimiento de Productos/Servicio', 'Otro'],
    descripcionLabel: null,
    showDescripcion: false,
  },
  desarrollo: {
    titulo: 'Desarrollo de productos y servicios',
    color: '#00D8ED',
    buscoOpciones: ['Inside Out - Outside In', 'Maker uo', 'Otro'],
    descripcionLabel: 'CONTANOS QUÉ METODOLOGÍA ESTÁS BUSCANDO',
    descripcionPlaceholder: 'Describí la metodología en mente...',
    showDescripcion: true,
  },
};

// ── Radio personalizado ───────────────────────────────────────────────────────
function RadioOption({ name, value, label, checked, onChange, color }) {
  return (
    <label className="flex items-start gap-2 cursor-pointer select-none">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="hidden" />
      <span
        className="shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 transition-colors duration-200"
        style={{ borderColor: checked ? color : '#85789A', background: checked ? color : 'transparent' }}
      />
      <span className="font-sans text-sm text-[#251B37] leading-snug">{label}</span>
    </label>
  );
}

// ── Input estilizado ──────────────────────────────────────────────────────────
function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#251B37]">
        {label}{required && <span className="text-[#EC4E8D] ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="font-sans text-xs text-red-400">{error}</p>}
    </div>
  );
}

const inputClass = (error) =>
  `w-full font-sans text-sm text-[#251B37] bg-[#faf9fc] border rounded-lg px-3.5 py-2.5 outline-none transition-all duration-200 placeholder-[#85789A]/50 ${
    error ? 'border-red-400' : 'border-[#E6E2EE] focus:border-[#EC4E8D] focus:shadow-[0_0_0_3px_rgba(236,78,141,0.08)]'
  }`;

// ── Formulario interno ────────────────────────────────────────────────────────
function FormContent({ taller, onClose }) {
  const cfg = config[taller];
  const [form, setForm] = useState({
    quien: '', nombre: '', busco: '', descripcion: '',
    experiencia: '', participantes: '', email: '', motivacion: '',
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handle = (e) => {
    const { name, value } = e.target;

    // Bloquear no-números en participantes
    if (name === 'participantes' && value !== '' && !/^[0-9]*$/.test(value)) return;

    // Bloquear caracteres inválidos en campos de texto
    if ((name === 'nombre' || name === 'descripcion' || name === 'motivacion') && value !== '') {
      const ultimo = value[value.length - 1];
      if (!/[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s.,;:()\-']/.test(ultimo)) return;
    }

    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validar(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    // TODO: conectar con Google Sheets
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center text-center py-12 gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
          style={{ background: cfg.color }}
        >
          <svg fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24" className="w-8 h-8">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-sans font-bold text-[#251B37] text-xl">¡Gracias por tu interés!</h3>
        <p className="font-sans text-[#85789A] text-sm">Nos pondremos en contacto a la brevedad.</p>
        <button
          onClick={onClose}
          className="mt-2 font-sans font-bold text-white text-sm uppercase tracking-wider px-8 py-3 rounded-lg transition-opacity duration-200 hover:opacity-85"
          style={{ background: cfg.color }}
        >
          Cerrar
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <h2 className="font-sans font-bold text-base" style={{ color: cfg.color }}>{cfg.titulo}</h2>

      {/* ¿Quién sos? */}
      <Field label="¿Quién eres?" required error={errors.quien}>
        <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
          {['Un individual', 'Una Compañía'].map(op => (
            <RadioOption key={op} name="quien" value={op} label={op}
              checked={form.quien === op} onChange={handle} color={cfg.color} />
          ))}
        </div>
      </Field>

      {/* Nombre */}
      <Field label="¿Cuál es tu nombre?" required error={errors.nombre}>
        <div className="relative">
          <input
            type="text" name="nombre" value={form.nombre} onChange={handle}
            placeholder="Nombre completo..." maxLength={80}
            className={inputClass(errors.nombre)}
          />
          {form.nombre.length > 0 && (
            <span className="absolute right-3 bottom-2.5 font-sans text-[11px] text-[#85789A]/50 pointer-events-none">
              {form.nombre.length}/80
            </span>
          )}
        </div>
      </Field>

      {/* Busco */}
      <Field label="Busco..." required error={errors.busco}>
        <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
          {cfg.buscoOpciones.map(op => (
            <RadioOption key={op} name="busco" value={op} label={op}
              checked={form.busco === op} onChange={handle} color={cfg.color} />
          ))}
        </div>
      </Field>

      {/* Descripción condicional */}
      {cfg.showDescripcion && (
        <Field label={cfg.descripcionLabel}>
          <div className="relative">
            <textarea
              name="descripcion" value={form.descripcion} onChange={handle}
              placeholder={cfg.descripcionPlaceholder} maxLength={600} rows={3}
              className={`${inputClass(false)} resize-y min-h-[80px]`}
            />
            {form.descripcion.length > 0 && (
              <span className="absolute right-3 bottom-2.5 font-sans text-[11px] text-[#85789A]/50 pointer-events-none">
                {form.descripcion.length}/600
              </span>
            )}
          </div>
        </Field>
      )}

      {/* Experiencia */}
      <Field label="¿Tu área tiene experiencia de innovación?">
        <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
          {['Sí', 'No', 'Un poco'].map(op => (
            <RadioOption key={op} name="experiencia" value={op} label={op}
              checked={form.experiencia === op} onChange={handle} color={cfg.color} />
          ))}
        </div>
      </Field>

      {/* Participantes + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="¿Con cuántos participantes contás?" error={errors.participantes}>
          <input
            type="text" name="participantes" value={form.participantes} onChange={handle}
            placeholder="Número de participantes" maxLength={6}
            className={inputClass(errors.participantes)}
          />
        </Field>
        <Field label="¿Cuál es tu mail?" required error={errors.email}>
          <input
            type="email" name="email" value={form.email} onChange={handle}
            placeholder="Mail..." maxLength={100}
            className={inputClass(errors.email)}
          />
        </Field>
      </div>

      {/* Motivación */}
      <Field label="¿Por qué pensás que tu organización necesita este tipo de capacitación?">
        <div className="relative">
          <textarea
            name="motivacion" value={form.motivacion} onChange={handle}
            placeholder="Sobre tu proyecto..." maxLength={600} rows={3}
            className={`${inputClass(false)} resize-y min-h-[80px]`}
          />
          {form.motivacion.length > 0 && (
            <span className="absolute right-3 bottom-2.5 font-sans text-[11px] text-[#85789A]/50 pointer-events-none">
              {form.motivacion.length}/600
            </span>
          )}
        </div>
      </Field>

      {/* Botón enviar */}
      <div className="flex justify-center pt-2">
        <button
          type="submit"
          className="relative bg-[#1a1030] text-white font-sans font-bold text-sm uppercase tracking-widest px-10 py-3.5 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(236,78,141,0.35)] active:translate-y-0"
          style={{ boxShadow: '0 4px 20px rgba(236,78,141,0.2)' }}
        >
          {/* Glows */}
          <span
            className="absolute top-1 right-1 w-12 h-12 rounded-full pointer-events-none transition-all duration-500"
            style={{ background: cfg.color, filter: 'blur(14px)', opacity: 0.5, zIndex: 0 }}
          />
          <span
            className="absolute top-2 right-5 w-16 h-16 rounded-full pointer-events-none transition-all duration-500"
            style={{ background: '#a855f7', filter: 'blur(14px)', opacity: 0.4, zIndex: 0 }}
          />
          <span className="relative z-10 flex items-center gap-2">
            ENVIAR
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
}

// ── Modal principal ───────────────────────────────────────────────────────────
export default function FormularioModal({ taller, onClose }) {
  const overlayRef = useRef(null);
  const mouseDownTarget = useRef(null);

  // Bloquear scroll
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

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
  <div
    ref={overlayRef}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    style={{ background: 'rgba(37,27,55,0.55)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
    onMouseDown={(e) => { mouseDownTarget.current = e.target; }}
    onMouseUp={(e) => {
      if (mouseDownTarget.current === overlayRef.current && e.target === overlayRef.current) {
        onClose();
      }
      mouseDownTarget.current = null;
    }}
  >
      <div
        className="relative w-full max-w-[580px] flex flex-col rounded-2xl overflow-hidden bg-white"
        style={{
          maxHeight: '90vh',
          boxShadow: '0 24px 64px rgba(37,27,55,0.25)',
          animation: 'fm-in 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* Header con gradiente */}
        <div className="relative flex-shrink-0 px-6 pt-7 pb-5 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #b2b0d8 0%, #f0d4e4 100%)', opacity: 0.55 }}
          />
          <div className="relative z-10 pr-8">
            <h1 className="font-sans font-extrabold text-xl text-[#251B37] mb-1 leading-tight">
              ¡Vamos a construir algo juntos!
            </h1>
            <p className="font-sans text-xs text-[#85789A] leading-relaxed">
              Para poder comprendernos mejor, por favor llena este formulario y cuéntanos sobre tus necesidades.
            </p>
          </div>
          {/* Botón X */}
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full flex items-center justify-center text-[#251B37] transition-all duration-200 hover:text-[#EC4E8D] hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.7)' }}
          >
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body scrolleable */}
        <div className="overflow-y-auto flex-1 px-6 py-5" style={{ scrollbarWidth: 'thin', scrollbarColor: '#EC4E8D transparent' }}>
          <FormContent taller={taller} onClose={onClose} />
        </div>
      </div>

      {/* Keyframe inline */}
      <style>{`
        @keyframes fm-in {
          from { opacity: 0; transform: translateY(32px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}