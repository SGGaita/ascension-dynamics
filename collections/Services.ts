import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "accentRgb", "updatedAt"],
  },
  fields: [
    {
      name: "icon",
      type: "text",
      required: true,
      admin: { description: "Single emoji icon, e.g. ⚡" },
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "desc",
      type: "textarea",
      required: true,
      label: "Description",
    },
    {
      name: "accentRgb",
      type: "text",
      required: true,
      admin: { description: "Accent color as R,G,B string, e.g. 46,204,138" },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 99,
      admin: { description: "Display order (lower = first)" },
    },
  ],
};
