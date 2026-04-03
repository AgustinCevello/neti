// src/services/sheets.js
const API_URL = import.meta.env.VITE_SHEETS_URL;

/**
 * Función genérica para realizar el envío a Google Apps Script (POST)
 * @param {Object} data - Datos del formulario + campo 'origen'
 */
async function enviarASheets(data) {
  if (!API_URL) {
    console.error('Error: La URL de la API de Google Sheets no está definida en el archivo .env');
    return { ok: false, error: 'Configuración faltante' };
  }

  try {
    await fetch(API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return { ok: true };
  } catch (err) {
    console.error('Error enviando datos a Google Sheets:', err);
    return { ok: false, error: err.message };
  }
}

// ── GET: Obtener datos de una pestaña ─────────────────────────────────────────

/**
 * Obtiene datos de una pestaña de Google Sheets vía GET.
 * El Apps Script debe implementar doGet(e) y responder a ?sheet=NombrePestaña
 * con un array JSON de objetos.
 *
 * @param {string} sheet - Nombre exacto de la pestaña (ej: 'Gestión Talleres')
 * @returns {{ ok: boolean, data: Array, error?: string }}
 */
export async function obtenerDatos(sheet) {
  if (!API_URL) {
    console.error('Error: La URL de la API de Google Sheets no está definida en el archivo .env');
    return { ok: false, data: [], error: 'Configuración faltante' };
  }

  try {
    const url = `${API_URL}?sheet=${encodeURIComponent(sheet)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { ok: true, data: Array.isArray(data) ? data : [] };
  } catch (err) {
    console.error(`Error obteniendo datos de la pestaña "${sheet}":`, err);
    return { ok: false, data: [], error: err.message };
  }
}

// ── POST: Exportaciones para los componentes ──────────────────────────────────

export async function enviarContacto(form) {
  return enviarASheets({ ...form, origen: 'contacto' });
}

export async function enviarConsultaTaller(form) {
  return enviarASheets({ ...form, origen: 'taller' });
}

export async function enviarInscripcionEvento(form) {
  return enviarASheets({ ...form, origen: 'eventos' });
}