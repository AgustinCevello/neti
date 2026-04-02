// src/utils/formHelpers.js
// ════════════════════════════════════════════════════════════════════════════
//  Utilidades centralizadas de formularios — NETI
//  Cubre: whitelists, validación, sanitización, honeypot, rate limiting,
//         time-to-submit check.
// ════════════════════════════════════════════════════════════════════════════

// ── Whitelists de caracteres ──────────────────────────────────────────────────
const LC      = 'abcdefghijklmnopqrstuvwxyz';
const UC      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ACCENTS = 'áéíóúÁÉÍÓÚüÜñÑ';
const DIGITS  = '0123456789';
const PUNCT   = ` .,;:!?¡¿()'"-`;
const EMAIL_CHARS = LC + UC + DIGITS + '@.-_+';
const TEL_CHARS   = DIGITS + '+-() ';
const URL_CHARS   = LC + UC + DIGITS + '/:.-_?=&#%+@';

export const CHAR_SETS = {
  nombre : new Set([...LC, ...UC, ...ACCENTS, ' ', '-', "'"]),
  texto  : new Set([...LC, ...UC, ...ACCENTS, ...DIGITS, ...PUNCT]),
  email  : new Set([...EMAIL_CHARS]),
  tel    : new Set([...TEL_CHARS]),
  url    : new Set([...URL_CHARS]),
  digits : new Set([...DIGITS]),
};

// ── Predicados de caracteres ──────────────────────────────────────────────────
/** @param {string} ch @param {'nombre'|'texto'|'email'|'tel'|'url'|'digits'} type */
export const isAllowedChar = (ch, type) => CHAR_SETS[type]?.has(ch) ?? false;

// ── Regex ─────────────────────────────────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Validación de email ───────────────────────────────────────────────────────
/** @param {string} email @returns {boolean} */
export const isValidEmail = (email) => EMAIL_REGEX.test(email.trim());

// ── Filtrado de strings por whitelist ────────────────────────────────────────
/**
 * Filtra un string manteniendo solo los caracteres del conjunto indicado
 * y cortando al máximo especificado.
 * @param {string} value
 * @param {'nombre'|'texto'|'email'|'tel'|'url'|'digits'} type
 * @param {number} maxLen
 * @returns {string}
 */
export const filterChars = (value, type, maxLen = Infinity) =>
  value.split('').filter(ch => isAllowedChar(ch, type)).join('').slice(0, maxLen);

// ── Sanitización contra inyecciones HTML ─────────────────────────────────────
/**
 * Elimina etiquetas HTML y caracteres potencialmente peligrosos de un string.
 * Se aplica ANTES de enviar datos al backend / Google Sheets.
 * @param {string} str
 * @returns {string}
 */
export function sanitizeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<\/?[^>]+(>|$)/g, '')  // elimina etiquetas HTML
    .replace(/javascript:/gi, '')     // javascript: protocol
    .replace(/on\w+=/gi, '')          // event handlers inline (onclick=…)
    .replace(/[<>"]/g, '')            // caracteres residuales peligrosos
    .trim();
}

/**
 * Sanitiza todos los valores string de un objeto de datos de formulario.
 * Los booleanos y números se dejan intactos.
 * @param {Record<string, any>} data
 * @returns {Record<string, any>}
 */
export function sanitizeFormData(data) {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      typeof value === 'string' ? sanitizeHtml(value) : value,
    ])
  );
}

// ── Sanitización de nombre ───────────────────────────────────────────────────
/**
 * Filtra y normaliza un nombre: solo letras (con acentos), espacios y guiones.
 * @param {string} name
 * @param {number} [maxLen=80]
 * @returns {string}
 */
export const sanitizeName = (name, maxLen = 80) =>
  filterChars(name, 'nombre', maxLen);

// ── Handlers de email ────────────────────────────────────────────────────────
/**
 * Normaliza un string de email: filtra caracteres, evita dobles @, dobles puntos.
 * @param {string} current - valor actual del campo
 * @param {string} next    - nuevo valor llegando del onChange
 * @returns {string}
 */
export function normalizeEmail(current, next) {
  let v = filterChars(next, 'email', 100);
  // Solo un @
  const atCount = (v.match(/@/g) || []).length;
  if (atCount > 1) {
    const i = v.indexOf('@');
    v = v.slice(0, i + 1) + v.slice(i + 1).replace(/@/g, '');
  }
  // No dobles puntos
  v = v.replace(/\.{2,}/g, '.').replace(/^[@.]+/, '');
  return v;
}

// ── Paleta de validación genérica (schema-driven) ───────────────────────────
/**
 * Valida un campo individual contra una regla de schema.
 * @param {string} name  - clave del campo
 * @param {*}      value - valor del campo
 * @param {Object} form  - estado completo del form (para validaciones cruzadas)
 * @param {Object} rules - schema de reglas { [name]: { required, min, max, pattern, custom } }
 * @returns {string} - mensaje de error, o '' si ok
 */
