import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Footer from './components/Footer';
import Nosotros from './pages/Nosotros/Nosotros';
import ScrollToTop from './components/ScrollToTop';
import LiderazgoDisruptivo from './pages/LiderazgoDisruptivo/LiderazgoDisruptivo';
import Servicios from './pages/Servicios/Servicios';
import Eventos from './pages/Eventos/Eventos';
import Contacto from './pages/Contacto/Contacto';

// Importamos las nuevas páginas legales
import PoliticaPrivacidad from './pages/legales/PoliticaPrivacidad';
import TerminosCondiciones from './pages/legales/TerminosCondiciones';

import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/liderazgo-disruptivo" element={<LiderazgoDisruptivo />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/contacto" element={<Contacto />} />
        
        {/* Agregamos las rutas de Legales */}
        <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />
        <Route path="/terminos-y-condiciones" element={<TerminosCondiciones />} />

        {/* Catch-all para 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;