"use client";
import { createContext, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { accent, t, type Tokens } from "@/lib/design";

interface DesignCtx {
  t: Tokens;
  accent: typeof accent;
  /** Accent colour safe for text and lines on the cream background. */
  accentInk: string;
}

const value: DesignCtx = { t, accent, accentInk: accent.onLight };
const Ctx = createContext<DesignCtx>(value);

export function useDesign() {
  return useContext(Ctx);
}

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: t.ink, contrastText: "#FFFFFF" },
    secondary: { main: accent.color, contrastText: accent.text },
    text: { primary: t.ink, secondary: t.body },
    background: { default: t.bg, paper: t.surface },
    divider: t.line,
    error: { main: "#C62828" },
  },
  shape: { borderRadius: t.radius },
  typography: {
    fontFamily: t.sans,
    h1: { fontFamily: t.display, fontWeight: t.displayWeight, letterSpacing: t.displayTracking, lineHeight: 1.02 },
    h2: { fontFamily: t.display, fontWeight: t.displayWeight, letterSpacing: t.displayTracking, lineHeight: 1.06 },
    h3: { fontFamily: t.display, fontWeight: t.displayWeight, letterSpacing: "-0.03em", lineHeight: 1.12 },
    h4: { fontFamily: t.display, fontWeight: t.displayWeight, letterSpacing: "-0.03em", lineHeight: 1.15 },
    h5: { fontFamily: t.sans, fontWeight: 600, letterSpacing: "-0.015em" },
    h6: { fontFamily: t.sans, fontWeight: 600, letterSpacing: "-0.01em" },
    body1: { lineHeight: 1.65 },
    body2: { lineHeight: 1.6 },
    overline: { fontFamily: t.mono, fontWeight: 500, letterSpacing: "0.08em", fontSize: "0.7rem", lineHeight: 1.6 },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: "-0.005em" },
  },
  components: {
    MuiCssBaseline: { styleOverrides: { body: { backgroundColor: t.bg, color: t.ink } } },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 999, paddingInline: 24, paddingBlock: 10 } },
    },
    MuiTextField: { defaultProps: { fullWidth: true, variant: "standard" } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
  },
});

export default function DesignProvider({ children }: { children: React.ReactNode }) {
  return (
    <Ctx.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Ctx.Provider>
  );
}
