import type { CollectionConfig } from "payload";

export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    useAsTitle: "firstName",
    defaultColumns: ["firstName", "lastName", "email", "company", "budget", "createdAt"],
    description: "Contact form submissions from the website",
  },
  access: {
    create: () => true,
    read: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "firstName", type: "text", required: true, label: "First Name" },
        { name: "lastName",  type: "text", required: true, label: "Last Name"  },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "email",   type: "email", required: true },
        { name: "company", type: "text",  label: "Company / Organisation" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "role",  type: "text", label: "Role / Title" },
        { name: "phone", type: "text", label: "Phone (optional)" },
      ],
    },
    {
      name: "services",
      type: "select",
      hasMany: true,
      label: "Services of Interest",
      options: [
        { label: "Web Application Development", value: "web-app" },
        { label: "Cloud Architecture & DevOps",  value: "cloud-devops" },
        { label: "AI & Machine Learning",         value: "ai-ml" },
        { label: "Mobile Development",            value: "mobile" },
        { label: "Cybersecurity & Compliance",    value: "cybersecurity" },
        { label: "Data Engineering & Analytics",  value: "data-analytics" },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "budget",
          type: "select",
          label: "Budget Range",
          options: [
            { label: "Under $25k",    value: "under-25k" },
            { label: "$25k - $75k",   value: "25k-75k"   },
            { label: "$75k - $200k",  value: "75k-200k"  },
            { label: "$200k+",        value: "200k-plus" },
            { label: "Enterprise",    value: "enterprise" },
          ],
        },
        {
          name: "timeline",
          type: "select",
          label: "Timeline",
          options: [
            { label: "ASAP",         value: "asap"      },
            { label: "1 - 3 months", value: "1-3mo"     },
            { label: "3 - 6 months", value: "3-6mo"     },
            { label: "6+ months",    value: "6mo-plus"  },
          ],
        },
      ],
    },
    {
      name: "projectName",
      type: "text",
      label: "Project Name (optional)",
    },
    {
      name: "goals",
      type: "textarea",
      label: "Project Goals & Description",
    },
    {
      name: "currentTech",
      type: "text",
      label: "Current Tech Stack (optional)",
    },
    {
      name: "links",
      type: "text",
      label: "Relevant Links (optional)",
    },
    {
      name: "source",
      type: "select",
      label: "How did you hear about us?",
      options: [
        { label: "Google",      value: "google"     },
        { label: "LinkedIn",    value: "linkedin"   },
        { label: "Referral",    value: "referral"   },
        { label: "Event",       value: "event"      },
        { label: "Social Media",value: "social"     },
        { label: "Other",       value: "other"      },
      ],
    },
  ],
  timestamps: true,
};
