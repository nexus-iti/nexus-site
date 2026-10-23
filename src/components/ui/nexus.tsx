// Componentes del design system Nexus (copia de components/src/index.tsx del artifact). Estilos en src/styles/nexus-components.css.
import * as React from 'react';

const cx = (...c: unknown[]) => c.filter((x): x is string => typeof x === 'string' && x !== '').join(' ');

/* Íconos internos (trazo 2px, estilo lucide). Para iconos de producto usar lucide-react. */
type IconName = 'check' | 'info' | 'success' | 'warning' | 'danger' | 'x';
const ICON_PATHS: Record<IconName, string[]> = {
  check: ['M20 6 9 17l-5-5'],
  info: ['M12 16v-4', 'M12 8h.01', 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z'],
  success: ['M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z', 'm9 12 2 2 4-4'],
  warning: ['m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z', 'M12 9v4', 'M12 17h.01'],
  danger: ['M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z', 'm15 9-6 6', 'm9 9 6 6'],
  x: ['M18 6 6 18', 'm6 6 12 12'],
};
function Icon({ name, size = 16 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function useId(prefix: string, given?: string) {
  const auto = React.useId();
  return given ?? `${prefix}-${auto.replace(/:/g, '')}`;
}

/* ---------------- Button ---------------- */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}
/** La acción. Primary una sola vez por vista; secondary para el resto; ghost para acciones terciarias. */
export function Button({
  variant = 'secondary',
  size = 'md',
  leadingIcon,
  trailingIcon,
  loading = false,
  fullWidth = false,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx('nx-btn', `nx-btn-${variant}`, `nx-btn-${size}`, fullWidth && 'nx-btn-full', className)}
    >
      {loading ? <span className="nx-spinner" aria-hidden="true" /> : leadingIcon}
      {children != null && <span className="nx-btn-label">{children}</span>}
      {!loading && trailingIcon}
    </button>
  );
}

/* ---------------- Input ---------------- */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
}
/** Campo de texto con label, ayuda y error. multiline lo vuelve textarea. */
export function Input({ label, hint, error, leadingIcon, multiline = false, rows = 4, id, className, ...rest }: InputProps) {
  const fid = useId('nx-input', id);
  const describedBy = error ? `${fid}-error` : hint ? `${fid}-hint` : undefined;
  const common = { id: fid, 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy, className: 'nx-input-control' };
  return (
    <div className={cx('nx-field', error && 'nx-field-invalid', className)}>
      {label && (
        <label className="nx-field-label" htmlFor={fid}>
          {label}
        </label>
      )}
      <div className={cx('nx-input', leadingIcon && 'nx-input-has-icon', multiline && 'nx-input-multiline')}>
        {leadingIcon && <span className="nx-input-icon">{leadingIcon}</span>}
        {multiline ? (
          <textarea {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} {...common} rows={rows} />
        ) : (
          <input {...rest} {...common} />
        )}
      </div>
      {error ? (
        <p className="nx-field-error" id={`${fid}-error`}>
          <Icon name="danger" size={14} />
          {error}
        </p>
      ) : (
        hint && (
          <p className="nx-field-hint" id={`${fid}-hint`}>
            {hint}
          </p>
        )
      )}
    </div>
  );
}

/* ---------------- Checkbox ---------------- */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
  description?: React.ReactNode;
}
/** Opción independiente que se confirma con un botón. */
export function Checkbox({ label, description, id, className, ...rest }: CheckboxProps) {
  const fid = useId('nx-check', id);
  return (
    <label className={cx('nx-check', className)} htmlFor={fid}>
      <span className="nx-check-box">
        <input {...rest} id={fid} type="checkbox" />
        <span className="nx-check-mark">
          <Icon name="check" size={14} />
        </span>
      </span>
      <span className="nx-check-text">
        <span className="nx-check-label">{label}</span>
        {description && <span className="nx-check-desc">{description}</span>}
      </span>
    </label>
  );
}

/* ---------------- Switch ---------------- */
export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label: React.ReactNode;
  disabled?: boolean;
  id?: string;
}
/** Ajuste que aplica en el momento, sin botón de guardar. */
export function Switch({ checked, defaultChecked = false, onChange, label, disabled, id }: SwitchProps) {
  const fid = useId('nx-switch', id);
  const [inner, setInner] = React.useState(defaultChecked);
  const on = checked ?? inner;
  const toggle = () => {
    if (checked === undefined) setInner(!on);
    onChange?.(!on);
  };
  return (
    <span className="nx-switch-row">
      <button
        type="button"
        role="switch"
        id={fid}
        aria-checked={on}
        aria-labelledby={`${fid}-label`}
        disabled={disabled}
        className="nx-switch"
        onClick={toggle}
      >
        <span className="nx-switch-thumb" />
      </button>
      <label htmlFor={fid} id={`${fid}-label`} className="nx-switch-label">
        {label}
      </label>
    </span>
  );
}

