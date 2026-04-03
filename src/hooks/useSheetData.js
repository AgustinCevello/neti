// src/hooks/useSheetData.js
import { useState, useEffect } from 'react';
import { obtenerDatos } from '../services/sheets';

/**
 * Hook reutilizable para obtener datos de una pestaña de Google Sheets.
 * Maneja los estados de carga y error automáticamente.
 *
 * @param {string} sheetName - Nombre exacto de la pestaña (ej: 'Gestión Talleres')
 * @returns {{ data: Array, loading: boolean, error: string|null }}
 *
 * @example
 *   const { data, loading, error } = useSheetData('✏️ Gestión Talleres');
 */
export function useSheetData(sheetName) {
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;

    obtenerDatos(sheetName)
      .then(result => {
        if (cancelled) return;
        if (result.ok) {
          setData(result.data);
        } else {
          setError(result.error || 'Error al cargar los datos');
        }
      })
      .catch(err => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    // Cleanup: evita actualizaciones de estado si el componente se desmontó
    return () => { cancelled = true; };
  }, [sheetName]);

  return { data, loading, error };
}
