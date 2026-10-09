/** Public contact details — used as defaults when the CMS has none. */
export const CONTACT = {
  email: "hello@ascensiondynamics.io",
  phone: "+254-723-272915",
};

/** "+254-723-272915" → "tel:+254723272915" */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/**
 * Social profiles shown in the hero and footer.
 * ⚠️ CONFIRM: these handles are placeholders — replace with your real profile URLs.
 */
export const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/ascensiondynamics" },
  { label: "Instagram", href: "https://www.instagram.com/ascensiondynamics" },
  { label: "TikTok", href: "https://www.tiktok.com/@ascensiondynamics" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/ascensiondynamics" },
];
