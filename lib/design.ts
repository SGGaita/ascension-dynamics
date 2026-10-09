/**
 * Design tokens — the chosen direction:
 * Studio typography (Inter Tight, tight tracking) on the Warm neutral palette,
 * with a single teal accent sampled from the logo.
 */

export const t = {
  bg: "#F4EFE7",       // page background (warm cream)
  bgAlt: "#EBE4D8",    // alternating sections
  surface: "#FBF8F3",  // cards
  ink: "#2A2521",      // headings / primary text (charcoal)
  body: "#4F4842",     // paragraphs
  muted: "#8C8378",    // secondary text
  line: "#DDD4C6",     // hairlines
  heroBg: "#1E1A16",   // dark sections (hero, contact, footer)
  display: "'Inter Tight', 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
  displayWeight: 600,
  displayTracking: "-0.04em",
  sans: "'Inter Tight', 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  radius: 20,
};

export type Tokens = typeof t;

/** Teal from the logo. `color` on dark backgrounds, `onLight` for text/lines on cream. */
export const accent = {
  color: "#19A7A8",
  onLight: "#0D7F82",
  text: "#04191A",
};
