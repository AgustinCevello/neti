import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home/Home'
import Footer from './components/Footer'
import Nosotros from './pages/Nosotros/Nosotros'
import ScrollToTop from './components/ScrollToTop'
import LiderazgoDisruptivo from './pages/LiderazgoDisruptivo/LiderazgoDisruptivo'
import Servicios from './pages/Servicios/Servicios'
import Eventos from './pages/Eventos/Eventos'
import Contacto from './pages/Contacto/Contacto'

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
      </Routes>
      <Footer />

    </BrowserRouter>
  )
}

export default App