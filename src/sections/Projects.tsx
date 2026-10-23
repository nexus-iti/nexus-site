import { ArrowUpRight, BookOpen, Lock } from 'lucide-react';
import { links, nexusFeatures, releases } from '../content.ts';
import { Reveal, SectionHeader } from '../components/primitives.tsx';
import { Badge } from '../components/ui/nexus.tsx';

export function Projects() {
  return (
    <section id="proyectos" className="border-y border-border bg-surface py-20 lg:py-28">
      <div className="container-nx">
        <SectionHeader eyebrow="Proyectos" title="Lo que estamos construyendo.">
          Producto real, con entregas versionadas y documentación abierta.
        </SectionHeader>

        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr] lg:gap-6">
          {/* NEXUS / SGRSI */}
          <Reveal className="h-full">
            <article className="relative flex h-full flex-col overflow-hidden rounded-xl bg-violet-600 p-7 text-blush-50 md:p-10">
              <div
                className="pattern-stroke pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-25 [mask-image:linear-gradient(to_left,black,transparent)]"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="mb-8 flex flex-wrap items-center gap-2">
                  <span className="inline-flex h-6 items-center gap-1.5 rounded-pill bg-blush-50 px-2.5 font-tech text-xs font-medium tracking-[0.04em] text-violet-600">
                    <Lock size={12} strokeWidth={2.25} aria-hidden="true" /> Privado
                  </span>
                  <span className="inline-flex h-6 items-center rounded-pill border border-blush-50/60 px-2.5 font-tech text-xs font-medium tracking-[0.04em]">
                    v1.0.0
                  </span>
                </div>
                <p className="font-tech text-xs font-medium uppercase tracking-[0.08em]">NEXUS / SGRSI</p>
                <h3 className="mt-3 max-w-lg font-display text-[34px] font-bold leading-[1.05] tracking-[-0.015em] md:text-[44px]">
                  Gestión de recursos y servicios de informática.
                </h3>
                <p className="mt-5 max-w-lg text-[17px] leading-7">
                  El sistema del ITI CEPT para pedir recursos, coordinar servicios, atender soporte, mantener inventario y organizar el
                  trabajo técnico-administrativo.
                </p>
                <ul className="mt-7 flex flex-wrap gap-2" aria-label="Módulos">
                  {nexusFeatures.map((f) => (
                    <li key={f} className="rounded-pill bg-blush-50/12 px-3 py-1.5 text-sm font-medium ring-1 ring-blush-50/30">
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={links.app} className="nx-btn nx-btn-lg mt-8 bg-blush-50 text-violet-600 hover:shadow-(--shadow-lg)">
                  Abrir la app <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
            </article>
          </Reveal>

          {/* Versiones */}
          <Reveal delay={0.08} className="h-full">
            <article className="nx-card nx-card-elevated h-full gap-0 p-7 md:p-8">
              <p className="nx-card-eyebrow">Historial de versiones</p>
              <h3 className="mt-2 font-display text-[24px] font-bold leading-8 text-ink">De prototipo a arquitectura por capas</h3>
              <ol className="mt-6 flex flex-col">
                {releases.map((r, i) => {
                  const last = i === releases.length - 1;
                  return (
                    <li key={r.version} className="relative flex gap-4 pb-5 last:pb-0">
                      {!last && <span className="absolute left-[7px] top-5 h-full w-0.5 bg-border" aria-hidden="true" />}
                      <span
                        className={`relative mt-1 size-4 shrink-0 rounded-full border-2 ${last ? 'border-primary bg-primary' : 'border-muted bg-surface'}`}
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-tech text-sm font-semibold text-ink">{r.version}</span>
                          {last && <Badge tone="success">Actual</Badge>}
                        </div>
                        <p className="text-[15px] leading-6 text-ink">{r.title}</p>
                        <p className="text-sm text-muted">{r.stage}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </article>
          </Reveal>
        </div>

        {/* Docs */}
        <Reveal delay={0.12} className="mt-4 lg:mt-6">
          <a
            href={links.docs}
            target="_blank"
            rel="noreferrer"
            className="nx-card nx-card-outline nx-card-interactive flex-col items-start gap-5 bg-bg p-7 sm:flex-row sm:items-center md:p-8"
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-md bg-primary-soft text-link">
              <BookOpen size={26} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-tech text-xs font-medium uppercase tracking-[0.08em] text-muted">nexus-docs</span>
              <span className="mt-1 block text-[20px] font-semibold leading-7 text-ink">Documentación técnica, entregas y guías</span>
              <span className="mt-1 block text-[15px] leading-6 text-muted">
                Arquitectura, modelo de datos, despliegue, pruebas e informes de cada versión.
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-link">
              Leer <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
