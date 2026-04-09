// src/hooks/useSheetData.js
import { useGlobalSheets } from '../context/GlobalSheetsContext';

/**
 * Hook reutilizable para obtener datos de una pestaña de Google Sheets.
 * Integrado con el contexto global para pre-fetching (carga en segundo plano) asíncrono.
 *
 * @param {string} sheetName - Nombre exacto de la pestaña (ej: 'Gestión Talleres')
 * @returns {{ data: Array, loading: boolean, error: string|null }}
 *
 * @example
 *   const { data, loading, error } = useSheetData('✏️ Gestión Talleres');
 */
export function useSheetData(sheetName) {
  const { data, loading, error } = useGlobalSheets();

  let targetData = [];
  if (sheetName === '✏️ Gestión Talleres') {
    targetData = data.talleres;
  } else if (sheetName === '✏️ Cronograma Eventos') {
    targetData = data.eventos;
  }

  return { data: targetData, loading, error };
}
