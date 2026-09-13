import { Link } from "@tanstack/react-router";

export function Brand() {
  return (
    <Link to="/" className="inline-flex items-center gap-3 font-display text-xl font-bold" aria-label="Zeruvo home">
      <span className="grid size-7 place-items-center border-2 border-foreground font-mono text-xs">Z</span>
      ZERUVO
    </Link>
  );
}