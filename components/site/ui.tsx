"use client";
import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { useDesign } from "@/components/DesignProvider";

export const SERIF = "'Playfair Display', Georgia, serif";

/* ───────────────────────── Emphasis ─────────────────────────
   "*words*" render in bold italic serif - the hero's signature mix
   of a bold grotesk with an italic serif, used in every heading.   */
export function Emph({ text, color }: { text: string; color?: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("*") && p.endsWith("*") ? (
          <Box key={i} component="em" sx={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 700, letterSpacing: "-0.01em", color: color ?? "inherit" }}>
            {p.slice(1, -1)}
          </Box>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

/* ───────────────────────── Reveal ─────────────────────────
   Fades/slides children in once when they enter the viewport. */
/** True once the element has scrolled into view (fires once). */
export function useInView<T extends HTMLElement>(rootMargin = "0px 0px -8% 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { rootMargin, threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, inView] as const;
}

const EASE = "cubic-bezier(.2,.7,.2,1)";

type RevealVariant = "up" | "mask" | "scale" | "fade" | "left";

/**
 * Animates children in when they enter the viewport.
 * - up    : fade + rise (default)
 * - mask  : wipe-up reveal, great for headings
 * - scale : fade + gentle zoom, for media
 * - fade  : opacity only
 * - left  : slide in from the left
 */
export function Reveal({ children, delay = 0, y = 24, variant = "up", sx }: {
  children: React.ReactNode; delay?: number; y?: number; variant?: RevealVariant; sx?: SxProps<Theme>;
}) {
  const [ref, shown] = useInView<HTMLDivElement>();
  const hidden: Record<RevealVariant, object> = {
    up: { opacity: 0, transform: `translateY(${y}px)` },
    mask: { opacity: 0, transform: "translateY(0.6em)", clipPath: "inset(0 0 100% 0)" },
    scale: { opacity: 0, transform: "scale(0.94)" },
    fade: { opacity: 0 },
    left: { opacity: 0, transform: "translateX(-32px)" },
  };
  const dur = variant === "mask" ? 1.1 : 0.9;
  // The observed wrapper is never clipped or transformed, otherwise the browser
  // could consider a fully clipped element as "not visible" and never reveal it.
  return (
    <Box ref={ref} sx={sx}>
      <Box
        sx={{
          ...(shown ? { opacity: 1, transform: "none", clipPath: "inset(0 0 0 0)" } : hidden[variant]),
          transition: ["opacity", "transform", "clip-path"].map((p) => `${p} ${dur}s ${EASE} ${delay}ms`).join(", "),
          "@media (prefers-reduced-motion: reduce)": { opacity: 1, transform: "none", clipPath: "none", transition: "none" },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

/** A hairline that draws itself from left to right when scrolled into view. */
export function DrawLine({ color, delay = 0, thickness = 1, sx }: { color: string; delay?: number; thickness?: number; sx?: SxProps<Theme> }) {
  const [ref, shown] = useInView<HTMLDivElement>();
  return (
    <Box
      ref={ref}
      aria-hidden
      sx={{
        height: thickness, bgcolor: color, transformOrigin: "left center",
        transform: shown ? "scaleX(1)" : "scaleX(0)",
        transition: `transform 1.2s ${EASE} ${delay}ms`,
        "@media (prefers-reduced-motion: reduce)": { transform: "none", transition: "none" },
        ...sx,
      }}
    />
  );
}

/** Text that rises in one letter at a time when it enters the viewport. */
export function SplitLetters({ text, stagger = 40, delay = 0 }: { text: string; stagger?: number; delay?: number }) {
  const [ref, shown] = useInView<HTMLSpanElement>();
  return (
    <Box ref={ref} component="span" aria-label={text} sx={{ display: "inline-block" }}>
      {Array.from(text).map((ch, i) => (
        <Box
          key={i}
          component="span"
          aria-hidden
          sx={{
            display: "inline-block", whiteSpace: "pre",
            transform: shown ? "none" : "translateY(0.9em) rotate(6deg)", opacity: shown ? 1 : 0,
            transition: `transform 1s ${EASE} ${delay + i * stagger}ms, opacity .8s ${EASE} ${delay + i * stagger}ms`,
            "@media (prefers-reduced-motion: reduce)": { transform: "none", opacity: 1, transition: "none" },
          }}
        >
          {ch}
        </Box>
      ))}
    </Box>
  );
}

/** Moves children slightly against the scroll direction for depth (desktop, motion-safe only). */
export function Parallax({ children, speed = 0.08, sx }: { children: React.ReactNode; speed?: number; sx?: SxProps<Theme> }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(min-width: 900px)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const offset = (r.top + r.height / 2 - window.innerHeight / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
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
  }, [speed]);
  return <Box ref={ref} sx={{ willChange: "transform", ...sx }}>{children}</Box>;
}

/** CSS for staggered entrance on page load (hero content, page headers). */
export function enter(delay: number, from = "translateY(28px)") {
  return {
    animation: `ad-enter 1s ${EASE} ${delay}ms both`,
    "@keyframes ad-enter": { from: { opacity: 0, transform: from }, to: { opacity: 1, transform: "none" } },
    "@media (prefers-reduced-motion: reduce)": { animation: "none" },
  };
}

/* ───────────────────────── Eyebrow ─────────────────────────
   Teal dot + mono label, as in the hero. */
export function Eyebrow({ children, index, light = false }: { children: React.ReactNode; index?: string; light?: boolean }) {
  const { t, accent, accentInk } = useDesign();
  return (
    <Typography
      variant="overline"
      component="p"
      sx={{ display: "flex", alignItems: "center", gap: 1.25, color: light ? "rgba(255,255,255,0.8)" : t.muted, mb: 2.5 }}
    >
      <Box component="span" sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: accent.color, flexShrink: 0 }} />
      {index && <Box component="span" sx={{ color: light ? accent.color : accentInk }}>{index}</Box>}
      {children}
    </Typography>
  );
}

/* ───────────────────────── Glows ─────────────────────────
   The hero's teal glow + drifting magenta orb, for dark cards. */
export function Glows({ orb = "left", teal = "right" }: { orb?: "left" | "right" | "none"; teal?: "left" | "right" }) {
  const { accent } = useDesign();
  return (
    <>
      <Box
        aria-hidden
        sx={{
          position: "absolute", [teal]: "-12%", bottom: "-35%", width: "60%", height: "85%", pointerEvents: "none",
          background: `radial-gradient(closest-side, ${accent.color}66, transparent)`, filter: "blur(40px)",
        }}
      />
      {orb !== "none" && (
        <Box
          aria-hidden
          sx={{
            position: "absolute", [orb]: { xs: "-20%", md: "-5%" }, top: { xs: "-8%", md: "-12%" }, width: { xs: 180, md: 260 }, height: { xs: 180, md: 260 },
            borderRadius: "50%", pointerEvents: "none",
            background: "radial-gradient(circle at 35% 35%, #F48FB1 0%, #C2185B 45%, #6A1B9A 100%)", filter: "blur(22px)", opacity: 0.55,
            animation: "ad-orb 9s ease-in-out infinite alternate",
            "@keyframes ad-orb": { from: { transform: "translate(0,0)" }, to: { transform: "translate(26px,22px)" } },
          }}
        />
      )}
    </>
  );
}

/* ───────────────────────── InsetCard ─────────────────────────
   Dark, rounded, inset panel - the hero's frame, reused for key sections. */
export function InsetCard({ id, children, orb = "left", teal = "right", bg, sx }: {
  id?: string; children: React.ReactNode; orb?: "left" | "right" | "none"; teal?: "left" | "right"; bg?: string; sx?: SxProps<Theme>;
}) {
  const { t } = useDesign();
  return (
    <Box component="section" id={id} sx={{ bgcolor: t.bg, px: { xs: 1.25, md: 2.5 }, py: { xs: 0.75, md: 1.25 } }}>
      <Box
        sx={{
          position: "relative", overflow: "hidden", color: "#fff", bgcolor: bg ?? t.heroBg,
          borderRadius: { xs: "24px", md: "36px" }, ...sx,
        }}
      >
        <Glows orb={orb} teal={teal} />
        <Box sx={{ position: "relative" }}>{children}</Box>
      </Box>
    </Box>
  );
}

/* ───────────────────────── Squiggle ─────────────────────────
   Hand-drawn loop arrow, drawn once when it scrolls into view. */
export function Squiggle({ color = "#fff", sx }: { color?: string; sx?: SxProps<Theme> }) {
  return (
    <Reveal y={0}>
      <Box
        component="svg"
        viewBox="0 0 120 90"
        aria-hidden
        sx={{
          width: { xs: 64, md: 84 }, height: "auto", color, overflow: "visible", display: "block",
          "& path": { strokeDasharray: 320, strokeDashoffset: 320, animation: "ad-draw 1.6s .4s cubic-bezier(.6,.1,.2,1) forwards" },
          "@keyframes ad-draw": { to: { strokeDashoffset: 0 } },
          ...sx,
        }}
      >
        <path d="M8 70 C 30 82, 62 76, 70 52 C 78 28, 52 14, 44 32 C 36 50, 70 62, 96 40 C 104 33, 108 22, 106 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M96 14 L 106 8 L 112 19" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </Box>
    </Reveal>
  );
}

/* ───────────────────────── Pills ─────────────────────────
   Outline pill on dark (hero socials) and solid pill CTA. */
export function OutlinePill({ href, children, external, dark = true }: { href: string; children: React.ReactNode; external?: boolean; dark?: boolean }) {
  const { t } = useDesign();
  return (
    <Box
      component="a"
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      sx={{
        display: "inline-flex", alignItems: "center", gap: 1, px: 2.25, py: 0.9, borderRadius: 999, textDecoration: "none", fontSize: 14.5, fontWeight: 500,
        border: `1px solid ${dark ? "rgba(255,255,255,0.55)" : t.ink}`, color: dark ? "#fff" : t.ink, bgcolor: dark ? "rgba(255,255,255,0.04)" : "transparent",
        transition: "background-color .25s, color .25s, border-color .25s",
        "&:hover": dark ? { bgcolor: "#fff", color: "#111", borderColor: "#fff" } : { bgcolor: t.ink, color: "#fff" },
      }}
    >
      {children}
    </Box>
  );
}

/* ───────────────────────── Devices ─────────────────────────
   CSS-only laptop + phone frames holding real screenshots.   */
export function Laptop({ src, alt, sx }: { src: string; alt: string; sx?: SxProps<Theme> }) {
  return (
    <Box sx={{ position: "relative", width: "100%", ...sx }}>
      {/* lid - screen is inset absolutely so bezels scale with the lid itself */}
      <Box
        sx={{
          position: "relative",
          mx: "6%",
          aspectRatio: "1 / 0.645",
          borderRadius: "14px 14px 4px 4px",
          bgcolor: "#0d0d0e",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.06) inset, 0 40px 80px -30px rgba(0,0,0,0.55)",
        }}
      >
        <Box sx={{ position: "absolute", top: "1%", left: "50%", width: 5, height: 5, borderRadius: "50%", bgcolor: "#262626", transform: "translateX(-50%)" }} />
        <Box sx={{ position: "absolute", top: "2.6%", bottom: "4%", left: "1.8%", right: "1.8%", overflow: "hidden", borderRadius: "3px", bgcolor: "#1a1a1a" }}>
          <Box component="img" src={src} alt={alt} loading="lazy" sx={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
        </Box>
      </Box>
      {/* base */}
      <Box
        sx={{
          height: { xs: 10, md: 14 },
          borderRadius: "0 0 14px 14px",
          background: "linear-gradient(180deg,#d9d9d6 0%,#b7b7b3 60%,#8f8f8b 100%)",
          position: "relative",
          "&::after": {
            content: '""', position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: "16%", height: "45%", borderRadius: "0 0 8px 8px", bgcolor: "#a5a5a1",
          },
        }}
      />
    </Box>
  );
}

export function Phone({ src, alt, sx }: { src: string; alt: string; sx?: SxProps<Theme> }) {
  // Screen inset is absolute (top/bottom % of height, left/right % of width) so the
  // bezel stays thin at any size and the 390×840 screenshots fit without cropping.
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 2.05",
        borderRadius: "17% / 8.3%",
        bgcolor: "#0d0d0e",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.1) inset, 0 30px 60px -20px rgba(0,0,0,0.6)",
        ...sx,
      }}
    >
      <Box sx={{ position: "absolute", top: "2.2%", bottom: "2.2%", left: "4.5%", right: "4.5%", borderRadius: "13% / 6%", overflow: "hidden", bgcolor: "#fff" }}>
        <Box component="img" src={src} alt={alt} loading="lazy" sx={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
        {/* dynamic island */}
        <Box sx={{ position: "absolute", top: "1.4%", left: "50%", transform: "translateX(-50%)", width: "30%", height: "2.6%", borderRadius: 999, bgcolor: "#0d0d0e" }} />
      </Box>
    </Box>
  );
}

/** Laptop with a phone overlapping its front-right corner. */
export function DeviceDuo({ desktop, mobile, alt, phoneSide = "right", sx }: {
  desktop: string; mobile: string; alt: string; phoneSide?: "left" | "right"; sx?: SxProps<Theme>;
}) {
  return (
    <Box sx={{ position: "relative", width: "100%", pb: "6%", ...sx }}>
      <Laptop src={desktop} alt={`${alt} - desktop`} sx={{ width: "88%", ml: phoneSide === "right" ? 0 : "12%" }} />
      <Phone
        src={mobile}
        alt={`${alt} - mobile`}
        sx={{ position: "absolute", width: "23%", bottom: 0, [phoneSide]: "2%" }}
      />
    </Box>
  );
}
