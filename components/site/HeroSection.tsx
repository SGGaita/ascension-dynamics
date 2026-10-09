"use client";
import { useEffect, useState } from "react";
import { preload } from "react-dom";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useDesign } from "@/components/DesignProvider";
import { SOCIALS } from "@/lib/contact";
import type { SiteSettings } from "@/lib/types";
import { OutlinePill as Pill, SERIF, Squiggle, enter } from "./ui";

/** Hero photos (self-hosted): wide shot for tablets/desktop, portrait crop for phones. */
const PHOTO = {
  desktop: "/hero/hero-desktop.webp",
  mobile: "/hero/hero-mobile.webp",
};

/* Copy from older CMS versions that should fall back to the new defaults. */
const LEGACY_EYEBROW = /systems online|nairobi/i;
const LEGACY_HEADLINE = /^we build digital infrastructure that scales$|people rely on|^we design & build \*digital platforms\*$|research systems\|alumni portals/i;
const LEGACY_SUBTEXT = /architects high-performance|crafting research systems|enterprise-grade web applications/i;


const DEFAULT_HEADLINE = "We design & build *websites|web & mobile apps|custom software*";
const DEFAULT_SUBTEXT =
  "From websites that win customers to web & mobile apps and the custom software that runs your business - we plan, design, build and look after digital products people love to use.";
const DEFAULT_EYEBROW = "Digital product studio";
const HOLD_MS = 2800; // how long each phrase stays
const OUT_MS = 420;   // exit animation length

