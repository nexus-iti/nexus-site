import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import { palette } from '../content.ts';
import { Reveal, SectionHeader } from '../components/primitives.tsx';
import { Alert, Badge, Button, Input, Kbd, Switch, Tabs } from '../components/ui/nexus.tsx';

function LiveDemo() {
  const [ai, setAi] = useState(true);
  return (
    <div className="flex flex-col gap-5">
      <Input label="Nombre del recurso" placeholder="Ej. Proyector aula 12" hint="Lo podés cambiar después." />
      <Switch label="Sugerir categoría con AI" checked={ai} onChange={setAi} />
      {ai && (
        <Alert tone="info" title="Sugerencia: Audiovisual">
          Elegida por el nombre. Podés cambiarla o deshacerla.
        </Alert>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary" leadingIcon={<Sparkles size={16} aria-hidden="true" />}>
          Crear recurso
        </Button>
        <Button variant="ghost">Cancelar</Button>
        <span className="ml-auto hidden items-center gap-2 text-sm text-muted sm:inline-flex">
          <Kbd keys={['Ctrl', 'Enter']} />
        </span>
      </div>
    </div>
  );
}

function Palette() {
  return (
    <ul className="grid grid-cols-2 gap-3">
      {palette.map((c) => (
        <li
          key={c.name}
          className="flex aspect-[4/3] flex-col justify-end rounded-md p-4 ring-1 ring-border"
          style={{ background: c.hex, color: c.ink }}
        >
          <span className="font-tech text-xs font-medium uppercase tracking-[0.08em]">{c.name}</span>
          <span className="font-tech text-sm font-semibold">{c.hex}</span>
          <span className="mt-1 text-[13px] leading-[18px] opacity-90">{c.role}</span>
        </li>
      ))}
    </ul>
  );
}

function Type() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="eyebrow mb-2">Display · Bricolage Grotesque</p>
        <p className="font-display text-[44px] font-extrabold leading-none tracking-[-0.02em] text-ink">Software con criterio</p>
      </div>
      <div>
        <p className="eyebrow mb-2">Body · Host Grotesk</p>
        <p className="text-[18px] leading-7 text-ink">Diseñamos y construimos software centrado en la experiencia.</p>
      </div>
      <div>
        <p className="eyebrow mb-2">Tech · Space Grotesk</p>
        <p className="font-tech text-[15px] font-medium uppercase tracking-[0.08em] text-ink">v1.4.0 · release · 12 ms</p>
      </div>
    </div>
  );
}

export function System() {
  return (
    <section id="sistema" className="container-nx py-20 lg:py-28">
      <SectionHeader eyebrow="Sistema de diseño" title="Una identidad, todas las superficies.">
        Paleta, tipografía, sombras y componentes compartidos entre sitio, producto y documentación. Esta página está hecha con ellos.
      </SectionHeader>

      <Reveal>
        <div className="overflow-hidden rounded-xl ring-1 ring-border">
          <img
            src={`${import.meta.env.BASE_URL}banner.webp`}
            alt="Banner de Nexus: el wordmark sobre el gradiente de marca con el pattern geométrico"
            className="block aspect-[2.2/1] w-full object-cover"
            loading="lazy"
            width={2400}
            height={1081}
          />
        </div>
      </Reveal>

      <div className="mt-4 grid gap-4 lg:mt-6 lg:grid-cols-[1fr_1.1fr] lg:gap-6">
        <Reveal className="h-full">
          <div className="nx-card nx-card-outline h-full gap-0 p-6 md:p-8">
            <Tabs
              items={[
                { id: 'color', label: 'Color', content: <Palette /> },
                { id: 'tipo', label: 'Tipografía', content: <Type /> },
              ]}
            />
          </div>
        </Reveal>
        <Reveal delay={0.08} className="h-full">
          <div className="nx-card nx-card-elevated h-full gap-0 p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between gap-3">
              <p className="nx-card-eyebrow">Componentes en vivo</p>
              <Badge tone="primary">11 componentes</Badge>
            </div>
            <LiveDemo />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
