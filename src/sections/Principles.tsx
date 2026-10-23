import { principles, type Shape } from '../content.ts';
import { Glyph, Reveal, SectionHeader } from '../components/primitives.tsx';

const shapes: Shape[] = ['circle', 'triangle', 'diamond', 'circle'];

export function Principles() {
  return (
    <section id="principios" className="border-t border-border bg-surface py-20 lg:py-28">
      <div className="container-nx">
        <SectionHeader eyebrow="Cómo trabajamos" title="Cuatro principios." />
        <ol className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.06}>
                <div className="mb-6 flex items-center gap-3">
                  <span className="font-tech text-sm font-semibold text-muted">0{i + 1}</span>
                  <span className="h-px flex-1 bg-border" aria-hidden="true" />
                  <Glyph shape={shapes[i]!} filled={i % 2 === 1} className="size-6 text-pink-400" />
                </div>
                <h3 className="font-display text-[24px] font-bold leading-8 tracking-[-0.01em] text-ink">{p.title}</h3>
                <p className="mt-3 text-[16px] leading-6 text-muted">{p.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
