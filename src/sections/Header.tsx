import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { links, nav } from '../content.ts';
import { ThemeToggle } from '../components/ThemeToggle.tsx';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="#top" className={`inline-flex items-center gap-3 rounded-md ${className}`} aria-label="Nexus, inicio">
      <img src={`${import.meta.env.BASE_URL}nexus-mark.png`} alt="" width={36} height={36} className="size-9 rounded-[10px]" />
      <span className="font-display text-[22px] font-extrabold tracking-[-0.02em] text-ink">Nexus</span>
    </a>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-200 ${
        scrolled || open ? 'border-border bg-bg shadow-(--shadow-sm)' : 'border-transparent bg-bg'
      }`}
    >
      <div className="container-nx flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-[10px] px-3 py-2 text-[15px] font-medium text-muted transition-colors hover:bg-primary-soft hover:text-link"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href={links.app} className="nx-btn nx-btn-secondary nx-btn-md hidden sm:inline-flex">
            Acceder
            <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="nx-btn nx-btn-ghost nx-btn-md w-10 px-0 md:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-movil" aria-label="Principal" className="container-nx pb-5 md:hidden">
          <ul className="flex flex-col gap-1 border-t border-border pt-3">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-base font-semibold text-ink hover:bg-primary-soft"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={links.app}
                className="flex items-center gap-2 rounded-md px-3 py-3 text-base font-semibold text-link hover:bg-primary-soft"
              >
                Acceder a la app <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-md px-3 py-3 text-base font-semibold text-link hover:bg-primary-soft"
              >
                GitHub <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
