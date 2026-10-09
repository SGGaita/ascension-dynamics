"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ButtonBase from "@mui/material/ButtonBase";
import Drawer from "@mui/material/Drawer";
import BrandLogo from "./BrandLogo";
import { useDesign } from "@/components/DesignProvider";
import type { NavbarSettings } from "@/lib/types";
import { CONTACT, telHref } from "@/lib/contact";

export const NAV_LINKS = [
  { label: "Work",     href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Process",  href: "/#process" },
  { label: "Contact",  href: "/#contact" },
];

interface SiteHeaderProps {
  settings?: NavbarSettings;
  /** Transparent header over the dark hero; defaults to true on the homepage. */
  overlay?: boolean;
  phone?: string;
}

export default function SiteHeader({ settings, overlay: overlayProp, phone = CONTACT.phone }: SiteHeaderProps) {
  const { t, accent } = useDesign();
  const pathname = usePathname();
  const overlay = overlayProp ?? pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const inverse = overlay && !scrolled;
  const logoHeight = Math.max(settings?.logoHeight ?? 52, 48);
  const fg = inverse ? "#fff" : t.ink;

  return (
    <>
      <Box
        component="header"
        sx={{
          position: overlay ? "fixed" : "sticky",
          top: 0, left: 0, right: 0, zIndex: 1100,
          bgcolor: inverse ? "transparent" : `${t.bg}E6`,
          backdropFilter: inverse ? "none" : "saturate(160%) blur(14px)",
          borderBottom: `1px solid ${inverse ? "transparent" : t.line}`,
          // Sit inside the inset hero card while at the top of the homepage
          pt: inverse ? { xs: 1.25, md: 2.5 } : 0,
          transition: "background-color .35s, border-color .35s, padding .35s",
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 3, md: inverse ? 7 : 5 }, transition: "padding .35s" }}>
          <Box
            sx={{
              display: "grid", alignItems: "center", gap: 2,
              gridTemplateColumns: { xs: "1fr auto", md: "1fr auto 1fr" },
              minHeight: { xs: 72, md: inverse ? 104 : 80 }, transition: "min-height .35s",
            }}
          >
            <Box sx={{ justifySelf: "start" }}>
              <BrandLogo height={logoHeight} src={settings?.logoUrl} companyName={settings?.companyName} inverse={inverse} />
            </Box>

            {/* centre nav — a floating glass pill over the hero, flat once scrolled */}
            <Box
              component="nav"
              sx={{
                display: { xs: "none", md: "flex" }, alignItems: "center", justifySelf: "center",
                gap: { md: 0.5, lg: 1 }, px: 1, py: 0.75, borderRadius: 999,
                bgcolor: inverse ? "rgba(255,255,255,0.07)" : "transparent",
                border: `1px solid ${inverse ? "rgba(255,255,255,0.14)" : "transparent"}`,
                backdropFilter: inverse ? "blur(12px)" : "none",
                boxShadow: inverse ? "inset 0 1px 0 rgba(255,255,255,0.06)" : "none",
                transition: "background-color .35s, border-color .35s, box-shadow .35s",
              }}
            >
              {NAV_LINKS.map((l) => (
                <Box
                  key={l.href}
                  component={Link}
                  href={l.href}
                  sx={{
                    color: fg, textDecoration: "none", fontSize: 15, fontWeight: 500,
                    px: { md: 2, lg: 2.75 }, py: 1, borderRadius: 999, opacity: 0.88,
                    transition: "background-color .25s, opacity .2s, color .35s",
                    "&:hover": { opacity: 1, bgcolor: inverse ? "rgba(255,255,255,0.1)" : `${t.ink}0F` },
                  }}
                >
                  {l.label}
                </Box>
              ))}
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", justifySelf: "end", gap: 3 }}>
              <Box
                component="a"
                href={telHref(phone)}
                sx={{
                  display: { md: "none", lg: "inline-flex" }, alignItems: "center", gap: 1.25,
                  color: fg, textDecoration: "none", fontFamily: t.sans, fontSize: 17, fontWeight: 700, letterSpacing: "-0.01em",
                  transition: "color .35s",
                  "& .live": { position: "relative", width: 8, height: 8, borderRadius: "50%", bgcolor: accent.color },
                  "& .live::after": {
                    content: '""', position: "absolute", inset: 0, borderRadius: "50%", bgcolor: accent.color,
                    animation: "ad-ping 1.8s cubic-bezier(0,0,.2,1) infinite",
                  },
                  "@keyframes ad-ping": { "75%,100%": { transform: "scale(2.6)", opacity: 0 } },
                  "&:hover": { color: inverse ? accent.color : accent.onLight },
                }}
              >
                <span className="live" />
                {phone}
              </Box>
              <ButtonBase
                component={Link}
                href="/#contact"
                sx={{
                  px: 2.75, py: 1.25, borderRadius: 999, fontSize: 14.5, fontWeight: 600, fontFamily: t.sans, gap: 1,
                  color: inverse ? accent.text : "#fff",
                  bgcolor: inverse ? accent.color : t.ink,
                  boxShadow: inverse ? `0 8px 30px -8px ${accent.color}99` : "none",
                  transition: "background-color .35s, color .35s, box-shadow .35s, transform .25s",
                  "&:hover": { transform: "translateY(-1px)" },
                  "& .dot": { width: 7, height: 7, borderRadius: "50%", bgcolor: inverse ? accent.text : accent.color, transition: "transform .3s, background-color .35s" },
                  "&:hover .dot": { transform: "scale(1.6)" },
                }}
              >
                <span className="dot" />
                Start a project
              </ButtonBase>
            </Box>

            <ButtonBase
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              sx={{
                display: { xs: "inline-flex", md: "none" }, justifySelf: "end", flexDirection: "column", gap: "6px", p: 1.5,
                "& span": { width: 22, height: "1.5px", bgcolor: fg, transition: "background-color .35s" },
              }}
            >
              <span /><span />
            </ButtonBase>
          </Box>
        </Container>
      </Box>

      <Drawer
        anchor="top"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{ paper: { sx: { bgcolor: t.heroBg, color: "#fff", minHeight: "100dvh", px: 3, py: 2.5 } } }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <BrandLogo height={48} inverse src={settings?.logoUrl} companyName={settings?.companyName} />
          <ButtonBase aria-label="Close menu" onClick={() => setOpen(false)} sx={{ color: "#fff", fontSize: 15, fontWeight: 500, p: 1 }}>
            Close
          </ButtonBase>
        </Box>
        <Box component="nav" sx={{ mt: 8, display: "grid", gap: 1 }}>
          {NAV_LINKS.map((l, i) => (
            <Box
              key={l.href}
              component={Link}
              href={l.href}
              onClick={() => setOpen(false)}
              sx={{ color: "#fff", textDecoration: "none", fontFamily: t.display, fontWeight: t.displayWeight, fontSize: "2.4rem", letterSpacing: t.displayTracking, lineHeight: 1.15, display: "flex", alignItems: "baseline", gap: 2 }}
            >
              <Box component="span" sx={{ fontFamily: t.mono, fontSize: 12, color: accent.color }}>0{i + 1}</Box>
              {l.label}
            </Box>
          ))}
        </Box>
        <Box sx={{ mt: 8, pt: 3, borderTop: "1px solid rgba(255,255,255,0.14)", display: "grid", gap: 1.5 }}>
          <Box component="a" href={telHref(phone)} sx={{ color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 22, letterSpacing: "-0.01em" }}>{phone}</Box>
          <Box component="a" href={`mailto:${CONTACT.email}`} sx={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 15 }}>{CONTACT.email}</Box>
        </Box>
      </Drawer>
    </>
  );
}
