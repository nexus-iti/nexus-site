import { m, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import type { Shape } from '../content.ts';

/** Glifo geométrico de marca (círculo, triángulo, rombo). */
export function Glyph({ shape, className = '', filled = true }: { shape: Shape; className?: string; filled?: boolean }) {
  const common = filled
    ? { fill: 'currentColor' }
    : { fill: 'none', stroke: 'currentColor', strokeWidth: 3, strokeLinejoin: 'round' as const };
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {shape === 'circle' && <circle cx="24" cy="24" r="20" {...common} />}
      {shape === 'triangle' && <path d="M24 5 L44 41 L4 41 Z" {...common} />}
      {shape === 'diamond' && <path d="M24 3 L45 24 L24 45 L3 24 Z" {...common} />}
    </svg>
  );
}

/** Aparece al entrar al viewport. Respeta prefers-reduced-motion. */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}

export function SectionHeader({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <Reveal className="mb-10 max-w-2xl md:mb-14">
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="display-l text-ink">{title}</h2>
      {children && <p className="mt-5 text-lg leading-7 text-muted">{children}</p>}
    </Reveal>
  );
}
