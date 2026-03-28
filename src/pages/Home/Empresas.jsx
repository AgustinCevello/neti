import { useEffect, useRef } from 'react'

import cocacola from '../../assets/images/empresas/cocacola.webp'
import oracle from '../../assets/images/empresas/oracle.webp'
import urg from '../../assets/images/empresas/urg.webp'
import gire from '../../assets/images/empresas/gire.webp'
import bgh from '../../assets/images/empresas/bgh.webp'
import dream from '../../assets/images/empresas/dream.webp'
import globant from '../../assets/images/empresas/globant.webp'
import mercedes from '../../assets/images/empresas/mercedes.webp'
import nanotecnologia from '../../assets/images/empresas/nanotecnologia.webp'
import telefonica from '../../assets/images/empresas/telefonica.webp'
import apex from '../../assets/images/empresas/apex.webp'
import iae from '../../assets/images/empresas/iae.webp'
import areastres from '../../assets/images/empresas/areastres.webp'
import sepyme from '../../assets/images/empresas/sepyme.webp'
import abinbev from '../../assets/images/empresas/abinbev.webp'

const empresas = [
  { src: cocacola, alt: "The Coca-Cola Company" },
  { src: oracle, alt: "Oracle" },
  { src: urg, alt: "URG Urgencias" },
  { src: gire, alt: "Gire" },
  { src: bgh, alt: "BGH" },
  { src: dream, alt: "Drean" },
  { src: globant, alt: "Globant" },
  { src: mercedes, alt: "Mercedes-Benz" },
  { src: nanotecnologia, alt: "FundaciÃ³n Argentina de NanotecnologÃ­a" },
  { src: telefonica, alt: "TelefÃ³nica FundaciÃ³n" },
  { src: apex, alt: "Apex" },
  { src: iae, alt: "IAE Business School" },
  { src: areastres, alt: "Ãrea Tres" },
  { src: sepyme, alt: "SEPYME" },
  { src: abinbev, alt: "ABInBev" },
]

export default function Empresas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index;
            setTimeout(() => {
              entry.target.classList.remove('opacity-0', 'translate-y-8');
              entry.target.classList.add('opacity-60', 'translate-y-0');
            }, index * 100); // 100ms staggered delay
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = containerRef.current?.querySelectorAll('.empresa-logo') || [];
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 px-4 bg-white border-t border-[#E6E2EE]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-16 uppercase tracking-widest text-transparent [-webkit-text-stroke:1px_#8b5cf6]">
          Empresas con las que trabajamos
        </h2>

        <div ref={containerRef} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 md:gap-10 items-center">
          {empresas.map((empresa, index) => (
            <div
              key={empresa.alt}
              data-index={index}
              className="empresa-logo flex items-center justify-center p-3 grayscale hover:grayscale-0 opacity-0 translate-y-8 hover:!opacity-100 transition-all duration-[600ms] ease-out"
            >
              <img
                src={empresa.src}
                alt={empresa.alt}
                className="max-h-12 sm:max-h-14 md:max-h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
