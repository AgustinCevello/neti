import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PoliticaPrivacidad() {
  // Asegurarnos de que la página cargue siempre arriba de todo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#faf9fc] min-h-screen py-20 px-4 md:px-8 font-sans text-[#251B37]">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-14 rounded-3xl shadow-[0_8px_32px_rgba(20,13,40,0.04)] border-2 border-[#E6E2EE]">
        
        <div className="mb-12 border-b-2 border-[#E6E2EE] pb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-[#85789A] hover:text-[#EC4E8D] font-bold text-sm uppercase tracking-widest mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Volver al inicio
          </Link>
          <h1 className="font-display text-4xl md:text-5xl font-black uppercase tracking-widest text-[#251B37] mb-4">
            Política de Privacidad
          </h1>
          <p className="text-[#85789A] text-sm">Última actualización: Marzo 2026</p>
        </div>

        <div className="space-y-8 text-base leading-relaxed text-[#4A3F6B]">
          
          <section>
            <p>
              En <strong>NETI (No Está Todo Inventado)</strong>, accesible desde <a href="https://noestatodoinventado.com/" className="text-[#EC4E8D] hover:underline font-semibold">noestatodoinventado.com</a>, la privacidad de nuestros visitantes y miembros de la comunidad es una de nuestras principales prioridades. Este documento de Política de Privacidad contiene los tipos de información que recopilamos y registramos, y cómo la utilizamos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#251B37] mb-3">1. Información que recopilamos</h2>
            <p className="mb-2">A través de nuestros formularios interactivos (Contacto, Inscripción a Talleres y Recepción de Currículums), podemos solicitarte la siguiente información personal:</p>
            <ul className="list-disc pl-5 space-y-1 text-[#6B5F80]">
              <li>Nombre y apellido.</li>
              <li>Dirección de correo electrónico.</li>
              <li>Número de teléfono (opcional).</li>
              <li>Enlace a tu perfil de LinkedIn u otras redes profesionales.</li>
              <li>Información contextual sobre tu empresa o motivos de consulta.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#251B37] mb-3">2. ¿Cómo utilizamos tu información?</h2>
            <p className="mb-2">Utilizamos la información que recopilamos de diversas maneras, entre ellas para:</p>
            <ul className="list-disc pl-5 space-y-1 text-[#6B5F80]">
              <li>Proveer, operar y mantener nuestro sitio web.</li>
              <li>Comunicarnos con vos para responder tus consultas, enviarte presupuestos o información sobre nuestros talleres (Liderazgo Disruptivo, Hands On, etc.).</li>
              <li>Evaluar perfiles profesionales para futuras colaboraciones, hackatones o incorporaciones a nuestra comunidad maker.</li>
              <li>Prevenir fraudes y asegurar el correcto uso de nuestras plataformas.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#251B37] mb-3">3. Almacenamiento y Servicios de Terceros</h2>
            <p>
              Para gestionar las consultas y perfiles de manera ágil, los datos ingresados en nuestros formularios son procesados y almacenados utilizando los servicios en la nube de <strong>Google Workspace (específicamente Google Sheets)</strong>. Al enviar tu información, aceptás que estos datos sean transferidos y almacenados bajo los estándares de seguridad y privacidad de Google. No vendemos, alquilamos ni compartimos tu información personal con terceros para fines comerciales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#251B37] mb-3">4. Tus Derechos (Derechos ARCO)</h2>
            <p>
              Tenés derecho a solicitar el <strong>Acceso, Rectificación, Cancelación u Oposición</strong> sobre tus datos personales. Si deseás saber qué información tuya conservamos, corregir algún dato inexacto, o solicitar que eliminemos tu registro de nuestra base de datos (por ejemplo, tu CV), podés hacerlo en cualquier momento contactándonos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#251B37] mb-3">5. Consentimiento</h2>
            <p>
              Al utilizar nuestro sitio web y completar nuestros formularios, otorgás tu consentimiento expreso e informado para nuestra Política de Privacidad y aceptás sus términos.
            </p>
          </section>

          <section className="bg-[#faf9fc] p-6 rounded-2xl border-2 border-[#E6E2EE] mt-10">
            <h2 className="text-lg font-bold text-[#251B37] mb-2">Contacto</h2>
            <p>
              Si tenés preguntas adicionales o requerís más información sobre nuestra Política de Privacidad, no dudes en escribir a:{' '}
              <a href="mailto:mara@netimakers.com" className="text-[#EC4E8D] font-bold hover:underline">
                mara@netimakers.com
              </a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}