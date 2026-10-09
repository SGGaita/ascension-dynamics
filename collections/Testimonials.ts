import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "company", "stat", "updatedAt"],
  },
  fields: [
    {
      name: "quote",
      type: "textarea",
      required: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "text",
      required: true,
      admin: { description: "e.g. CTO, NexaPay Financial Services" },
    },
    {
      name: "emoji",
      type: "text",
      required: true,
      admin: { description: "Single emoji for avatar, e.g. 👩‍💼" },
    },
    {
      name: "accentRgb",
      type: "text",
      required: true,
      admin: { description: "Accent color as R,G,B string, e.g. 46,204,138" },
    },
    {
      name: "stat",
      type: "text",
      required: true,
      admin: { description: "Key result badge, e.g. −38% infra cost" },
    },
    {
      name: "company",
      type: "text",
      required: true,
      admin: { description: "Short company name, e.g. NexaPay" },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 99,
      admin: { description: "Display order (lower = first)" },
    },
  ],
};
