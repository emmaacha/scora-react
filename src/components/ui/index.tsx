import {
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

// ── Badge ─────────────────────────────────────────────────────
type BadgeVariant =
  | "live"
  | "active"
  | "upcoming"
  | "done"
  | "open"
  | "system"
  | "purple";

const BADGE_STYLES: Record<BadgeVariant, string> = {
  live: "bg-red-500/20 text-vs-red border-red-500/30",
  active: "bg-green-500/20 text-vs-green border-green-500/30",
  upcoming: "bg-amber-500/20 text-vs-amber border-amber-500/30",
  done: "bg-zinc-700/30 text-vs-sub border-vs-border",
  open: "bg-blue-500/20 text-vs-blue border-blue-500/30",
  system: "bg-vs-lime/10 text-vs-lime border-vs-lime/30",
  purple: "bg-purple-500/20 text-vs-purple border-purple-500/30",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = "done", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full border",
        "font-body font-semibold text-[10px] tracking-widest uppercase",
        BADGE_STYLES[variant],
        variant === "live" && "animate-pulse-slow",
        className,
      )}
    >
      {variant === "live" && (
        <span className="w-1.5 h-1.5 rounded-full bg-vs-red" />
      )}
      {children}
    </span>
  );
}

// ── Button ────────────────────────────────────────────────────
type ButtonVariant = "primary" | "ghost" | "danger" | "subtle";

const BTN_STYLES: Record<ButtonVariant, string> = {
  primary: "bg-vs-lime text-vs-black hover:bg-yellow-300 border-transparent",
  ghost:
    "bg-transparent text-vs-sub border-vs-border hover:bg-white/5 hover:text-vs-text hover:border-vs-borderHv",
  danger: "bg-red-500/15 text-vs-red border-red-500/20 hover:bg-red-500/25",
  subtle:
    "bg-white/5 text-vs-sub border-vs-border hover:bg-white/10 hover:text-vs-text",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "ghost", size = "md", className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg border font-body font-semibold",
        "transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed",
        size === "sm" && "px-3 py-1.5 text-xs",
        size === "md" && "px-4 py-2 text-[13px]",
        size === "lg" && "px-5 py-2.5 text-sm",
        BTN_STYLES[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
);
Button.displayName = "Button";

// ── Card ──────────────────────────────────────────────────────
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: boolean;
}

export function Card({
  hover,
  padding = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-vs-card border border-vs-border rounded-xl overflow-hidden",
        "transition-all duration-150",
        hover && "hover:border-vs-borderHv hover:bg-vs-card/80 cursor-pointer",
        padding && "p-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-4 py-3.5 border-b border-vs-border flex items-center justify-between",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardBody({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

// ── Avatar ────────────────────────────────────────────────────
interface AvatarProps {
  initials: string;
  color?: string;
  size?: number;
  className?: string;
}

export function Avatar({
  initials,
  color = "#3B82F6",
  size = 34,
  className,
}: AvatarProps) {
  return (
    <div
      className={cn(
        "flex-shrink-0 flex items-center justify-center rounded-full font-head font-bold",
        className,
      )}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color + "22",
        border: `1.5px solid ${color}44`,
        fontSize: size * 0.34,
        color,
      }}
    >
      {initials}
    </div>
  );
}

// ── Chip / Filter pill ────────────────────────────────────────
interface ChipProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export function Chip({ children, active, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1 rounded-full border text-xs font-body font-semibold transition-all duration-150",
        active
          ? "bg-vs-lime/10 border-vs-lime/40 text-vs-lime"
          : "bg-white/5 border-vs-border text-vs-sub hover:border-vs-borderHv hover:text-vs-text",
      )}
    >
      {children}
    </button>
  );
}

// ── Divider ───────────────────────────────────────────────────
export function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-vs-border" />
      <span className="font-body font-semibold text-[10px] tracking-widest uppercase text-vs-muted">
        {label}
      </span>
      <div className="flex-1 h-px bg-vs-border" />
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}

export function StatCard({ label, value, sub, accent }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-4",
        accent
          ? "bg-vs-lime/6 border border-vs-lime/20"
          : "bg-vs-card border border-vs-border",
      )}
    >
      <p className="font-body font-semibold text-[10px] tracking-widest uppercase text-vs-muted mb-2">
        {label}
      </p>
      <p
        className={cn(
          "font-head text-4xl font-black leading-none",
          accent ? "text-vs-lime" : "text-vs-text",
        )}
      >
        {value}
      </p>
      {sub && <p className="font-body text-xs text-vs-muted mt-1">{sub}</p>}
    </div>
  );
}

// ── Live Dot ──────────────────────────────────────────────────
export function LiveDot({ size = 7 }: { size?: number }) {
  return (
    <span
      className="rounded-full bg-vs-red animate-pulse-slow flex-shrink-0"
      style={{ width: size, height: size }}
    />
  );
}

// ── Section Header ────────────────────────────────────────────
interface SectionHeaderProps {
  title: string;
  action?: string;
  onAction?: () => void;
  className?: string;
}

export function SectionHeader({
  title,
  action,
  onAction,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-3", className)}>
      <h2 className="font-head text-xl font-bold tracking-wide text-vs-text">
        {title}
      </h2>
      {action && (
        <button
          onClick={onAction}
          className="font-body font-medium text-sm text-vs-lime hover:text-yellow-300 transition-colors"
        >
          {action}
        </button>
      )}
    </div>
  );
}

// ── Input ─────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="font-body font-semibold text-[11px] tracking-widest uppercase text-vs-muted">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          "w-full bg-white/4 border border-vs-border rounded-lg px-3 py-2 text-[13px] font-body text-vs-text",
          "placeholder:text-vs-muted outline-none transition-colors",
          "focus:border-vs-lime/40",
          className,
        )}
        {...props}
      />
    </div>
  ),
);
Input.displayName = "Input";

// ── Select ────────────────────────────────────────────────────
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, className, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="font-body font-semibold text-[11px] tracking-widest uppercase text-vs-muted">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={cn(
          "w-full bg-white/4 border border-vs-border rounded-lg px-3 py-2 text-[13px] font-body text-vs-text",
          "outline-none transition-colors focus:border-vs-lime/40 [&>option]:bg-vs-card",
          className,
        )}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  ),
);
Select.displayName = "Select";

// ── Empty State ───────────────────────────────────────────────
export function EmptyState({
  icon,
  message,
}: {
  icon: string;
  message: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <span className="text-4xl mb-3 opacity-40">{icon}</span>
      <p className="font-body text-sm text-vs-muted">{message}</p>
    </div>
  );
}

// ── Perm Checkbox ─────────────────────────────────────────────
interface PermCheckboxProps {
  permission: string;
  checked: boolean;
  disabled?: boolean;
  onToggle: () => void;
}

export function PermCheckbox({
  permission,
  checked,
  disabled,
  onToggle,
}: PermCheckboxProps) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-150",
        "disabled:opacity-60 disabled:cursor-default",
        checked
          ? "bg-vs-lime/10 border-vs-lime/25"
          : "bg-white/3 border-vs-border hover:border-vs-borderHv",
      )}
    >
      <div
        className={cn(
          "w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all",
          checked
            ? "bg-vs-lime border-0"
            : "bg-transparent border-[1.5px] border-vs-borderHv",
        )}
      >
        {checked && (
          <span className="text-[9px] text-vs-black font-black">✓</span>
        )}
      </div>
      <span
        className={cn(
          "text-[11px] font-mono",
          checked ? "text-vs-text" : "text-vs-sub",
        )}
      >
        {permission}
      </span>
    </button>
  );
}
