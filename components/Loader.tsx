"use client";
import { Logo } from "./Logo";
export function Loader() {
  return <div className="scene-loader" role="status"><Logo/><div className="loader-keys" aria-hidden="true"><span/><span/><span/></div><p>Setting the scene</p></div>;
}
