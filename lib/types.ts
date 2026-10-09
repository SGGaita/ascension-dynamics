export type NavbarSettings = {
  logoUrl?: string; logoWidth: number; logoHeight: number;
  companyName: string; navbarHeight: "compact" | "default" | "tall";
};

export type SiteSettings = {
  navbar: NavbarSettings;
  hero: {
    headline: string; subtext: string; badges: string[];
    statusBadge: string; ctaPrimary: string; ctaSecondary: string;
  };
  contact: { email: string; locations: string; phone?: string };
};

export type TestimonialData = {
  quote: string; name: string; role: string;
  emoji: string; rgb: string; stat: string; co: string;
};

export type ServiceData = {
  icon: string; title: string; desc: string; accentRgb: string;
};
