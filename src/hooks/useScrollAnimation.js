// src/hooks/useScrollAnimation.js
// ════════════════════════════════════════════════════════════════════════════
//  Hook reutilizable para animaciones de scroll-reveal basadas en
//  IntersectionObserver. Se desconecta automáticamente una vez que el
//  elemento es visible, liberando recursos.
// ════════════════════════════════════════════════════════════════════════════
import { useEffect, useRef, useState } from 'react';

/**
 * @param {Object}  [options]
 * @param {number}  [options.threshold=0.1]   - Fracción del elemento que debe estar visible.
 * @param {string}  [options.rootMargin='0px'] - Margen alrededor del root.
 * @param {boolean} [options.once=true]        - Si true, desconecta al activarse (una sola vez).
 * @returns {{ ref: React.RefObject, isVisible: boolean }}
 */
export function useScrollAnimation(options = {}) {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options;
  const ref       = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}
