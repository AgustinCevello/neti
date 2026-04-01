const API_URL = import.meta.env.VITE_SHEETS_URL;

/**
 * Función genérica para realizar el envío a Google Apps Script
 * @param {Object} data - Datos del formulario + campo 'origen'
 */
async function enviarASheets(data) {
  if (!API_URL) {
    console.error("Error: La URL de la API de Google Sheets no está definida en el archivo .env");
    return { ok: false, error: "Configuración faltante" };
  }

  try {
    await fetch(API_URL, {
      method: 'POST',
      mode: 'no-cors', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return { ok: true };
  } catch (err) {
    console.error('Error enviando datos a Google Sheets:', err);
    return { ok: false, error: err.message };
  }
}

// ── Exportaciones para los componentes ────────────────────────────────────────
export async function enviarContacto(form) {
  return enviarASheets({ 
    ...form, 
    origen: 'contacto' 
  });
}

export async function enviarConsultaTaller(form) {
  return enviarASheets({ 
    ...form, 
    origen: 'taller' 
  });
}

export async function enviarInscripcionEvento(form) {
  return enviarASheets({ 
    ...form, 
    origen: 'eventos' 
  });
}