/** Cycles through phrases: letters fall away, the next phrase rises in letter by letter. */
function RotatingWords({ words }: { words: string[] }) {
  const { accent } = useDesign();
  // Each phrase takes the next colour from the logo: teal → magenta → lime.
  const colors = [accent.color, "#E5468A", "#A6D13F"];
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (words.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let swap: ReturnType<typeof setTimeout>;
    const tick = setInterval(() => {
      setLeaving(true);
      swap = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setLeaving(false);
      }, OUT_MS);
    }, HOLD_MS);
    return () => { clearInterval(tick); clearTimeout(swap); };
  }, [words.length]);

  const word = words[index];
  return (
    <Box component="span" sx={{ position: "relative", display: "inline-block" }} aria-live="polite">
      <Box component="span" key={`${index}-${leaving}`} aria-label={word} role="text" sx={{ display: "inline-block", color: colors[index % colors.length] }}>
        {word.split(" ").map((w, wi, all) => {
          const offset = all.slice(0, wi).join(" ").length + (wi ? 1 : 0); // char index where this word starts
          return (
            <Box key={wi} component="span" sx={{ display: "inline-block", whiteSpace: "nowrap", mr: wi < all.length - 1 ? "0.25em" : 0 }}>
              {Array.from(w).map((ch, ci) => {
                const i = offset + ci;
                return (
                  <Box
                    key={ci}
                    component="span"
                    aria-hidden
                    sx={{
                      display: "inline-block",
                      animation: leaving
                        ? `ad-fall ${OUT_MS}ms cubic-bezier(.5,0,.75,0) ${i * 12}ms both`
                        : `ad-rise .8s cubic-bezier(.2,.8,.2,1) ${i * 32}ms both`,
                      "@keyframes ad-rise": {
                        from: { opacity: 0, transform: "translateY(0.55em) rotate(8deg)", filter: "blur(8px)" },
                        to: { opacity: 1, transform: "none", filter: "blur(0)" },
                      },
                      "@keyframes ad-fall": {
                        from: { opacity: 1, transform: "none", filter: "blur(0)" },
                        to: { opacity: 0, transform: "translateY(-0.45em)", filter: "blur(6px)" },
                      },
                    }}
                  >
                    {ch}
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

/**
 * Headline: plain words in bold sans; *emphasised* words on their own line in italic serif.
 * Separate alternatives with "|" inside the asterisks to make them rotate, e.g. "We build *apps|portals*".
 */
function Headline({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("*") && p.endsWith("*")) {
          const words = p.slice(1, -1).split("|").map((w) => w.trim()).filter(Boolean);
          return (
            <Box
              key={i}
              component="span"
              sx={{ display: "block", fontFamily: SERIF, fontStyle: "italic", fontWeight: 700, letterSpacing: "-0.01em", mt: { xs: 0.5, md: 1 } }}
            >
              {words.length > 1 ? <RotatingWords words={words} /> : words[0]}
            </Box>
          );
        }
        return <Box key={i} component="span" sx={{ display: "block" }}>{p.trim()}</Box>;
      })}
    </>
  );
}

export default function HeroSection({ hero }: { hero?: SiteSettings["hero"] }) {
  preload(PHOTO.desktop, { as: "image", fetchPriority: "high", media: "(min-width: 900px)" });
  preload(PHOTO.mobile, { as: "image", fetchPriority: "high", media: "(max-width: 899.95px)" });
  const { t, accent } = useDesign();

  const headline = hero?.headline && !LEGACY_HEADLINE.test(hero.headline.trim()) ? hero.headline : DEFAULT_HEADLINE;
  const subtext =
    hero?.subtext && !LEGACY_SUBTEXT.test(hero.subtext)
      ? hero.subtext
      : DEFAULT_SUBTEXT;
  const eyebrow = hero?.statusBadge && !LEGACY_EYEBROW.test(hero.statusBadge) ? hero.statusBadge : DEFAULT_EYEBROW;

  return (
    <Box component="section" id="home" sx={{ bgcolor: t.bg, p: { xs: 1.25, md: 2.5 } }}>
      <Box
        sx={{
          position: "relative", overflow: "hidden", color: "#fff", bgcolor: t.heroBg,
          borderRadius: { xs: "24px", md: "36px" },
          minHeight: { xs: "calc(100svh - 20px)", md: "calc(100vh - 40px)" },
          display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "center", alignItems: { xs: "stretch", md: "center" },
        }}
      >
        {/* photo, slowly drifting in */}
        <Box
          aria-hidden
          sx={{
            position: "absolute", inset: 0, backgroundImage: { xs: `url("${PHOTO.mobile}")`, md: `url("${PHOTO.desktop}")` }, backgroundSize: "cover", backgroundPosition: { xs: "center 30%", md: "center 40%" },
            animation: "ad-kenburns 22s ease-out forwards",
            "@keyframes ad-kenburns": { from: { transform: "scale(1.12)" }, to: { transform: "scale(1.02)" } },
          }}
        />
        {/* warm darkening + brand glows */}
        <Box
          aria-hidden
          sx={{
            position: "absolute", inset: 0,
            background: {
              xs: "linear-gradient(180deg, rgba(24,18,13,0.72) 0%, rgba(24,18,13,0.78) 55%, rgba(24,18,13,0.9) 100%)",
              md: "linear-gradient(90deg, rgba(24,18,13,0.9) 0%, rgba(24,18,13,0.66) 48%, rgba(24,18,13,0.3) 100%)",
            },
          }}
        />
        <Box aria-hidden sx={{ position: "absolute", right: "-10%", bottom: "-30%", width: "60%", height: "80%", background: `radial-gradient(closest-side, ${accent.color}80, transparent)`, filter: "blur(40px)" }} />
        <Box
          aria-hidden
          sx={{
            position: "absolute", left: { xs: "-18%", md: "-6%" }, bottom: { xs: "-10%", md: "-14%" }, width: { xs: 220, md: 300 }, height: { xs: 220, md: 300 }, borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #F48FB1 0%, #C2185B 45%, #6A1B9A 100%)", filter: "blur(18px)", opacity: 0.75,
            animation: "ad-orb 9s ease-in-out infinite alternate",
            "@keyframes ad-orb": { from: { transform: "translate(0,0)" }, to: { transform: "translate(30px,-24px)" } },
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", px: { xs: 3, md: 7 }, pt: { xs: 13, md: 14 }, pb: { xs: 12, md: 12 } }}>
          <Box sx={{ maxWidth: 820 }}>
            <Typography variant="overline" component="p" sx={{ color: "rgba(255,255,255,0.8)", mb: 2.5, display: "flex", alignItems: "center", gap: 1.25, ...enter(150) }}>
              <Box component="span" sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: accent.color }} />
              {eyebrow}
            </Typography>

            <Typography
              variant="h1"
              sx={{ color: "#fff", fontWeight: 700, fontSize: { xs: "2.7rem", sm: "3.6rem", md: "4.6rem", xl: "5.2rem" }, lineHeight: 1.02, mb: 3.5, ...enter(300, "translateY(40px)") }}
            >
              <Headline text={headline} />
            </Typography>

            <Typography sx={{ fontSize: { xs: "1.02rem", md: "1.15rem" }, color: "rgba(255,255,255,0.85)", maxWidth: 560, mb: { xs: 5, md: 6 }, lineHeight: 1.7, ...enter(520) }}>
              {subtext}
            </Typography>

            {/* see our work - hand-drawn arrow, left aligned */}
            <Box
              component={Link}
              href="/#work"
              sx={{ display: "inline-flex", alignItems: "flex-end", gap: 1.25, color: "#fff", textDecoration: "none", "&:hover span": { borderColor: "#fff" }, ...enter(700) }}
            >
              <Squiggle />
              <Box component="span" sx={{ fontSize: 15.5, fontWeight: 500, borderBottom: "1px solid rgba(255,255,255,0.5)", pb: 0.25, mb: 0.5, transition: "border-color .2s" }}>
                See our work
              </Box>
            </Box>
          </Box>
        </Container>

        {/* social strip */}
        <Box
          component="nav"
          aria-label="Social media"
          sx={{
            position: { xs: "relative", md: "absolute" }, zIndex: 1, right: { md: 40 }, bottom: { md: 36 },
            display: "flex", gap: 1, flexWrap: "wrap", justifyContent: { xs: "flex-start", md: "flex-end" },
            px: { xs: 3, md: 0 }, pb: { xs: 3.5, md: 0 }, mt: { xs: -5, md: 0 },
            "& a": { fontSize: { xs: 13, md: 14.5 }, px: { xs: 1.6, md: 2.25 }, py: { xs: 0.6, md: 0.9 } },
            // pills pop in one after another
            ...Object.fromEntries([1, 2, 3, 4].map((n) => [`& a:nth-of-type(${n})`, enter(850 + n * 90, "translateY(14px) scale(.92)")])),
          }}
        >
          {SOCIALS.map((s) => (
            <Pill key={s.label} href={s.href} external>{s.label}</Pill>
          ))}
        </Box>

      </Box>
    </Box>
  );
}
