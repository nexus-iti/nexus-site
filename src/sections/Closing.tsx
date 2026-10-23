import { ArrowUpRight, BookOpen } from 'lucide-react';
import { links, nav } from '../content.ts';
import { Reveal } from '../components/primitives.tsx';
import { Logo } from './Header.tsx';

const YEAR = new Date().getFullYear();

export function CallToAction() {
  return (
    <section className="container-nx py-20 lg:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-xl bg-violet-600 px-7 py-14 text-blush-50 md:px-14 md:py-20">
          <div className="pattern-stroke pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
          <div className="absolute -right-16 -top-16 size-56 rounded-full bg-pink-400 md:size-72" aria-hidden="true" />
          <div className="absolute -bottom-10 right-24 size-28 rotate-45 rounded-lg bg-violet-400 md:right-48" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <p className="font-tech text-xs font-medium uppercase tracking-[0.08em]">Seguí el proyecto</p>
            <h2 className="mt-4 font-display text-[40px] font-extrabold leading-[1] tracking-[-0.02em] md:text-[64px]">
              Todo el proceso, versionado y documentado.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-7">
              Mirá el código, las entregas y las decisiones de diseño en la organización de GitHub.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="nx-btn nx-btn-lg bg-blush-50 text-violet-600 hover:shadow-(--shadow-lg)"
              >
                Ir a GitHub <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a
                href={links.docs}
                target="_blank"
                rel="noreferrer"
                className="nx-btn nx-btn-lg border-blush-50/60 text-blush-50 hover:bg-blush-50/10"
              >
                <BookOpen size={18} aria-hidden="true" /> Documentación
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-nx flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-muted">Software con foco en diseño, AI y productividad. ITI CEPT, Montevideo.</p>
        </div>
        <nav aria-label="Pie de página">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="rounded-sm text-muted hover:text-link">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href={links.github} target="_blank" rel="noreferrer" className="rounded-sm text-muted hover:text-link">
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container-nx border-t border-border py-6">
        <p className="font-tech text-xs uppercase tracking-[0.08em] text-muted">© {YEAR} Nexus</p>
      </div>
    </footer>
  );
}
