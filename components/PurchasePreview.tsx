"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogOverlay, DialogPortal } from "@radix-ui/react-dialog";
import { LuX, LuArrowUpRight, LuKeyboard, LuSlidersHorizontal, LuLayers } from "react-icons/lu";
import { LogoMark } from "./LogoMark";
export function PurchasePreview() {
  const [open,setOpen]=useState(false);
  useEffect(()=>{const show=()=>setOpen(true);window.addEventListener("luma:details",show);return()=>window.removeEventListener("luma:details",show);},[]);
  return <Dialog open={open} onOpenChange={setOpen}><DialogPortal><DialogOverlay className="dialog-overlay"/><DialogContent className="glass-dialog product-dialog"><div className="dialog-top"><LogoMark className="dialog-brand"/><DialogClose className="icon-button" aria-label="Close product details"><LuX/></DialogClose></div><p className="eyebrow">THOUGHTFULLY PUT TOGETHER</p><DialogTitle>Luma 75</DialogTitle><DialogDescription>Your everyday, with a little more feeling. A compact mechanical keyboard made for a desk that feels like you.</DialogDescription><div className="product-facts"><span><LuKeyboard/>75% layout<small>The essentials, beautifully arranged.</small></span><span><LuLayers/>Aluminum case<small>A solid foundation for your flow.</small></span><span><LuSlidersHorizontal/>Make it yours<small>Swappable switches. Six keycap palettes.</small></span></div><a className="button" href="#keycap-changer" onClick={()=>setOpen(false)}>Explore the palettes<LuArrowUpRight aria-hidden="true"/></a></DialogContent></DialogPortal></Dialog>;
}
