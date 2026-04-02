import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function NotFound() {
  const { ref: titleRef, isVisible: isTitleVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: textRef, isVisible: isTextVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: btnRef, isVisible: isBtnVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div className="bg-neti-dark min-h-[80vh] flex items-center justify-center px-4 overflow-hidden pt-20 pb-20">
      <div className="flex flex-col items-center text-center">
        <h1 
          ref={titleRef}
          className={`font-display text-[35vw] sm:text-[25vw] md:text-9xl lg:text-[12rem] xl:text-[15rem] leading-none font-black text-transparent transition-all duration-1000 ${isTitleVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}
          style={{ WebkitTextStroke: '1.5px var(--color-neti-pink)', '--tw-bg-opacity': 1, backgroundColor: 'transparent' }}
        >
          404
        </h1>
        
        <p 
          ref={textRef}
          className={`text-white font-sans text-lg md:text-2xl mt-4 mb-8 transition-all duration-1000 delay-150 ${isTextVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}
        >
          ¡Ups! Parece que este nodo de innovación no existe.
        </p>

        <div
          ref={btnRef}
          className={`transition-all duration-1000 delay-300 ${isBtnVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}
        >
          <Link 
            to="/" 
            className="inline-block bg-[#EC4E8D] text-white font-sans font-bold py-3 px-8 rounded-full shadow-[0_4px_12px_rgba(236,78,141,0.4)] hover:brightness-110 transition-all duration-300 transform hover:-translate-y-1"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