export function validateField(name, value, form = {}, rules = {}) {
  const rule = rules[name];
  if (!rule) return '';

  const strVal = typeof value === 'string' ? value.trim() : String(value ?? '');

  if (rule.required && !value && value !== 0 && value !== false) {
    return rule.requiredMsg ?? 'Este campo es requerido';
  }
  if (rule.min && strVal.length < rule.min) {
    return rule.minMsg ?? `Mínimo ${rule.min} caracteres`;
  }
  if (rule.max && strVal.length > rule.max) {
    return rule.maxMsg ?? `Máximo ${rule.max} caracteres`;
  }
  if (rule.pattern && strVal && !rule.pattern.test(strVal)) {
    return rule.patternMsg ?? 'Formato inválido';
  }
  if (rule.custom) {
    return rule.custom(value, form) ?? '';
  }
  return '';
}

/**
 * Valida todos los campos de un formulario según un schema.
 * @param {Record<string, any>} form
 * @param {Object} rules
 * @returns {Record<string, string>} - objeto con errores (vacío = todo OK)
 */
export function validateForm(form, rules) {
  const errors = {};
  Object.keys(rules).forEach((name) => {
    const err = validateField(name, form[name], form, rules);
    if (err) errors[name] = err;
  });
  return errors;
}

// ── Schemas de validación por formulario ─────────────────────────────────────

/** Schema para ContactoModal y campos de contacto general */
export const CONTACTO_RULES = {
  nombre: {
    required: true, requiredMsg: 'El nombre es requerido',
    max: 80, maxMsg: 'Máximo 80 caracteres',
    custom: (v) => {
      if (v && [...v].some(ch => !isAllowedChar(ch, 'nombre'))) return 'Solo letras, sin números ni símbolos';
      return '';
    },
  },
  email: {
    required: true, requiredMsg: 'El email es requerido',
    custom: (v) => (!v?.trim() ? '' : (!isValidEmail(v) ? 'Ingresá un correo válido (ej: nombre@empresa.com)' : '')),
  },
  telefono: {
    custom: (v) => {
      if (!v?.trim()) return '';
      if (v.length < 6) return 'Número demasiado corto';
      if (v.length > 20) return 'Máximo 20 caracteres';
      return '';
    },
  },
  linkedin: {
    custom: (v) => {
      if (!v?.trim()) return '';
      if (!v.includes('linkedin.com')) return 'Debe ser un link válido de LinkedIn';
      if (v.length > 200) return 'URL demasiado larga';
      return '';
    },
  },
  mensaje: {
    required: true, requiredMsg: 'El mensaje es requerido',
    min: 10, minMsg: 'Mínimo 10 caracteres',
    max: 500, maxMsg: 'Máximo 500 caracteres',
  },
  aceptaLegales: {
    required: true, requiredMsg: 'Debes aceptar las políticas para continuar',
    custom: (v) => (!v ? 'Debes aceptar las políticas para continuar' : ''),
  },
};

/** Schema para CurriculumForm */
export const CV_RULES = {
  nombre: {
    required: true, requiredMsg: 'El nombre es requerido',
    max: 80, maxMsg: 'Máximo 80 caracteres',
  },
  linkedin: {
    required: true, requiredMsg: 'El link de LinkedIn es requerido',
    custom: (v) => {
      if (!v?.trim()) return 'El link es requerido';
      if (!v.includes('linkedin.com')) return 'Debe ser un link válido de LinkedIn';
      if (v.length > 200) return 'URL demasiado larga';
      return '';
    },
  },
  aceptaLegales: {
    custom: (v) => (!v ? 'Debes aceptar las políticas' : ''),
  },
};

/** Schema para FormularioModal (talleres) */
export const TALLER_RULES = {
  tipo: {
    required: true, requiredMsg: 'Seleccioná una opción para continuar',
  },
  nombre: {
    required: true, requiredMsg: 'Tu nombre es requerido',
    max: 80, maxMsg: 'Máximo 80 caracteres',
    custom: (v) => {
      if (!v?.trim()) return '';
      if ([...v].some(ch => !isAllowedChar(ch, 'nombre'))) return 'Solo letras';
      return '';
    },
  },
  busco: {
    required: true, requiredMsg: 'Seleccioná qué estás buscando',
  },
  email: {
    required: true, requiredMsg: 'El correo es requerido',
    custom: (v) => (!v?.trim() ? '' : (!isValidEmail(v) ? 'Ingresá un correo válido (ej: nombre@empresa.com)' : '')),
  },
  participantes: {
    custom: (v) => {
      if (!v) return '';
      if (!/^[0-9]*$/.test(v)) return 'Solo números';
      if (parseInt(v) > 100000) return 'Número demasiado alto';
      return '';
    },
  },
  descripcion: {
    custom: (v, form) => {
      if (form?.busco === 'otro' && (!v || !v.trim())) return 'Por favor, detallá qué estás buscando';
      if (v && v.length > 600) return 'Máximo 600 caracteres';
      return '';
    },
  },
  motivacion: {
    custom: (v) => (v && v.length > 600 ? 'Máximo 600 caracteres' : ''),
  },
  aceptaLegales: {
    custom: (v) => (!v ? 'Debes aceptar la Política de Privacidad y Términos' : ''),
  },
};

