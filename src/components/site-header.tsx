import { Link } from "@tanstack/react-router";
import { Brand } from "./brand";
import { Button } from "./ui/button";

export function SiteHeader() {
  return (
    <header className="border-b border-foreground bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Brand />
        <nav className="flex items-center gap-2" aria-label="Account navigation">
          <Button asChild variant="ghost" className="hidden sm:inline-flex"><Link to="/login">Log in</Link></Button>
          <Button asChild><Link to="/register">Create account</Link></Button>
        </nav>
      </div>
    </header>
  );
}