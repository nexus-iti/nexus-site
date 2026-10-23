import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Tooltip } from './ui/nexus.tsx';

type Theme = 'light' | 'dark';

function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === 'light' || set === 'dark') return set;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => (typeof document === 'undefined' ? 'light' : currentTheme()));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const next: Theme = theme === 'dark' ? 'light' : 'dark';
  const label = next === 'dark' ? 'Tema oscuro' : 'Tema claro';

  return (
    <Tooltip label={label} side="bottom">
      <button
        type="button"
        aria-label={label}
        className="nx-btn nx-btn-ghost nx-btn-md w-10 px-0"
        onClick={() => {
          setTheme(next);
          try {
            localStorage.setItem('nexus-theme', next);
          } catch {
            /* almacenamiento bloqueado: el tema dura la sesión */
          }
        }}
      >
        {theme === 'dark' ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
      </button>
    </Tooltip>
  );
}
