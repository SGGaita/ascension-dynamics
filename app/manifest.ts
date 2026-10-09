import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { t } from "@/lib/design";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Ascension",
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: t.bg,
    theme_color: t.heroBg,
    icons: [{ src: "/icon-mark.png", sizes: "512x512", type: "image/png" }],
  };
}