/* ---------------- Badge ---------------- */
export interface BadgeProps {
  tone?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
  dot?: boolean;
  children?: React.ReactNode;
}
/** Una o dos palabras de estado o categoría. */
export function Badge({ tone = 'neutral', dot = false, children }: BadgeProps) {
  return (
    <span className={cx('nx-badge', `nx-badge-${tone}`)}>
      {dot && <span className="nx-badge-dot" aria-hidden="true" />}
      {children}
    </span>
  );
}

/* ---------------- Card ---------------- */
export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: 'outline' | 'elevated' | 'brand';
  interactive?: boolean;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
}
/** Contenedor de un bloque de contenido. Outline por defecto; elevated para destacar; brand solo en marketing. */
export function Card({
  variant = 'outline',
  interactive = false,
  eyebrow,
  title,
  description,
  footer,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div {...rest} className={cx('nx-card', `nx-card-${variant}`, interactive && 'nx-card-interactive', className)}>
      {eyebrow && <p className="nx-card-eyebrow">{eyebrow}</p>}
      {title && <h3 className="nx-card-title">{title}</h3>}
      {description && <p className="nx-card-desc">{description}</p>}
      {children}
      {footer && <div className="nx-card-footer">{footer}</div>}
    </div>
  );
}

/* ---------------- Avatar ---------------- */
export interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
}
/** Persona u organización: foto o iniciales. */
export function Avatar({ name, src, size = 'md' }: AvatarProps) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
  return (
    <span className={cx('nx-avatar', `nx-avatar-${size}`)} title={name}>
      {src ? <img src={src} alt={name} /> : <span aria-label={name}>{initials}</span>}
    </span>
  );
}

/* ---------------- Tabs ---------------- */
export interface TabItem {
  id: string;
  label: React.ReactNode;
  content?: React.ReactNode;
}
export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
}
/** Vistas hermanas del mismo contenido. Flechas izquierda/derecha para moverse. */
export function Tabs({ items, value, defaultValue, onChange }: TabsProps) {
  const base = useId('nx-tabs');
  const [inner, setInner] = React.useState(defaultValue ?? items[0]?.id);
  const active = value ?? inner;
  const select = (id: string) => {
    if (value === undefined) setInner(id);
    onChange?.(id);
  };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    const next = items[(i + d + items.length) % items.length]!;
    select(next.id);
    (document.getElementById(`${base}-${next.id}`) as HTMLElement | null)?.focus();
  };
  const current = items.find((t) => t.id === active);
  return (
    <div className="nx-tabs">
      <div role="tablist" className="nx-tablist">
        {items.map((t, i) => (
          <button
            key={t.id}
            id={`${base}-${t.id}`}
            role="tab"
            type="button"
            aria-selected={t.id === active}
            tabIndex={t.id === active ? 0 : -1}
            aria-controls={`${base}-panel`}
            className="nx-tab"
            onClick={() => select(t.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {current?.content != null && (
        <div role="tabpanel" id={`${base}-panel`} aria-labelledby={`${base}-${current.id}`} className="nx-tabpanel">
          {current.content}
        </div>
      )}
    </div>
  );
}

/* ---------------- Alert ---------------- */
export interface AlertProps {
  tone?: 'info' | 'success' | 'warning' | 'danger';
  title?: React.ReactNode;
  children?: React.ReactNode;
  onDismiss?: () => void;
}
/** Mensaje de estado dentro del flujo de la página. Siempre con icono y título o texto. */
export function Alert({ tone = 'info', title, children, onDismiss }: AlertProps) {
  return (
    <div className={cx('nx-alert', `nx-alert-${tone}`)} role={tone === 'danger' ? 'alert' : 'status'}>
      <span className="nx-alert-icon">
        <Icon name={tone} size={20} />
      </span>
      <div className="nx-alert-body">
        {title && <p className="nx-alert-title">{title}</p>}
        {children && <div className="nx-alert-text">{children}</div>}
      </div>
      {onDismiss && (
        <button type="button" className="nx-alert-close" aria-label="Cerrar" onClick={onDismiss}>
          <Icon name="x" size={16} />
        </button>
      )}
    </div>
  );
}

/* ---------------- Tooltip ---------------- */
export interface TooltipProps {
  label: React.ReactNode;
  side?: 'top' | 'bottom';
  children: React.ReactNode;
}
/** Texto breve que nombra un control solo-icono o un atajo. Aparece con hover y foco. */
export function Tooltip({ label, side = 'top', children }: TooltipProps) {
  const tid = useId('nx-tip');
  return (
    <span className={cx('nx-tooltip', `nx-tooltip-${side}`)} aria-describedby={tid}>
      {children}
      <span role="tooltip" id={tid} className="nx-tooltip-bubble">
        {label}
      </span>
    </span>
  );
}

/* ---------------- Kbd ---------------- */
export interface KbdProps {
  keys: string[];
}
/** Atajo de teclado visible, en la familia tech. */
export function Kbd({ keys }: KbdProps) {
  return (
    <span className="nx-kbd-group">
      {keys.map((k, i) => (
        <React.Fragment key={k + i}>
          {i > 0 && <span className="nx-kbd-plus">+</span>}
          <kbd className="nx-kbd">{k}</kbd>
        </React.Fragment>
      ))}
    </span>
  );
}
