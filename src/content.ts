// Todo el texto del sitio en un solo lugar.

export const links = {
  app: 'https://app.nexus.wefaber.net',
  github: 'https://github.com/nexus-iti',
  docs: 'https://github.com/nexus-iti/nexus-docs',
  gravida: 'https://github.com/nexus-iti/gravida',
} as const;

export const nav = [
  { href: '#que-hacemos', label: 'Qué hacemos' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#sistema', label: 'Sistema' },
  { href: '#principios', label: 'Principios' },
] as const;

export type Shape = 'circle' | 'triangle' | 'diamond';

export const pillars: { shape: Shape; eyebrow: string; title: string; text: string }[] = [
  {
    shape: 'circle',
    eyebrow: 'Diseño y UX',
    title: 'La interfaz es el producto',
    text: 'Cada pantalla parte de la tarea del usuario, con un sistema de diseño propio y consistente.',
  },
  {
    shape: 'triangle',
    eyebrow: 'Integraciones con AI',
    title: 'AI donde aporta',
    text: 'Automatiza lo repetitivo, explica lo que hace y siempre se puede deshacer.',
  },
  {
    shape: 'diamond',
    eyebrow: 'Productividad',
    title: 'Menos clics',
    text: 'Estados claros y atajos visibles. Herramientas que se adaptan al flujo del equipo.',
  },
];

export const releases = [
  { version: 'v0.1.0', title: 'Prototipo front estático', stage: '1ra entrega' },
  { version: 'v0.2.0', title: 'API PHP y base de datos', stage: '2da entrega' },
  { version: 'v0.3.0', title: 'Administración, roles y recuperación', stage: '2da entrega 2.0' },
  { version: 'v0.4.0', title: 'API segura y pruebas', stage: '2da entrega 3.0' },
  { version: 'v0.5.0', title: 'Integración de ciberseguridad', stage: '2da entrega 4.0' },
  { version: 'v1.0.0', title: 'Arquitectura por capas, i18n y despliegue', stage: '3ra entrega' },
] as const;

export const nexusFeatures = [
  'Pedido de recursos',
  'Coordinación de servicios',
  'Soporte técnico',
  'Inventario',
  'Trabajo técnico-administrativo',
] as const;

export const principles: { title: string; text: string }[] = [
  {
    title: 'Diseño primero',
    text: 'La interfaz es el producto. Cada pantalla se piensa desde la tarea del usuario, no desde la base de datos.',
  },
  {
    title: 'AI útil, no decorativa',
    text: 'La inteligencia artificial aparece donde ahorra pasos reales; se explica qué hace y se puede deshacer.',
  },
  {
    title: 'Productividad sin fricción',
    text: 'Menos clics, estados claros, atajos visibles.',
  },
  {
    title: 'Geometría amable',
    text: 'Formas simples (círculo, triángulo, rombo) y curvas suaves, como las de la N.',
  },
];

export const palette = [
  { name: 'violet-600', hex: '#5D12D2', role: 'Identidad, acción primaria', ink: 'var(--blush-50)' },
  { name: 'violet-400', hex: '#B931FC', role: 'Isotipo, acentos', ink: '#12062b' },
  { name: 'pink-400', hex: '#FF6AC2', role: 'Pattern, decoración', ink: '#1b0b3a' },
  { name: 'blush-50', hex: '#FFE5E5', role: 'Fondo, texto sobre violeta', ink: '#1b0b3a' },
] as const;
