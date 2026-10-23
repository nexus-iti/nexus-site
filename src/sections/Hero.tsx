import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { links } from '../content.ts';
import { Badge } from '../components/ui/nexus.tsx';

const ease = [0.22, 1, 0.36, 1] as const;

/** Composición de bloques de marca: eco de la portada del design system. */
function BrandComposition() {
  const reduce = useReducedMotion();
  const block = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, scale: 0.92, y: 16 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px]" aria-hidden="true">
      <div className="grid h-full grid-cols-6 grid-rows-6 gap-3 sm:gap-4">
        <motion.div {...block(0.05)} className="pattern-stroke col-span-4 row-span-4 overflow-hidden rounded-lg bg-violet-600" />
        <motion.div {...block(0.15)} className="col-span-2 row-span-2 overflow-hidden rounded-lg bg-blush-50 ring-1 ring-border">
          <img src={`${import.meta.env.BASE_URL}nexus-mark.png`} alt="" className="size-full object-cover" />
        </motion.div>
        <motion.div {...block(0.25)} className="col-span-2 row-span-2 rounded-pill bg-pink-400" />
        <motion.div {...block(0.35)} className="col-span-2 row-span-2 rounded-lg bg-violet-400" />
        <motion.div {...block(0.45)} className="col-span-2 row-span-2 rounded-lg bg-ink" />
        <motion.div {...block(0.55)} className="pattern-fill col-span-2 row-span-2 rounded-lg bg-surface ring-1 ring-border" />
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const item = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease },
  });

  return (
    <section
      id="top"
      className="container-nx grid items-center gap-12 pb-20 pt-10 md:pt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pb-28 lg:pt-20"
    >
      <div>
        <motion.div {...item(0)} className="mb-6 flex flex-wrap items-center gap-2">
          <Badge tone="primary">ITI CEPT · Montevideo</Badge>
          <Badge tone="success" dot>
            SGRSI v1.0.0
          </Badge>
        </motion.div>

        <motion.h1 {...item(0.08)} className="display-xl text-ink">
          Diseño que{' '}
          <span className="relative whitespace-nowrap text-link">
            conecta
            <svg
              viewBox="0 0 300 16"
              preserveAspectRatio="none"
              className="absolute -bottom-1 left-0 h-3 w-full text-accent"
              aria-hidden="true"
            >
              <path d="M2 11 C 60 3, 140 3, 298 9" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </span>
          .
        </motion.h1>

        <motion.p {...item(0.16)} className="mt-7 max-w-xl text-lg leading-8 text-muted md:text-xl md:leading-8">
          Software con foco en diseño, AI y productividad. Diseñamos y construimos producto digital pensado desde la experiencia de quien lo
          usa: interfaces claras, integraciones con AI que ahorran pasos reales y flujos de trabajo sin fricción.
        </motion.p>

        <motion.div {...item(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
          <a href="#proyectos" className="nx-btn nx-btn-primary nx-btn-lg">
            Ver proyectos
            <ArrowDown size={18} strokeWidth={2} aria-hidden="true" />
          </a>
          <a href={links.github} target="_blank" rel="noreferrer" className="nx-btn nx-btn-secondary nx-btn-lg">
            Abrir en GitHub
            <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
          </a>
        </motion.div>
      </div>

      <BrandComposition />
    </section>
  );
}
