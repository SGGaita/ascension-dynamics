"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ButtonBase from "@mui/material/ButtonBase";
import Alert from "@mui/material/Alert";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import { useDesign } from "@/components/DesignProvider";
import { Emph, Eyebrow, InsetCard, Reveal, Squiggle } from "./ui";
import { CONTACT, telHref } from "@/lib/contact";

/* Values below must stay in sync with the mappings in app/api/leads/route.ts */
const SVCS = [
  { id: "web", label: "Web platform" },
  { id: "cld", label: "Cloud & DevOps" },
  { id: "ai",  label: "AI & automation" },
  { id: "mob", label: "Mobile app" },
  { id: "sec", label: "Security" },
  { id: "dat", label: "Data & reporting" },
];
const BUDGETS   = ["< $25k", "$25k–$75k", "$75k–$200k", "$200k+", "Enterprise"];
const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "6+ months"];
const STEPS     = ["You", "Scope", "Brief"];

type F = {
  fn: string; ln: string; email: string; company: string; role: string;
  svcs: string[]; budget: string; timeline: string;
  pname: string; goals: string; tech: string; links: string; source: string;
};
const BLANK: F = { fn: "", ln: "", email: "", company: "", role: "", svcs: [], budget: "", timeline: "", pname: "", goals: "", tech: "", links: "", source: "" };

function Pill({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  const { accent } = useDesign();
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        px: 2, py: 1, borderRadius: 999, fontSize: 14.5, fontWeight: 500,
        border: "1px solid", borderColor: on ? "#fff" : "rgba(255,255,255,0.22)",
        bgcolor: on ? "#fff" : "transparent", color: on ? "#0B0B0B" : "rgba(255,255,255,0.85)",
        gap: 1, transition: "all .2s", "&:hover": { borderColor: "#fff" },
      }}
    >
      {on && <Box component="span" sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: accent.color }} />}
      {children}
    </ButtonBase>
  );
}

