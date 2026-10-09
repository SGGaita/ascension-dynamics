import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "client", "year", "status", "updatedAt"],
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "title", type: "text", required: true },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          admin: { description: "URL-safe identifier, e.g. nbps-alumni" },
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "client", type: "text", required: true },
        { name: "category", type: "text", required: true, admin: { description: "e.g. Health Research Information System" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "year", type: "text", required: true, admin: { description: "e.g. 2025" } },
        { name: "period", type: "text", required: true, admin: { description: "e.g. Jan 2025 – Apr 2025" } },
        {
          name: "status",
          type: "select",
          required: true,
          defaultValue: "Live",
          options: ["Live", "In development", "Maintained"],
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "liveUrl", type: "text", label: "Live URL", admin: { description: "https://…" } },
        { name: "accent", type: "text", required: true, defaultValue: "#0B7F86", admin: { description: "Hex accent colour, e.g. #0B7F86" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "desktopImage", type: "upload", relationTo: "media", label: "Laptop screenshot", admin: { description: "16:10, e.g. 1600×1000" } },
        { name: "mobileImage", type: "upload", relationTo: "media", label: "Phone screenshot", admin: { description: "~9:19.5, e.g. 780×1680" } },
      ],
    },
    {
      name: "shortDesc",
      type: "textarea",
      required: true,
      label: "Short description",
      admin: { description: "1–2 sentences shown on portfolio cards" },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      admin: { description: "Full project description shown on the case-study page" },
    },
    {
      name: "scope",
      type: "array",
      label: "Scope of Work",
      fields: [{ name: "item", type: "text", required: true, label: "Deliverable" }],
    },
    {
      name: "features",
      type: "array",
      label: "Key Features",
      fields: [{ name: "feature", type: "text", required: true, label: "Feature" }],
    },
    {
      name: "tech",
      type: "array",
      label: "Technology Used",
      fields: [{ name: "name", type: "text", required: true, label: "Technology" }],
    },
    {
      name: "order",
      type: "number",
      defaultValue: 99,
      admin: { description: "Display order (lower = first)" },
    },
  ],
};
