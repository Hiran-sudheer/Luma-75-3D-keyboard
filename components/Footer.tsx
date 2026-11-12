import Link from "next/link";
import { Logo } from "./Logo";
export function Footer() {
  return <footer className="site-footer"><div className="footer-top"><div><Link href="/" aria-label="Luma home"><Logo/></Link><p>Less noise. More you.</p></div><nav aria-label="Footer navigation"><a href="#features">The details</a><a href="#switch-playground">The feel</a><a href="#keycap-changer">The finishes</a><a href="#main">Back to top &uarr;</a></nav></div><div className="footer-bottom"><span>&copy; {new Date().getFullYear()} Luma Studio</span><span>Designed for a more considered desk.</span><span>Independent by design.</span></div></footer>;
}