// ── Honeypot dinámico ─────────────────────────────────────────────────────────
// El nombre del campo se genera de forma aleatoria para dificultar que los
// bots lo detecten y lo omitan intencionalmente.
const HONEYPOT_FIELD = `_hp_${Math.random().toString(36).slice(2, 8)}`;

/**
 * Genera las props del campo honeypot. Renderizarlo invisible para usuarios
 * pero accesible para bots de formularios automáticos.
 * @returns {{ name: string, style: CSSProperties, autoComplete: string, tabIndex: number }}
 */
export function getHoneypotProps() {
  return {
    name        : HONEYPOT_FIELD,
    autoComplete: 'off',
    tabIndex    : -1,
    'aria-hidden': true,
    style: {
      position: 'absolute',
      left    : '-9999px',
      top     : '-9999px',
      width   : '0',
      height  : '0',
      opacity : '0',
      pointerEvents: 'none',
    },
  };
}

/**
 * Detecta si el honeypot fue rellenado (señal de bot).
 * @param {React.RefObject<HTMLInputElement>} ref
 * @returns {boolean} true = bot detectado
 */
export function isHoneypotTriggered(ref) {
  return Boolean(ref?.current?.value);
}

// ── Client-Side Rate Limiting ─────────────────────────────────────────────────
const RATE_LIMIT_KEY     = 'neti_form_attempts';
const RATE_LIMIT_MAX     = 3;         // intentos máximos
const RATE_LIMIT_WINDOW  = 10 * 60 * 1000; // 10 minutos en ms

/**
 * Lee los intentos almacenados en localStorage, descartando los expirados.
 * @returns {number[]} timestamps de intentos vigentes
 */
function getAttempts() {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    if (!raw) return [];
    const now = Date.now();
    return JSON.parse(raw).filter(ts => now - ts < RATE_LIMIT_WINDOW);
  } catch {
    return [];
  }
}

/**
 * Verifica si el navegador alcanzó el límite de envíos.
 * @returns {{ blocked: boolean, remainingMs: number }}
 *   blocked     - true si está bloqueado
 *   remainingMs - ms hasta que pueda volver a enviar
 */
export function checkRateLimit() {
  const attempts = getAttempts();
  if (attempts.length < RATE_LIMIT_MAX) return { blocked: false, remainingMs: 0 };

  const oldest     = Math.min(...attempts);
  const remainingMs = RATE_LIMIT_WINDOW - (Date.now() - oldest);
  return { blocked: true, remainingMs: Math.max(0, remainingMs) };
}

/**
 * Registra un intento de envío en localStorage.
 * Llamar DESPUÉS de una verificación exitosa, justo antes de hacer fetch.
 */
export function recordAttempt() {
  const attempts = getAttempts();
  attempts.push(Date.now());
  try {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(attempts));
  } catch {
    // localStorage lleno o bloqueado — ignorar silenciosamente
  }
}

/**
 * Formatea los ms restantes en un string legible (ej: "8 min 32 s").
 * @param {number} ms
 * @returns {string}
 */
export function formatCooldown(ms) {
  const totalS = Math.ceil(ms / 1000);
  const min    = Math.floor(totalS / 60);
  const seg    = totalS % 60;
  if (min > 0) return `${min} min ${seg} s`;
  return `${seg} s`;
}

// ── Time-to-Submit Check ──────────────────────────────────────────────────────
const MIN_HUMAN_SUBMIT_MS = 3000; // 3 segundos mínimo

/**
 * Devuelve el timestamp actual para registrar el momento de montaje del form.
 * Guardar este valor en un ref al montar el componente.
 * @returns {number}
 */
export const getFormMountTime = () => Date.now();

/**
 * Verifica si ha pasado suficiente tiempo desde que se montó el formulario.
 * Menos de MIN_HUMAN_SUBMIT_MS = bot probable.
 * @param {number} mountTime - timestamp obtenido con getFormMountTime()
 * @returns {boolean} true = bot (demasiado rápido)
 */
export function isTooFast(mountTime) {
  return Date.now() - mountTime < MIN_HUMAN_SUBMIT_MS;
}

// ── Verificación de seguridad combinada ──────────────────────────────────────
/**
 * Ejecuta todas las comprobaciones de seguridad antes de enviar.
 * @param {{ honeypotRef: React.RefObject, mountTime: number }} opts
 * @returns {{ ok: boolean, reason: string|null }}
 *   ok     - false si se detectó amenaza
 *   reason - código de razón: 'honeypot' | 'tooFast' | 'rateLimit' | null
 */
export function runSecurityChecks({ honeypotRef, mountTime }) {
  if (isHoneypotTriggered(honeypotRef)) {
    return { ok: false, reason: 'honeypot' };
  }
  if (isTooFast(mountTime)) {
    return { ok: false, reason: 'tooFast' };
  }
  const { blocked, remainingMs } = checkRateLimit();
  if (blocked) {
    return { ok: false, reason: 'rateLimit', remainingMs };
  }
  return { ok: true, reason: null };
}
