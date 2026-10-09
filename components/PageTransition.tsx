"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import { useDesign } from "./DesignProvider";

/* The very first page load skips the curtain so content appears immediately. */
const nav = { first: true };

/**
 * Page-to-page transition: a dark brand curtain (with the AD mark) lifts away
 * while the new page rises into place. Runs on every client-side navigation.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const { t, accent } = useDesign();
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const [showCurtain] = useState(() => !nav.first && !isAdmin);
  useEffect(() => { nav.first = false; }, []);

  if (isAdmin) return <>{children}</>;

  return (
    <>
      {showCurtain && (
        <Box
          aria-hidden
          sx={{
            position: "fixed", inset: 0, zIndex: 3000, bgcolor: t.heroBg, pointerEvents: "none",
            display: "grid", placeItems: "center",
            animation: "ad-curtain 1s cubic-bezier(.76,0,.24,1) .25s both",
            "@keyframes ad-curtain": {
              from: { clipPath: "inset(0 0 0 0)" },
              to: { clipPath: "inset(0 0 100% 0)" },
            },
            // teal edge that follows the curtain up
            "&::after": {
              content: '""', position: "absolute", left: 0, right: 0, bottom: 0, height: 3, bgcolor: accent.color,
            },
            "@media (prefers-reduced-motion: reduce)": { display: "none" },
          }}
        >
          <Box
            component="img"
            src="/logo-mark.png"
            alt=""
            sx={{
              width: { xs: 96, md: 132 },
              animation: "ad-curtain-logo .7s cubic-bezier(.2,.7,.2,1) both",
              "@keyframes ad-curtain-logo": {
                "0%": { opacity: 0, transform: "scale(.85)" },
                "40%": { opacity: 1, transform: "scale(1)" },
                "100%": { opacity: 0, transform: "translateY(-30px) scale(1.02)" },
              },
            }}
          />
        </Box>
      )}
      <Box
        sx={
          showCurtain
            ? {
                animation: "ad-page-in 1s cubic-bezier(.2,.7,.2,1) .45s both",
                "@keyframes ad-page-in": { from: { opacity: 0, transform: "translateY(40px)" }, to: { opacity: 1, transform: "none" } },
                "@media (prefers-reduced-motion: reduce)": { animation: "none" },
              }
            : undefined
        }
      >
        {children}
      </Box>
    </>
  );
}
