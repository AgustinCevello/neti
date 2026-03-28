const SHEETS_URL = 'https://script.google.com/macros/s/TU_ID_AQUI/exec';

async function enviarASheets(data) {
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      mode: 'no-cors',
    });
    return { ok: true };
  } catch (err) {
    console.error('Error enviando a Sheets:', err);
    return { ok: false };
  }
}

export async function enviarInscripcionEvento({ nombre, apellido, email }) {
  return enviarASheets({ origen: 'eventos', nombre, apellido, email });
}

export async function enviarConsultaTaller({ taller, tipo, nombre, busco, descripcion, experiencia, participantes, email, motivacion }) {
  return enviarASheets({ origen: 'taller', taller, tipo, nombre, busco, descripcion, experiencia, participantes, email, motivacion });
}

export async function enviarContacto({ nombre, email, telefono, linkedin, mensaje }) {
  return enviarASheets({ origen: 'contacto', nombre, email, telefono, linkedin, mensaje });
}