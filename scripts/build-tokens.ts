// Genera src/styles/tokens.css desde design/tokens.json (copia del design system Nexus).
// Uso: bun run tokens
type Themed = string | Record<string, string>;
interface Token {
  name: string;
  value: Themed;
  usage?: string;
}
interface Tokens {
  color: { themes: { id: string }[]; tokens: Token[] };
  shadow: { tokens: Token[] };
  spacing: { tokens: Token[] };
  radius: { tokens: Token[] };
  type: { families: Record<string, string> };
}

const root = new URL('..', import.meta.url).pathname;
const t: Tokens = await Bun.file(root + 'design/tokens.json').json();
const first = t.color.themes[0]!.id;

const resolve = (v: string) => v.replace(/^\{(.+)\}$/, 'var(--$1)');
const pick = (tok: Token, theme: string) => (typeof tok.value === 'string' ? tok.value : (tok.value[theme] ?? tok.value[first]!));
const themed = [...t.color.tokens, ...t.shadow.tokens];
const block = (theme: string, onlyDiff: boolean) =>
  themed
    .filter((tok) => !onlyDiff || (typeof tok.value !== 'string' && tok.value[theme] !== undefined))
    .map((tok) => `  --${tok.name}: ${resolve(pick(tok, theme))};`)
    .join('\n');

const dark = block('dark', true);
const css = `/* Nexus: generado desde design/tokens.json con \`bun run tokens\`. No editar a mano. */
:root,
[data-theme="${first}"] {
  color-scheme: light;
${block(first, false)}
}

[data-theme="dark"] {
  color-scheme: dark;
${dark}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
${dark.replaceAll('\n  ', '\n    ').replace(/^  /, '    ')}
  }
}

:root {
${[...t.spacing.tokens, ...t.radius.tokens].map((tok) => `  --${tok.name}: ${tok.value};`).join('\n')}
${Object.entries(t.type.families)
  .map(([k, v]) => `  --font-${k}: ${v};`)
  .join('\n')}
}
`;
await Bun.write(root + 'src/styles/tokens.css', css);
console.log('src/styles/tokens.css actualizado');
