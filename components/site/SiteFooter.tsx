"use client";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { NAV_LINKS } from "./SiteHeader";
import { useDesign } from "@/components/DesignProvider";
import { CONTACT, SOCIALS, telHref } from "@/lib/contact";
import { Glows, SERIF } from "./ui";

interface FooterProps {
  email?: string;
  phone?: string;
}

export default function SiteFooter({ email = CONTACT.email, phone = CONTACT.phone }: FooterProps) {
  const { t, accent } = useDesign();
  return (
    <Box component="footer" sx={{ bgcolor: t.bg, pt: { xs: 0.75, md: 1.25 } }}>
     <Box sx={{ position: "relative", overflow: "hidden", bgcolor: t.heroBg, color: "#fff", pt: { xs: 8, md: 11 }, pb: 4 }}>
      <Glows orb="right" teal="left" />
      <Container maxWidth="xl" sx={{ position: "relative", px: { xs: 3, md: 7 } }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr" }, gap: { xs: 5, md: 6 }, mb: { xs: 8, md: 12 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
            <Box component="img" src="/logo-mark.png" alt="" sx={{ height: { xs: 56, md: 72 }, width: "auto" }} />
            <Typography sx={{ color: "rgba(255,255,255,0.65)", maxWidth: 320, fontSize: 15 }}>
              Websites, web & mobile apps and custom software — designed, built and cared for.
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontFamily: t.mono, fontSize: 11.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", mb: 2 }}>Explore</Typography>
            <Box sx={{ display: "grid", gap: 1 }}>
              {NAV_LINKS.map((l) => (
                <Box key={l.href} component={Link} href={l.href} sx={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", "&:hover": { color: "#fff" } }}>{l.label}</Box>
              ))}
            </Box>
          </Box>
          <Box>
            <Typography sx={{ fontFamily: t.mono, fontSize: 11.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", mb: 2 }}>Say hello</Typography>
            <Box component="a" href={`mailto:${email}`} sx={{ color: "#fff", textDecoration: "none", borderBottom: `1px solid ${accent.color}`, pb: 0.25 }}>{email}</Box>
            <Box component="a" href={telHref(phone)} sx={{ display: "block", mt: 1.5, color: "rgba(255,255,255,0.8)", textDecoration: "none", fontWeight: 700, fontSize: 20, letterSpacing: "-0.01em", "&:hover": { color: "#fff" } }}>{phone}</Box>
          </Box>
        </Box>

        {/* oversized wordmark */}
        <Typography
          aria-hidden
          sx={{
            fontFamily: t.display, fontWeight: t.displayWeight, letterSpacing: "-0.05em", lineHeight: 0.85,
            fontSize: { xs: "16vw", md: "12vw" }, whiteSpace: "nowrap", color: "#fff", opacity: 0.92, ml: "-0.04em",
          }}
        >
          Ascension<Box component="span" sx={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 700, color: accent.color }}>.</Box>
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2, mt: 4, pt: 3, borderTop: "1px solid rgba(255,255,255,0.12)", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
          <span>© {new Date().getFullYear()} Ascension Dynamics Ltd.</span>
          <Box component="nav" aria-label="Social media" sx={{ display: "flex", gap: 2.5, flexWrap: "wrap" }}>
            {SOCIALS.map((s) => (
              <Box key={s.label} component="a" href={s.href} target="_blank" rel="noopener noreferrer" sx={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", "&:hover": { color: "#fff" } }}>
                {s.label}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
     </Box>
    </Box>
  );
}
