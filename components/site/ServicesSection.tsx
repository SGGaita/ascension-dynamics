"use client";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useDesign } from "@/components/DesignProvider";
import { Emph, Eyebrow, InsetCard, Reveal, Squiggle } from "./ui";
import type { ServiceData } from "@/lib/types";

/** Numbered, icon-free service list on a dark inset card (same frame as the hero). */
export default function ServicesSection({ services }: { services: ServiceData[] }) {
  const { accent } = useDesign();
  return (
    <InsetCard id="services" orb="right" teal="left">
      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 7 }, py: { xs: 9, md: 14 } }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "0.8fr 1.2fr" }, gap: { xs: 5, md: 10 } }}>
          <Box sx={{ position: { md: "sticky" }, top: { md: 140 }, alignSelf: "start" }}>
            <Reveal>
              <Eyebrow light>Services</Eyebrow>
              <Typography variant="h2" sx={{ fontSize: { xs: "2.4rem", md: "3.4rem" }, fontWeight: 700, color: "#fff", mb: 3, lineHeight: 1.05 }}>
                What we
                <br />
                <Emph text="*do best*" />
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.75)", maxWidth: 420, fontSize: 16.5, mb: 4 }}>
                Website design, web & mobile app development and custom software — one senior team takes you from first workshop to launch, then keeps everything fast, secure and up to date.
              </Typography>
              <Box component={Link} href="/#contact" sx={{ display: "inline-flex", alignItems: "flex-end", gap: 1, color: "#fff", textDecoration: "none" }}>
                <Squiggle />
                <Box component="span" sx={{ fontSize: 15, fontWeight: 500, borderBottom: "1px solid rgba(255,255,255,0.5)", pb: 0.25, mb: 0.5 }}>Tell us what you need</Box>
              </Box>
            </Reveal>
          </Box>

          <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0, borderTop: "1px solid rgba(255,255,255,0.14)" }}>
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 40} y={16}>
                <Box
                  component="li"
                  sx={{
                    position: "relative",
                    display: "grid", gridTemplateColumns: { xs: "40px 1fr", md: "56px 1fr 1fr" }, gap: { xs: 2, md: 4 },
                    alignItems: "baseline", py: { xs: 2.75, md: 3.25 }, borderBottom: "1px solid rgba(255,255,255,0.14)",
                    transition: "padding .4s cubic-bezier(.2,.7,.2,1)",
                    "&:hover": { pl: { md: 2 } },
                    "&:hover .n": { color: accent.color },
                    "&:hover .t": { fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" },
                  }}
                >
                  <Typography className="n" sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "rgba(255,255,255,0.5)", transition: "color .3s" }}>
                    {String(i + 1).padStart(2, "0")}
                  </Typography>
                  <Typography className="t" variant="h3" component="h3" sx={{ fontSize: { xs: "1.3rem", md: "1.55rem" }, fontWeight: 700, color: "#fff" }}>
                    {s.title}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: 15.5, gridColumn: { xs: "2", md: "auto" } }}>{s.desc}</Typography>
                </Box>
              </Reveal>
            ))}
          </Box>
        </Box>
      </Container>
    </InsetCard>
  );
}
