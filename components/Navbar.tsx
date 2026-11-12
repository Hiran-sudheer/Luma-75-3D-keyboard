"use client";
import { useState } from "react";
import Link from "next/link";
import { LuArrowUpRight, LuMenu, LuX } from "react-icons/lu";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogTrigger, DialogPortal, DialogOverlay } from "@radix-ui/react-dialog";
import { Logo } from "./Logo";
const links = [{href:"#features",label:"Overview",detail:"Considered in every detail"},{href:"#switch-playground",label:"The feel",detail:"Find your kind of click"},{href:"#keycap-changer",label:"Make it yours",detail:"Six ways to express yourself"}];
export function Navbar() {
  const [open,setOpen] = useState(false);
  return <><a className="skip-link" href="#main">Skip to content</a><header className="nav-wrap"><div className="glass-nav">
    <Link href="/" aria-label="Luma home"><Logo/></Link><span className="nav-product">Luma 75</span>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(link=><a key={link.href} href={link.href}>{link.label}</a>)}</nav>
    <a className="button button-small" href="#keycap-changer">Explore finishes <LuArrowUpRight aria-hidden="true"/></a>
    <Dialog open={open} onOpenChange={setOpen}><DialogTrigger className="menu-toggle" aria-label="Open navigation"><LuMenu/></DialogTrigger><DialogPortal><DialogOverlay className="dialog-overlay"/><DialogContent className="glass-dialog mobile-menu"><div className="dialog-top"><Logo/><DialogClose className="icon-button" aria-label="Close navigation"><LuX/></DialogClose></div><DialogTitle className="sr-only">Explore Luma</DialogTitle><DialogDescription className="eyebrow">A better place to begin.</DialogDescription><nav aria-label="Mobile navigation">{links.map(link=><a href={link.href} key={link.href} onClick={()=>setOpen(false)}><span>{link.label}<small>{link.detail}</small></span><LuArrowUpRight/></a>)}</nav></DialogContent></DialogPortal></Dialog>
  </div></header></>;
}
