"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { useDesign } from "@/components/DesignProvider";
import { DeviceDuo, Emph, Eyebrow, Glows, Reveal } from "./ui";
import type { Project } from "@/lib/projects";

/** Sticky offset of the first card, and the extra offset each following card gets (so edges peek out). */
const STICK_TOP = 104;
const STEP = 18;

function Label({ children }: { children: React.ReactNode }) {
  const { t } = useDesign();
  return (
    <Typography sx={{ fontFamily: t.mono, fontSize: 11, letterSpacing: "0.07em", textTransform: "uppercase", color: t.muted, mb: 1 }}>
      {children}
    </Typography>
  );
}

function ProjectCard({ project: p, index, total }: { project: Project; index: number; total: number }) {
  const { t, accent, accentInk } = useDesign();
  return (
    <Box
      className="stack-card"
      sx={{
        position: "relative",
        height: { md: `min(620px, calc(100vh - ${STICK_TOP + STEP * total + 24}px))` },
        minHeight: { md: 520 },
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "0.92fr 1.08fr" },
        bgcolor: t.surface,
        border: `1px solid ${t.line}`,
        borderRadius: `${t.radius + 8}px`,
        overflow: "hidden",
        boxShadow: "0 -12px 40px -24px rgba(42,37,33,0.35)",
        transformOrigin: "50% 0%",
        willChange: "transform",
      }}
    >
      {/* details */}
      <Box sx={{ order: { xs: 2, md: 1 }, p: { xs: 3, md: 5 }, display: "flex", flexDirection: "column", minHeight: 0 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", columnGap: 2, rowGap: 0.5, mb: { xs: 2, md: 3 } }}>
          <Typography sx={{ fontFamily: t.mono, fontSize: 12, color: accentInk }}>
            {String(index + 1).padStart(2, "0")} <Box component="span" sx={{ color: t.muted }}>/ {String(total).padStart(2, "0")}</Box>
          </Typography>
          <Typography sx={{ fontFamily: t.mono, fontSize: 11.5, letterSpacing: "0.06em", textTransform: "uppercase", color: t.muted }}>
            {p.category}
          </Typography>
        </Box>

        <Typography variant="h3" component="h3" sx={{ fontSize: { xs: "1.9rem", md: "2.5rem" }, fontWeight: 700, color: t.ink, mb: 1.5 }}>
          {p.title}
        </Typography>
        <Typography sx={{ color: t.body, fontSize: { xs: 15.5, md: 16.5 }, lineHeight: 1.55, mb: { xs: 3, md: 3.5 }, maxWidth: 520 }}>
          {p.shortDesc}
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: { xs: 2.5, md: 3 }, mb: 3 }}>
          <Box>
            <Label>Year · Period</Label>
            <Typography sx={{ color: t.ink, fontSize: 14.5 }}>
              <strong>{p.year}</strong> · {p.period}
            </Typography>
          </Box>
          <Box>
            <Label>Technology</Label>
            <Typography sx={{ color: t.ink, fontSize: 14.5, lineHeight: 1.55 }}>{p.tech.slice(0, 5).join(" · ")}</Typography>
          </Box>
          <Box sx={{ gridColumn: "1 / -1" }}>
            <Label>Scope of work</Label>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
              {p.scope.slice(0, 5).map((s, si) => (
                <Box key={s} component="span" sx={{ display: { xs: si > 2 ? "none" : "inline-block", md: "inline-block" }, fontSize: 13, color: t.body, border: `1px solid ${t.line}`, borderRadius: 999, px: 1.25, py: 0.4 }}>
                  {s}
                </Box>
              ))}
              {p.scope.length > 3 && (
                <Box component="span" sx={{ display: { xs: "inline-block", md: "none" }, fontSize: 13, color: t.muted, px: 0.5, py: 0.4 }}>+{p.scope.length - 3}</Box>
              )}
              {p.scope.length > 5 && (
                <Box component="span" sx={{ display: { xs: "none", md: "inline-block" }, fontSize: 13, color: t.muted, px: 0.5, py: 0.4 }}>+{p.scope.length - 5}</Box>
              )}
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: "auto", display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
          <ButtonBase
            component={Link}
            href={`/projects/${p.slug}`}
            sx={{
              px: 2.5, py: 1.2, borderRadius: 999, bgcolor: t.ink, color: "#fff", fontSize: 14.5, fontWeight: 600, fontFamily: t.sans, gap: 1,
              "& .dot": { width: 6, height: 6, borderRadius: "50%", bgcolor: accent.color, transition: "transform .3s" },
              "&:hover .dot": { transform: "scale(1.7)" },
            }}
          >
            View case study <span className="dot" />
          </ButtonBase>
          {p.liveUrl && (
            <Box component="a" href={p.liveUrl} target="_blank" rel="noopener noreferrer" sx={{ color: t.ink, fontSize: 14.5, fontWeight: 500, textDecoration: "none", borderBottom: `1px solid ${t.line}`, "&:hover": { borderColor: accentInk } }}>
              Visit site ↗
            </Box>
          )}
        </Box>
      </Box>

      {/* devices on a dark, gridded panel */}
      <Box
        component={Link}
        href={`/projects/${p.slug}`}
        aria-label={`${p.title} case study`}
        sx={{
          order: { xs: 1, md: 2 }, position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
          bgcolor: t.heroBg, overflow: "hidden", px: { xs: 3, md: 5 }, py: { xs: 5, md: 4 },
          backgroundImage: `radial-gradient(60% 55% at 55% 45%, ${accent.color}26, transparent 70%),
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "auto, 40px 40px, 40px 40px",
          "& .duo": { transition: "transform 1s cubic-bezier(.2,.7,.2,1)" },
          "&:hover .duo": { transform: "translateY(-8px) scale(1.02)" },
        }}
      >
        <Glows orb={index % 2 ? "right" : "left"} />
        <Box className="duo" sx={{ position: "relative", width: "100%", maxWidth: 560 }}>
          <DeviceDuo desktop={p.images.desktop} mobile={p.images.mobile} alt={p.title} />
        </Box>
      </Box>
    </Box>
  );
}

export default function WorkSection({ projects }: { projects: Project[] }) {
  const { t } = useDesign();
  const listRef = useRef<HTMLDivElement>(null);

  // As each card is covered by the next, scale it down and dim it slightly.
  useEffect(() => {
    const list = listRef.current;
    if (!list || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wrappers = Array.from(list.querySelectorAll<HTMLElement>(":scope > .stack-slot"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const desktop = window.matchMedia("(min-width: 900px)").matches;
      wrappers.forEach((w, i) => {
        const card = w.firstElementChild as HTMLElement | null;
        if (!card) return;
        const next = wrappers[i + 1];
        let p = 0;
        if (desktop && next) {
          const r = w.getBoundingClientRect();
          const n = next.getBoundingClientRect();
          p = Math.min(1, Math.max(0, (r.top + r.height - n.top) / r.height));
        }
        card.style.transform = p ? `scale(${1 - p * 0.05})` : "";
        card.style.filter = p ? `brightness(${1 - p * 0.12})` : "";
      });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [projects.length]);

  return (
    <Box component="section" id="work" sx={{ pt: { xs: 10, md: 14 }, pb: { xs: 10, md: 14 }, bgcolor: t.bg }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 5 } }}>
        <Reveal>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 4, flexWrap: "wrap", mb: { xs: 5, md: 7 } }}>
            <Box>
              <Eyebrow index={`(${String(projects.length).padStart(2, "0")})`}>Selected work</Eyebrow>
              <Typography variant="h2" sx={{ fontSize: { xs: "2.4rem", md: "3.6rem" }, fontWeight: 700, lineHeight: 1.05, color: t.ink }}>
                Platforms
                <br />
                <Emph text="*we've shipped*" />
              </Typography>
            </Box>
            <Typography sx={{ color: t.body, maxWidth: 380, fontSize: 15.5 }}>
              Websites, web apps and custom systems we’ve designed, built and launched — each with its scope, technology and delivery period.
            </Typography>
          </Box>
        </Reveal>

        <Box ref={listRef} sx={{ display: "grid", gap: { xs: 3, md: "8vh" } }}>
          {projects.map((p, i) => (
            <Box
              key={p.slug}
              className="stack-slot"
              sx={{ position: { md: "sticky" }, top: { md: STICK_TOP + i * STEP }, zIndex: i + 1 }}
            >
              <ProjectCard project={p} index={i} total={projects.length} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
