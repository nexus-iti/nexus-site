import { pillars } from '../content.ts';
import { Glyph, Reveal, SectionHeader } from '../components/primitives.tsx';

const glyphColor = ['text-link', 'text-pink-400', 'text-violet-400'];

export function Pillars() {
  return (
    <section id="que-hacemos" className="container-nx py-20 lg:py-28">
      <SectionHeader eyebrow="Qué hacemos" title="Tres focos, un mismo criterio.">
        Diseño, AI y productividad no son áreas separadas: son la misma pregunta sobre cómo trabaja la gente.
      </SectionHeader>

      <div className="grid gap-4 md:grid-cols-3 md:gap-6">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08} className="h-full">
            <article className="nx-card nx-card-outline group h-full gap-0 p-7 transition-shadow hover:shadow-(--shadow-md)">
              <Glyph shape={p.shape} className={`mb-8 size-12 transition-transform duration-300 group-hover:rotate-12 ${glyphColor[i]}`} />
              <p className="nx-card-eyebrow mb-2">{p.eyebrow}</p>
              <h3 className="font-display text-[26px] font-bold leading-8 tracking-[-0.01em] text-ink">{p.title}</h3>
              <p className="mt-3 text-[16px] leading-6 text-muted">{p.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
