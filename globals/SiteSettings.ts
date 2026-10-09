import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    description: "Global settings for the website - navbar, hero section, and contact details.",
  },
  fields: [
    /* ── Navbar ── */
    {
      name: "navbar",
      type: "group",
      label: "Navbar",
      fields: [
        {
          name: "logo",
          type: "upload",
          relationTo: "media",
          label: "Logo Image",
          admin: { description: "Optional. Upload the AD mark only (transparent PNG/SVG, no white text) - the company name is rendered as text next to it." },
        },
        {
          type: "row",
          fields: [
            {
              name: "logoWidth",
              type: "number",
              label: "Logo Width (px) - unused, width follows height",
              defaultValue: 88,
              min: 16,
              max: 400,
            },
            {
              name: "logoHeight",
              type: "number",
              label: "Logo Height in navbar (px)",
              defaultValue: 56,
              min: 40,
              max: 96,
            },
          ],
        },
        {
          name: "companyName",
          type: "text",
          label: "Company Name",
          defaultValue: "Ascension.Dynamics",
          admin: { description: "Text displayed next to the logo in the navbar." },
        },
        {
          name: "navbarHeight",
          type: "select",
          label: "Navbar Height",
          defaultValue: "default",
          options: [
            { label: "Compact (48 px)",  value: "compact"  },
            { label: "Default (64 px)",  value: "default"  },
            { label: "Tall (80 px)",     value: "tall"     },
          ],
        },
      ],
    },

    /* ── Hero Section ── */
    {
      name: "hero",
      type: "group",
      label: "Hero Section",
      fields: [
        {
          name: "headline",
          type: "text",
          label: "Headline",
          defaultValue: "We design & build *websites|web & mobile apps|custom software*",
          admin: { description: "Wrap words in *asterisks* for the italic line; separate options with | to rotate them, e.g. *apps|portals*." },
        },
        {
          name: "subtext",
          type: "textarea",
          label: "Sub-text",
          defaultValue: "From websites that win customers to web & mobile apps and the custom software that runs your business - we plan, design, build and look after digital products people love to use.",
        },
        {
          name: "badges",
          type: "array",
          label: "Keyword Badges",
          fields: [
            { name: "text", type: "text", required: true },
          ],
        },
        {
          name: "statusBadge",
          type: "text",
          label: "Eyebrow Text (above headline)",
          defaultValue: "Digital product studio",
        },
        {
          name: "ctaPrimary",
          type: "text",
          label: "Primary CTA Label",
          defaultValue: "Start a Project",
        },
        {
          name: "ctaSecondary",
          type: "text",
          label: "Secondary CTA Label",
          defaultValue: "View Our Work",
        },
      ],
    },

    /* ── Contact Info ── */
    {
      name: "contact",
      type: "group",
      label: "Contact Info",
      fields: [
        {
          name: "email",
          type: "email",
          label: "Contact Email",
          defaultValue: "hello@ascensiondynamics.io",
        },
        {
          name: "locations",
          type: "text",
          label: "Office Locations",
          defaultValue: "",
        },
        {
          name: "phone",
          type: "text",
          label: "Phone Number",
          defaultValue: "+254-723-272915",
        },
      ],
    },
  ],
};
