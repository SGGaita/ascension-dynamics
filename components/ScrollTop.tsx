"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { useDesign } from "./DesignProvider";

const SIZE = 92;
const R = 42; // progress ring radius
const C = 2 * Math.PI * R;

/**
 * Back-to-top button: a ring that fills with scroll progress, a slowly spinning
 * "BACK TO TOP" text band, and an arrow that launches upward on hover.
 */
export default function ScrollTop() {
  const { t, accent } = useDesign();
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setVisible(window.scrollY > 600);
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
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <ButtonBase
      onClick={toTop}
      aria-label="Back to top"
      sx={{
        position: "fixed", right: { xs: 14, md: 28 }, bottom: { xs: 14, md: 28 }, zIndex: 1200,
        width: { xs: 64, md: SIZE }, height: { xs: 64, md: SIZE }, borderRadius: "50%",
        opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none",
        transform: visible ? "scale(1) rotate(0deg)" : "scale(0.4) rotate(-90deg)",
        transition: "opacity .45s, transform .6s cubic-bezier(.2,1.4,.4,1)",
        "& .band": { animation: "ad-spin 14s linear infinite", transformOrigin: "50% 50%" },
        "&:hover .band": { animationDuration: "4s" },
        "& .core": { transition: "background-color .3s, transform .3s" },
        "&:hover .core": { bgcolor: accent.color, transform: "scale(1.06)" },
        "&:hover .arrow": { animation: "ad-launch .7s cubic-bezier(.5,0,.2,1)" },
        "@keyframes ad-spin": { to: { transform: "rotate(360deg)" } },
        "@keyframes ad-launch": {
          "0%": { transform: "translateY(0)", opacity: 1 },
          "45%": { transform: "translateY(-26px)", opacity: 0 },
          "46%": { transform: "translateY(22px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "@media (prefers-reduced-motion: reduce)": { "& .band": { animation: "none" } },
      }}
    >
      <Box component="svg" viewBox="0 0 100 100" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-hidden>
        <circle cx="50" cy="50" r="49" fill={`${t.bg}F2`} stroke={t.line} strokeWidth="1" />
        {/* scroll progress */}
        <circle
          cx="50" cy="50" r={R} fill="none" stroke={accent.onLight} strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={C * (1 - progress)} transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset .15s linear" }}
        />
        <circle cx="50" cy="50" r={R} fill="none" stroke={t.line} strokeWidth="2.5" opacity="0.6" />
        {/* spinning text band */}
        <g className="band">
          <defs>
            <path id="ad-ring" d="M50,50 m-33,0 a33,33 0 1,1 66,0 a33,33 0 1,1 -66,0" />
          </defs>
          <text fontFamily="'JetBrains Mono', monospace" fontSize="8.2" fontWeight="500" fill={t.ink}>
            <textPath href="#ad-ring" textLength={2 * Math.PI * 33 - 3} lengthAdjust="spacing">BACK TO TOP • BACK TO TOP • </textPath>
          </text>
        </g>
      </Box>
      <Box
        className="core"
        sx={{ position: "relative", width: { xs: 26, md: 36 }, height: { xs: 26, md: 36 }, borderRadius: "50%", bgcolor: t.ink, display: "grid", placeItems: "center", overflow: "hidden" }}
      >
        <Box component="svg" className="arrow" viewBox="0 0 24 24" sx={{ width: 16, height: 16, color: "#fff" }} aria-hidden>
          <path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </Box>
      </Box>
    </ButtonBase>
  );
}
