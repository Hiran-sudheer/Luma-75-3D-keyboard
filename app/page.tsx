import { SliceZone } from "@prismicio/react";
import type { Content } from "@prismicio/client";
import { components } from "@/slices";
import homepage from "@/reference/homepage.json";

export default function Page() {
  return <SliceZone slices={homepage.slices as unknown as Content.HomepageDocument["data"]["slices"]} components={components} />;
}
