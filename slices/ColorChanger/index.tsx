"use client";
import { FC, useCallback, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { Canvas } from "@react-three/fiber";
import { LuCheck } from "react-icons/lu";
import { Scene } from "./Scene";
export const KEYCAP_TEXTURES = [
  {id:"goodwell",name:"Glacier",path:"/goodwell_uv.png",knobColor:"#9d8cdd",colors:["#f0eee9","#86b9df","#df5528"]},
  {id:"dreamboard",name:"Bloom",path:"/dreamboard_uv.png",knobColor:"#E9759F",colors:["#f3e7ee","#eda4bf","#89c2d4"]},
  {id:"cherrynavy",name:"Midnight",path:"/cherrynavy_uv.png",knobColor:"#F06B7E",colors:["#29364c","#55718b","#e5909c"]},
  {id:"kick",name:"Signal",path:"/kick_uv.png",knobColor:"#FD0A0A",colors:["#d5d9c0","#4d6352","#dc352e"]},
  {id:"oldschool",name:"Linen",path:"/oldschool_uv.png",knobColor:"#B89D82",colors:["#e4dace","#a99b88","#66634f"]},
  {id:"candykeys",name:"Sorbet",path:"/candykeys_uv.png",knobColor:"#F38785",colors:["#f2d9d6","#a9cdbd","#eac5e1"]},
];
const ColorChanger: FC<SliceComponentProps<Content.ColorChangerSlice>> = ({slice}) => {
  const [selectedTextureId,setSelectedTextureId]=useState(KEYCAP_TEXTURES[0].id);
  const [isAnimating,setIsAnimating]=useState(false);
  const selected=KEYCAP_TEXTURES.find(t=>t.id===selectedTextureId)!;
  const onComplete=useCallback(()=>setIsAnimating(false),[]);
  return <section className="color-section" id="keycap-changer" aria-label="Choose your keycap finish">
    <div className="color-heading"><p className="eyebrow">SIX PALETTES. ONE OF A KIND.</p><h2 className="section-heading"><PrismicText field={slice.primary.heading}/></h2><div className="section-description"><PrismicRichText field={slice.primary.description}/></div></div>
    <div className="color-viewer"><span className="colorway-word" aria-hidden="true">{selected.name}</span><Canvas camera={{position:[0,0.5,0.5],fov:45,zoom:1.5}}><Scene selectedTextureId={selectedTextureId} onAnimationComplete={onComplete}/></Canvas><span className="viewer-note">LUMA 75 <span/> {selected.name.toUpperCase()} EDITION</span></div>
    <div className="finish-dock"><div className="finish-dock-label"><span className="eyebrow">YOUR PALETTE</span><strong aria-live="polite">{selected.name}<small>{String(KEYCAP_TEXTURES.indexOf(selected)+1).padStart(2,"0")} / 06</small></strong></div><div className="finish-options" role="group" aria-label="Keycap palettes">{KEYCAP_TEXTURES.map(t=><button key={t.id} disabled={isAnimating} aria-pressed={t.id===selectedTextureId} onClick={()=>{if(t.id!==selectedTextureId){setIsAnimating(true);setSelectedTextureId(t.id);}}}><span className="palette-sample">{t.colors.map(c=><i key={c} style={{background:c}}/>)}{t.id===selectedTextureId&&<span className="palette-check"><LuCheck/></span>}</span><span>{t.name}</span></button>)}</div></div>
  </section>;
};
export default ColorChanger;
