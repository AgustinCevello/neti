import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function TerminosCondiciones() {
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
            Términos y Condiciones
          </h1>
          <p className="text-[#85789A] text-sm">Última actualización: Marzo 2026</p>
        </div>

        <div className="space-y-8 text-base leading-relaxed text-[#4A3F6B]">
          
          <section>
            <p>
              ¡Te damos la bienvenida a <strong>NETI (No Está Todo Inventado)</strong>! Al acceder y utilizar este sitio web (<a href="https://noestatodoinventado.com/" className="text-[#EC4E8D] hover:underline font-semibold">noestatodoinventado.com</a>), aceptás cumplir con los siguientes Términos y Condiciones de uso. Si no estás de acuerdo con alguna parte de estos términos, te pedimos que no utilices nuestro sitio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#251B37] mb-3">1. Objeto y Ámbito de Aplicación</h2>
            <p>
              NETI es una comunidad y laboratorio de innovación que ofrece talleres, consultorías y experiencias vinculadas a metodologías ágiles y cultura maker. Este sitio web tiene como finalidad brindar información sobre nuestros servicios, compartir contenido de valor y establecer canales de comunicación y postulación de perfiles profesionales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#251B37] mb-3">2. Propiedad Intelectual y Licencia</h2>
            <p className="mb-2">
              Salvo que se indique lo contrario, el contenido de este sitio web (textos, conceptos, metodologías) está bajo una licencia <strong>Creative Commons Reconocimiento 4.0 Internacional (CC BY 4.0)</strong>. Esto significa que sos libre de:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#6B5F80] mb-2">
              <li><strong>Compartir:</strong> copiar y redistribuir el material en cualquier medio o formato.</li>
              <li><strong>Adaptar:</strong> remezclar, transformar y construir a partir del material para cualquier propósito, incluso comercialmente.</li>
            </ul>
            <p>
              Bajo la condición de que otorgues el crédito correspondiente a <strong>NETI</strong>, proporciones un enlace a la licencia e indiques si se realizaron cambios. El diseño de la interfaz, logotipos y marcas registradas son propiedad exclusiva de NETI.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#251B37] mb-3">3. Uso de Formularios y Recepción de Perfiles</h2>
            <p className="mb-2">
              Al utilizar nuestros formularios de "Contacto" o "Dejar curriculum", te comprometés a proporcionar información veraz, precisa y actualizada. 
            </p>
            <p>
              El envío de un currículum o perfil de LinkedIn no garantiza la contratación de servicios, la participación en proyectos futuros ni la incorporación inmediata a la comunidad o al equipo de NETI. Evaluamos los perfiles en función de nuestras necesidades y proyectos vigentes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#251B37] mb-3">4. Exención de Responsabilidad</h2>
            <p>
              Nos esforzamos por mantener la información del sitio actualizada y correcta. Sin embargo, no ofrecemos garantías de ningún tipo, expresas o implícitas, sobre la integridad, exactitud, fiabilidad o disponibilidad del sitio web o de la información, productos o servicios contenidos en el mismo. Las fechas, modalidades y cupos de los talleres (Netiatones, Hackatones, Sprints) están sujetos a disponibilidad y posibles modificaciones.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#251B37] mb-3">5. Modificaciones de los Términos</h2>
            <p>
              NETI se reserva el derecho de revisar y modificar estos Términos y Condiciones en cualquier momento sin previo aviso. Al utilizar este sitio web, aceptás estar sujeto a la versión actual de estos Términos y Condiciones de uso.
            </p>
          </section>

          <section className="bg-[#faf9fc] p-6 rounded-2xl border-2 border-[#E6E2EE] mt-10">
            <h2 className="text-lg font-bold text-[#251B37] mb-2">Contacto Legal</h2>
            <p>
              Para cualquier consulta legal o relacionada con estos términos, podés comunicarte con nuestro equipo a través de:{' '}
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