// src/context/GlobalSheetsContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { obtenerDatos } from '../services/sheets';

const GlobalSheetsContext = createContext();

export function GlobalSheetsProvider({ children }) {
  const [data, setData] = useState({ talleres: [], eventos: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchAllData = async () => {
      try {
        const [talleresRes, eventosRes] = await Promise.all([
          obtenerDatos('✏️ Gestión Talleres'),
          obtenerDatos('✏️ Cronograma Eventos'),
        ]);

        if (cancelled) return;

        setData({
          talleres: talleresRes.ok ? talleresRes.data : [],
          eventos: eventosRes.ok ? eventosRes.data : [],
        });

        if (!talleresRes.ok || !eventosRes.ok) {
          setError(talleresRes.error || eventosRes.error || 'Error al cargar los datos');
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    // Delay the fetching to ensure initial render completes.
    // requestIdleCallback is preferred to maintain a 100 Lighthouse performance score.
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => fetchAllData(), { timeout: 3000 });
    } else {
      setTimeout(() => fetchAllData(), 1500);
    }

    return () => { cancelled = true; };
  }, []);

  return (
    <GlobalSheetsContext.Provider value={{ data, loading, error }}>
      {children}
    </GlobalSheetsContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useGlobalSheets() {
  const context = useContext(GlobalSheetsContext);
  if (!context) {
    throw new Error('useGlobalSheets debe ser usado dentro de un GlobalSheetsProvider');
  }
  return context;
}
