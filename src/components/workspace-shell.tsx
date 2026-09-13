import { Link, useLocation } from "@tanstack/react-router";
import { Bell, Blocks, Bot, CircleDollarSign, CreditCard, Download, LayoutDashboard, LogOut, Menu, Plug, ReceiptText, Settings2, ShieldCheck, Tag, UserRound, UsersRound, X } from "lucide-react";
import { useState, type ComponentType } from "react";
import { Brand } from "./brand";
import { Button } from "./ui/button";

type NavItem = { label: string; to: string; icon: ComponentType<{className?:string}> };
const userNav: NavItem[] = [
  {label:"Overview",to:"/dashboard",icon:LayoutDashboard},{label:"Profile",to:"/dashboard/profile",icon:UserRound},{label:"Credits",to:"/dashboard/credits",icon:CreditCard},{label:"Subscription",to:"/dashboard/subscription",icon:ReceiptText},{label:"Payments",to:"/dashboard/payments",icon:CircleDollarSign},{label:"Connections",to:"/dashboard/connections",icon:Plug},{label:"Desktop app",to:"/dashboard/download",icon:Download},{label:"Notifications",to:"/dashboard/notifications",icon:Bell},
];
const adminNav: NavItem[] = [
  {label:"Overview",to:"/admin",icon:LayoutDashboard},{label:"Plans",to:"/admin/plans",icon:Blocks},{label:"Users",to:"/admin/users",icon:UsersRound},{label:"Payments",to:"/admin/payments",icon:CircleDollarSign},{label:"Pricing",to:"/admin/pricing",icon:ReceiptText},{label:"Coupons",to:"/admin/coupons",icon:Tag},{label:"AI providers",to:"/admin/providers",icon:Bot},{label:"Connectors",to:"/admin/connectors",icon:Plug},{label:"Notifications",to:"/admin/notifications",icon:Bell},{label:"Roles",to:"/admin/roles",icon:ShieldCheck},
];

export function WorkspacePage({ title, section, admin=false }: {title:string;section:string;admin?:boolean}) {
  const [open,setOpen]=useState(false); const location=useLocation(); const nav=admin?adminNav:userNav;
  return <div className="min-h-screen bg-background lg:grid lg:grid-cols-[260px_1fr]">
    <header className="flex h-16 items-center justify-between border-b border-foreground px-5 lg:hidden"><Brand/><Button size="icon" variant="outline" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</Button></header>
    <aside className={`${open?"flex":"hidden"} fixed inset-0 top-16 z-20 flex-col border-r border-foreground bg-background lg:sticky lg:top-0 lg:flex lg:h-screen`}>
      <div className="hidden h-20 items-center border-b border-foreground px-6 lg:flex"><Brand/></div>
      <div className="border-b border-foreground px-6 py-5"><p className="font-mono text-[11px] uppercase text-muted-foreground">{admin?"Administrative workshop":"User workshop"}</p><p className="mt-2 text-sm font-semibold">{admin?"Control register":"Project register"}</p></div>
      <nav className="flex-1 overflow-y-auto p-3" aria-label={admin?"Administration":"Workspace"}>{nav.map((item)=>{const active=location.pathname===item.to;const Icon=item.icon;return <Link key={item.to} to={item.to} onClick={()=>setOpen(false)} className={`mb-1 flex h-11 items-center gap-3 border-l-2 px-3 text-sm font-medium ${active?"border-primary bg-secondary text-foreground":"border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"}`}><Icon className="size-4"/>{item.label}</Link>})}</nav>
      <div className="border-t border-foreground p-3"><Button asChild variant="ghost" className="w-full justify-start"><Link to={admin?"/admin/login":"/login"}><LogOut/>Log out</Link></Button></div>
    </aside>
    <main className="min-w-0"><div className="border-b border-foreground px-5 py-4 lg:px-10"><span className="font-mono text-xs uppercase text-muted-foreground">{admin?"ADMIN":"WORKSPACE"} / {section}</span></div><section className="px-5 py-12 lg:px-10 lg:py-16"><div className="max-w-4xl"><p className="font-mono text-xs text-primary">SECTION / {section.toUpperCase()}</p><h1 className="mt-5 text-4xl font-bold sm:text-6xl">{title}</h1><div className="mt-12 border-y border-foreground py-10"><div className="flex items-start gap-5"><Settings2 className="mt-1 size-6 text-primary"/><div><h2 className="text-xl font-bold">Scheduled for a later build stage</h2><p className="mt-2 max-w-xl leading-7 text-muted-foreground">This page will be built in a later stage. Its place in the workspace is ready and the navigation structure is complete.</p></div></div></div></div></section></main>
  </div>;
}