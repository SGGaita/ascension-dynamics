"use client";
import Link from "next/link";
import Box from "@mui/material/Box";
import { useDesign } from "@/components/DesignProvider";

interface BrandLogoProps {
  /** Height of the AD mark in px (desktop). Mobile scales down ~20%. */
  height?: number;
  src?: string;
  companyName?: string;
  showText?: boolean;
  /** White text for use on dark backgrounds. */
  inverse?: boolean;
}

/** AD mark + company name set as real text (the logo file's baked-in white text is cropped off). */
export default function BrandLogo({ height = 56, src = "/logo-mark.png", companyName = "Ascension Dynamics", showText = true, inverse = false }: BrandLogoProps) {
  const { t } = useDesign();
  const [first, ...rest] = companyName.replace(".", " ").split(" ");
  return (
    <Box
      component={Link}
      href="/"
      aria-label={`${companyName.replace(".", " ")} - home`}
      sx={{ display: "inline-flex", alignItems: "center", gap: 1.5, textDecoration: "none", color: inverse ? "#fff" : t.ink, transition: "color .3s" }}
    >
      <Box component="img" src={src} alt="" sx={{ height: { xs: Math.round(height * 0.8), md: height }, width: "auto", display: "block", flexShrink: 0 }} />
      {showText && (
        <Box component="span" sx={{ fontFamily: t.sans, fontSize: { xs: "1rem", md: "1.12rem" }, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
          <Box component="span" sx={{ fontWeight: 700, display: "block" }}>{first}</Box>
          <Box component="span" sx={{ fontWeight: 400, display: "block", opacity: 0.75 }}>{rest.join(" ")}</Box>
        </Box>
      )}
    </Box>
  );
}
