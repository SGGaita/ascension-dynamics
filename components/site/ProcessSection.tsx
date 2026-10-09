"use client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useDesign } from "@/components/DesignProvider";
import { DrawLine, Emph, Eyebrow, Reveal, SERIF } from "./ui";

const STEPS = [
  { t: "Discover", d: "Workshops with your team to map users, workflows and what success looks like." },
  { t: "Design", d: "Information architecture, wireframes and a clickable prototype you can put in front of users." },
  { t: "Build", d: "Iterative engineering with demos every sprint and a shared staging site." },
  { t: "Launch & care", d: "Deployment, training and ongoing maintenance so the platform keeps getting better." },
];

export default function ProcessSection() {
  const { t, accentInk } = useDesign();
  return (
    <Box component="section" id="process" sx={{ py: { xs: 10, md: 16 }, bgcolor: t.bg }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 5 } }}>
        <Reveal variant="mask">
          <Eyebrow>Process</Eyebrow>
          <Typography variant="h2" sx={{ fontSize: { xs: "2.4rem", md: "3.6rem" }, fontWeight: 700, lineHeight: 1.05, color: t.ink, mb: { xs: 6, md: 8 }, maxWidth: 820 }}>
            From first idea
            <br />
            <Emph text="*to live product*" />
          </Typography>
        </Reveal>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }, gap: { xs: 5, md: 4 } }}>
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={i * 90}>
              <DrawLine color={t.ink} delay={i * 140} />
              <Box sx={{ pt: 3, "&:hover .num": { opacity: 0.9, color: accentInk, transform: "translateX(6px)" } }}>
                <Typography className="num" sx={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 700, fontSize: { xs: "2.8rem", md: "3.4rem" }, lineHeight: 1, color: t.ink, opacity: 0.22, mb: 2.5, transition: "opacity .4s, color .4s, transform .5s cubic-bezier(.2,.7,.2,1)" }}>
                  {String(i + 1).padStart(2, "0")}
                </Typography>
                <Typography variant="h5" component="h3" sx={{ color: t.ink, mb: 1.25, display: "flex", alignItems: "center", gap: 1 }}>
                  {s.t}
                  {i === STEPS.length - 1 && <Box component="span" sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: accentInk }} />}
                </Typography>
                <Typography sx={{ color: t.body, fontSize: 15.5 }}>{s.d}</Typography>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
