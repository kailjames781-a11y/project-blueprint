import type { ReactNode } from "react";
import { Brand } from "./brand";

export function AuthFrame({ index, title, summary, children, aside }: { index: string; title: string; summary: string; children: ReactNode; aside: ReactNode }) {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px]">
        <section className="flex flex-col border-foreground px-5 py-6 lg:border-r lg:px-12 lg:py-10">
          <Brand />
          <div className="my-auto max-w-xl py-14">
            <p className="mb-8 font-mono text-xs uppercase text-primary">SPEC / {index}</p>
            <h1 className="max-w-lg text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">{summary}</p>
            <div className="mt-10 max-w-md">{children}</div>
          </div>
        </section>
        <aside className="relative hidden overflow-hidden bg-secondary p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="font-mono text-xs uppercase text-muted-foreground">PROJECT ACCESS RECORD</div>
          {aside}
          <div className="border-t border-foreground pt-4 font-mono text-xs">ZERUVO / BUILD SYSTEM</div>
        </aside>
      </div>
    </main>
  );
}