export default function ContactSection({ contactInfo }: { contactInfo?: { email?: string; phone?: string } }) {
  const { t, accent } = useDesign();
  const outer = useTheme();
  // The contact block is always dark, so its form fields use a dark variant of the current theme.
  const dark = createTheme(outer, { palette: { mode: "dark", primary: { main: "#fff" }, text: { primary: "#fff", secondary: "rgba(255,255,255,0.6)" } } });

  const [step, setStep] = useState(0);
  const [f, setF] = useState<F>(BLANK);
  const [e, setE] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const email = contactInfo?.email || CONTACT.email;
  const phone = contactInfo?.phone || CONTACT.phone;

  const set = <K extends keyof F>(k: K, v: F[K]) => {
    setF((x) => ({ ...x, [k]: v }));
    setE((x) => { const n = { ...x }; delete n[k as string]; return n; });
  };
  const toggleSvc = (id: string) => set("svcs", f.svcs.includes(id) ? f.svcs.filter((s) => s !== id) : [...f.svcs, id]);

  const validate = () => {
    const err: Record<string, string> = {};
    if (step === 0) {
      if (!f.fn.trim()) err.fn = "Required";
      if (!f.ln.trim()) err.ln = "Required";
      if (!/\S+@\S+\.\S+/.test(f.email)) err.email = "Enter a valid email";
      if (!f.company.trim()) err.company = "Required";
    }
    if (step === 1) {
      if (!f.svcs.length) err.svcs = "Pick at least one";
      if (!f.budget) err.budget = "Pick a budget";
      if (!f.timeline) err.timeline = "Pick a timeline";
    }
    if (step === 2 && f.goals.trim().length < 30) err.goals = "A little more detail please (30+ characters)";
    setE(err);
    return !Object.keys(err).length;
  };

  const submit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      if (!res.ok) throw new Error(String(res.status));
      setSent(true); setF(BLANK); setStep(0);
    } catch {
      setSubmitError(`We couldn't send your brief. Please try again or email ${email}.`);
    } finally {
      setSubmitting(false);
    }
  };

  const label = (s: string, err?: string) => (
    <Typography sx={{ fontFamily: t.mono, fontSize: 11.5, letterSpacing: "0.06em", textTransform: "uppercase", color: err ? "#ff8a80" : "rgba(255,255,255,0.5)", mb: 1.5 }}>
      {s}{err ? ` — ${err}` : ""}
    </Typography>
  );

  return (
    <InsetCard id="contact" orb="left" teal="right">
      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 7 }, py: { xs: 9, md: 14 } }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 6, md: 10 } }}>
          <Reveal>
            <Eyebrow light>Contact</Eyebrow>
            <Typography variant="h2" sx={{ color: "#fff", fontWeight: 700, fontSize: { xs: "2.4rem", md: "3.6rem" }, lineHeight: 1.05, mb: 3 }}>
              Have a project
              <br />
              <Emph text="*in mind?*" />
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: 17, maxWidth: 440, mb: 5 }}>
              Tell us what you&rsquo;re building. We reply to every brief within one working day.
            </Typography>
            <Box sx={{ display: { xs: "none", md: "block" }, mb: 4, ml: 1 }}>
              <Squiggle sx={{ transform: "rotate(18deg)" }} />
            </Box>
            <Box
              component="a"
              href={`mailto:${email}`}
              sx={{
                fontFamily: t.display, fontWeight: t.displayWeight, letterSpacing: t.displayTracking, color: "#fff", textDecoration: "none",
                fontSize: { xs: "1.3rem", md: "1.7rem" }, borderBottom: `2px solid ${accent.color}`, pb: 0.5, wordBreak: "break-all",
              }}
            >
              {email}
            </Box>
            <Box sx={{ mt: 3 }}>
              <Box
                component="a"
                href={telHref(phone)}
                sx={{
                  fontFamily: t.display, letterSpacing: t.displayTracking, color: "#fff", textDecoration: "none",
                  fontWeight: 700, fontSize: { xs: "1.6rem", md: "2.1rem" }, borderBottom: "2px solid rgba(255,255,255,0.25)", pb: 0.5, "&:hover": { borderColor: accent.color },
                }}
              >
                {phone}
              </Box>
            </Box>
          </Reveal>

          <Reveal delay={100}>
            <ThemeProvider theme={dark}>
              <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.18)", pt: 4 }}>
                {sent ? (
                  <Box sx={{ py: 6 }}>
                    <Typography variant="h3" sx={{ color: "#fff", fontSize: "2rem", mb: 2 }}>Thank you — brief received.</Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.7)", mb: 4 }}>We&rsquo;ll be in touch within one working day.</Typography>
                    <Pill on={false} onClick={() => setSent(false)}>Send another</Pill>
                  </Box>
                ) : (
                  <>
                    <Box sx={{ display: "flex", gap: 3, mb: 5, fontFamily: t.mono, fontSize: 12.5, letterSpacing: "0.04em" }}>
                      {STEPS.map((s, i) => (
                        <Box key={s} sx={{ color: i === step ? "#fff" : "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 1 }}>
                          <Box component="span" sx={{ color: i <= step ? accent.color : "inherit" }}>0{i + 1}</Box> {s}
                        </Box>
                      ))}
                    </Box>

                    {step === 0 && (
                      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3.5 }}>
                        <TextField label="First name" value={f.fn} onChange={(ev) => set("fn", ev.target.value)} error={!!e.fn} helperText={e.fn} />
                        <TextField label="Last name" value={f.ln} onChange={(ev) => set("ln", ev.target.value)} error={!!e.ln} helperText={e.ln} />
                        <TextField label="Work email" type="email" value={f.email} onChange={(ev) => set("email", ev.target.value)} error={!!e.email} helperText={e.email} sx={{ gridColumn: { sm: "1 / -1" } }} />
                        <TextField label="Organisation" value={f.company} onChange={(ev) => set("company", ev.target.value)} error={!!e.company} helperText={e.company} />
                        <TextField label="Your role (optional)" value={f.role} onChange={(ev) => set("role", ev.target.value)} />
                      </Box>
                    )}

                    {step === 1 && (
                      <Box sx={{ display: "grid", gap: 4 }}>
                        <Box>{label("What do you need?", e.svcs)}<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>{SVCS.map((s) => <Pill key={s.id} on={f.svcs.includes(s.id)} onClick={() => toggleSvc(s.id)}>{s.label}</Pill>)}</Box></Box>
                        <Box>{label("Budget", e.budget)}<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>{BUDGETS.map((b) => <Pill key={b} on={f.budget === b} onClick={() => set("budget", b)}>{b}</Pill>)}</Box></Box>
                        <Box>{label("Timeline", e.timeline)}<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>{TIMELINES.map((x) => <Pill key={x} on={f.timeline === x} onClick={() => set("timeline", x)}>{x}</Pill>)}</Box></Box>
                      </Box>
                    )}

                    {step === 2 && (
                      <Box sx={{ display: "grid", gap: 3.5 }}>
                        <TextField label="Project name (optional)" value={f.pname} onChange={(ev) => set("pname", ev.target.value)} />
                        <TextField label="What are you building, and why?" multiline minRows={4} value={f.goals} onChange={(ev) => set("goals", ev.target.value)} error={!!e.goals} helperText={e.goals || `${f.goals.length} characters`} />
                        <TextField label="Existing tech or constraints (optional)" value={f.tech} onChange={(ev) => set("tech", ev.target.value)} />
                        <TextField label="Reference links (optional)" value={f.links} onChange={(ev) => set("links", ev.target.value)} />
                      </Box>
                    )}

                    {submitError && <Alert severity="error" variant="outlined" sx={{ mt: 3 }}>{submitError}</Alert>}

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 5 }}>
                      {step > 0 ? (
                        <ButtonBase onClick={() => setStep((s) => s - 1)} sx={{ color: "rgba(255,255,255,0.7)", fontSize: 15, "&:hover": { color: "#fff" } }}>← Back</ButtonBase>
                      ) : <span />}
                      <ButtonBase
                        onClick={step < STEPS.length - 1 ? () => validate() && setStep((s) => s + 1) : submit}
                        disabled={submitting}
                        sx={{ px: 3.5, py: 1.6, borderRadius: 999, bgcolor: "#fff", color: "#0B0B0B", fontSize: 15.5, fontWeight: 600, gap: 1.25 }}
                      >
                        {submitting ? "Sending…" : step < STEPS.length - 1 ? "Continue" : "Send brief"}
                        <Box component="span" sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: accent.color }} />
                      </ButtonBase>
                    </Box>
                  </>
                )}
              </Box>
            </ThemeProvider>
          </Reveal>
        </Box>
      </Container>
    </InsetCard>
  );
}
