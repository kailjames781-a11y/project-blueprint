import type { InputHTMLAttributes } from "react";
import { Input } from "./ui/input";

export function FormField({ label, error, hint, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string | undefined; hint?: string | undefined }) {
  const id = props.id ?? props.name;
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold">{label}</label>
      <Input id={id} aria-invalid={Boolean(error)} aria-describedby={error || hint ? `${id}-note` : undefined} {...props} />
      {(error || hint) && <p id={`${id}-note`} className={`font-mono text-xs ${error ? "text-destructive" : "text-muted-foreground"}`}>{error ?? hint}</p>}
    </div>
  );
}