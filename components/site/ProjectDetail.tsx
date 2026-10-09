"use client";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { DeviceDuo, Eyebrow, InsetCard, Laptop, OutlinePill, Phone, Reveal, SERIF } from "./ui";
import { useDesign } from "@/components/DesignProvider";
import type { Project } from "@/lib/projects";
import type { SiteSettings } from "@/lib/types";

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  const { t } = useDesign();
  return (
    <Reveal>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "280px 1fr" }, gap: { xs: 2, md: 6 }, py: { xs: 6, md: 8 }, borderTop: `1px solid ${t.line}` }}>
        <Typography sx={{ fontFamily: t.mono, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: t.muted, pt: 1 }}>{label}</Typography>
        <Box>{children}</Box>
      </Box>
    </Reveal>
  );
}

interface Props {
  project: Project;
  next?: Project;
  siteSettings?: SiteSettings;
}

export default function ProjectDetail({ project: p, next, siteSettings }: Props) {
  const { t, accentInk, accent } = useDesign();
  const contact = siteSettings?.contact;
  const host = p.liveUrl ? p.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";
  const panelBg = t.bgAlt;

  return (
    <>
      <SiteHeader settings={siteSettings?.navbar} phone={contact?.phone} overlay />
      <Box component="main" sx={{ bgcolor: t.bg }}>
        {/* hero card — same frame as the homepage hero */}
        <InsetCard orb="left" teal="right">
          <Container maxWidth="xl" sx={{ px: { xs: 3, md: 7 }, pt: { xs: 14, md: 17 }, pb: { xs: 6, md: 8 } }}>
            <Reveal>
              <Box component={Link} href="/#work" sx={{ fontFamily: t.mono, fontSize: 12.5, color: "rgba(255,255,255,0.65)", textDecoration: "none", letterSpacing: "0.04em", "&:hover": { color: "#fff" } }}>
                ← ALL WORK
              </Box>
              <Box sx={{ mt: 4 }}>
                <Eyebrow light>{p.category}</Eyebrow>
              </Box>
              <Typography variant="h1" sx={{ fontSize: { xs: "2.8rem", sm: "3.8rem", md: "5rem" }, fontWeight: 700, color: "#fff", lineHeight: 1.02, mb: 3 }}>
                {p.title}
                {p.client.trim().toLowerCase() !== p.title.trim().toLowerCase() && (
                  <Box component="span" sx={{ display: "block", fontFamily: SERIF, fontStyle: "italic", fontWeight: 700, fontSize: "0.62em", mt: 1, color: "rgba(255,255,255,0.92)" }}>
                    for {p.client}
                  </Box>
                )}
              </Typography>
              <Typography sx={{ fontSize: { xs: "1.05rem", md: "1.2rem" }, lineHeight: 1.6, color: "rgba(255,255,255,0.8)", maxWidth: 760 }}>
                {p.shortDesc}
              </Typography>
            </Reveal>

            {/* devices */}
            <Reveal delay={100}>
              <Box sx={{ maxWidth: 1000, mx: "auto", mt: { xs: 7, md: 9 } }}>
                <DeviceDuo desktop={p.images.desktop} mobile={p.images.mobile} alt={p.title} />
              </Box>
            </Reveal>

            {/* facts */}
            <Reveal delay={150}>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(5, 1fr)" }, gap: { xs: 3, md: 4 }, mt: { xs: 6, md: 8 }, pt: 3, borderTop: "1px solid rgba(255,255,255,0.16)" }}>
                {[{ k: "Client", v: p.client }, { k: "Year", v: p.year }, { k: "Period", v: p.period }, { k: "Status", v: p.status }].map((f) => (
                  <Box key={f.k}>
                    <Typography sx={{ fontFamily: t.mono, fontSize: 11.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", mb: 0.75 }}>{f.k}</Typography>
                    <Typography sx={{ color: "#fff", fontWeight: 600 }}>{f.v}</Typography>
                  </Box>
                ))}
                {p.liveUrl && (
                  <Box>
                    <Typography sx={{ fontFamily: t.mono, fontSize: 11.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", mb: 0.75 }}>Website</Typography>
                    <OutlinePill href={p.liveUrl} external>Visit {host.split("/")[0]} ↗</OutlinePill>
                  </Box>
                )}
              </Box>
            </Reveal>
          </Container>
        </InsetCard>

        <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 5 } }}>
          <Block label="Description">
            <Typography sx={{ fontSize: { xs: "1.05rem", md: "1.2rem" }, lineHeight: 1.65, color: t.ink, letterSpacing: "-0.01em", maxWidth: 900 }}>
              {p.description}
            </Typography>
          </Block>

          <Block label="Scope of work">
            <Box component="ol" sx={{ m: 0, p: 0, listStyle: "none", display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, columnGap: 6 }}>
              {p.scope.map((s, i) => (
                <Box component="li" key={s} sx={{ display: "flex", gap: 2, py: 1.75, borderBottom: `1px solid ${t.line}` }}>
                  <Typography sx={{ fontFamily: t.mono, fontSize: 12.5, color: accentInk, pt: 0.4, minWidth: 22 }}>{String(i + 1).padStart(2, "0")}</Typography>
                  <Typography sx={{ color: t.ink, fontSize: 16 }}>{s}</Typography>
                </Box>
              ))}
            </Box>
          </Block>
        </Container>

        {/* standalone device shots */}
        <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 5 }, my: { xs: 4, md: 8 } }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.9fr 1fr" }, gap: { xs: 3, md: 3 } }}>
            <Reveal>
              <Box sx={{ bgcolor: panelBg, borderRadius: `${t.radius * 1.5}px`, p: { xs: 3, md: 7 }, height: "100%", display: "flex", alignItems: "center" }}>
                <Laptop src={p.images.desktop} alt={`${p.title} on desktop`} />
              </Box>
            </Reveal>
            <Reveal delay={100}>
              <Box sx={{ bgcolor: t.heroBg, borderRadius: `${t.radius * 1.5}px`, p: { xs: 5, md: 7 }, height: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: `radial-gradient(70% 60% at 50% 40%, ${accent.color}33, transparent 70%)` }}>
                <Phone src={p.images.mobile} alt={`${p.title} on mobile`} sx={{ width: { xs: "56%", md: "62%" } }} />
              </Box>
            </Reveal>
          </Box>
        </Container>

        <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 5 }, pb: { xs: 8, md: 12 } }}>
          {p.features.length > 0 && (
            <Block label="Key features">
              <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none", display: "grid", gap: 1.5 }}>
                {p.features.map((f) => (
                  <Box component="li" key={f} sx={{ display: "flex", gap: 2, alignItems: "baseline", color: t.body, fontSize: 16 }}>
                    <Box component="span" sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: accentInk, flexShrink: 0, transform: "translateY(-2px)" }} />
                    {f}
                  </Box>
                ))}
              </Box>
            </Block>
          )}

          <Block label="Technology used">
            <Typography sx={{ fontFamily: t.display, fontWeight: t.displayWeight, letterSpacing: t.displayTracking, fontSize: { xs: "1.4rem", md: "1.8rem" }, lineHeight: 1.3, color: t.ink }}>
              {p.tech.map((x, i) => (
                <Box component="span" key={x}>
                  {x}
                  {i < p.tech.length - 1 && <Box component="span" sx={{ color: t.muted, mx: 1.5 }}>/</Box>}
                </Box>
              ))}
            </Typography>
          </Block>
        </Container>

        {next && (
          <InsetCard orb="right" teal="left">
            <Box
              component={Link}
              href={`/projects/${next.slug}`}
              sx={{
                display: "block", color: "#fff", textDecoration: "none", py: { xs: 9, md: 12 },
                "& .arrow": { transition: "transform .4s cubic-bezier(.2,.7,.2,1)" }, "&:hover .arrow": { transform: "translateX(16px)" },
              }}
            >
              <Container maxWidth="xl" sx={{ px: { xs: 3, md: 7 } }}>
                <Eyebrow light>Next project</Eyebrow>
                <Typography variant="h2" sx={{ color: "#fff", fontWeight: 700, fontSize: { xs: "2.4rem", md: "4rem" }, display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
                  {next.title}
                  <Box component="span" className="arrow" sx={{ fontFamily: SERIF, fontStyle: "italic", color: accent.color }}>→</Box>
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", mt: 2, maxWidth: 560 }}>{next.shortDesc}</Typography>
              </Container>
            </Box>
          </InsetCard>
        )}
      </Box>
      <SiteFooter email={contact?.email} phone={contact?.phone} />
    </>
  );
}
