"use client";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { LuArrowUpRight } from "react-icons/lu";
import { FadeIn } from "@/components/FadeIn";
const PurchaseButton: FC<SliceComponentProps<Content.PurchaseButtonSlice>> = ({slice}) => <section className="closing-section" id="buy-button"><FadeIn><p className="eyebrow">{slice.primary.eyebrow}</p><h2><PrismicText field={slice.primary.heading}/></h2><div className="closing-description"><PrismicRichText field={slice.primary.body}/></div><a href="#keycap-changer" className="button">{slice.primary.button_text}<LuArrowUpRight aria-hidden="true"/></a><a className="secondary-link" href="#switch-playground">Or find your kind of click &rarr;</a></FadeIn></section>;
export default PurchaseButton;
