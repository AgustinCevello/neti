// src/components/FadeIn.jsx
// ═══════════════════════════════════════════════════════════════════════════
//  Componente de animación global reutilizable.
//  Envuelve cualquier contenido y aplica un fade-in con translate al
//  entrar en el viewport gracias a useScrollAnimation.
//
//  Props:
//    children   — contenido a animar
//    delay      — retraso en ms antes de la transición (default 0)
//    className  — clases extra para el wrapper
//    threshold  — fracción mínima visible para disparar (default 0.1)
// ═══════════════════════════════════════════════════════════════════════════
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function FadeIn({ children, delay = 0, className = '', threshold = 0.1 }) {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity   : isVisible ? 1 : 0,
        transform : isVisible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
