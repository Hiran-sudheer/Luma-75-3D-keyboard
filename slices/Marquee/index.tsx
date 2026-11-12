import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { LogoMark } from "@/components/LogoMark";
const Marquee: FC<SliceComponentProps<Content.MarqueeSlice>> = ({slice}) => <div className="quality-strip" aria-label="The Luma philosophy">{slice.primary.phrases.map((item,i)=><span key={i}><LogoMark/>{item.text}</span>)}</div>;
export default Marquee;
