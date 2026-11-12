import { LogoMark } from "./LogoMark";
export function Logo({ className = "" }: { className?: string }) {
  return <span className={`brand ${className}`}><LogoMark className="brand-mark"/><span>luma<span className="brand-dot">.</span></span></span>;
}
