import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { PROJECTS } from "@/lib/projects";
import { STATIC_TESTIMONIALS, STATIC_SERVICES } from "@/lib/cms";

export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Seed disabled in production" }, { status: 403 });
  }
  try {
    const payload = await getPayload({ config });

    /* ── Projects ──
       Inserts the portfolio projects from lib/projects.ts.
       POST /api/seed?reset=projects  → deletes every existing project first
       (use this once to replace the old demo projects). */
    const resetProjects = new URL(req.url).searchParams.get("reset") === "projects";
    if (resetProjects) {
      await payload.delete({ collection: "projects", where: { id: { exists: true } } });
    }
    const existingProjects = await payload.find({ collection: "projects", limit: 1 });
    if (!existingProjects.docs.length) {
      for (let i = 0; i < PROJECTS.length; i++) {
        const p = PROJECTS[i];
        await payload.create({
          collection: "projects",
          data: {
            slug:        p.slug,
            title:       p.title,
            client:      p.client,
            category:    p.category,
            year:        p.year,
            period:      p.period,
            status:      p.status,
            liveUrl:     p.liveUrl ?? "",
            accent:      p.accent,
            shortDesc:   p.shortDesc,
            description: p.description,
            scope:       p.scope.map(item => ({ item })),
            features:    p.features.map(feature => ({ feature })),
            tech:        p.tech.map(name => ({ name })),
            order:       i + 1,
          },
        });
      }
    }

    /* ── Testimonials ── */
    const existingT = await payload.find({ collection: "testimonials", limit: 1 });
    if (!existingT.docs.length) {
      for (let i = 0; i < STATIC_TESTIMONIALS.length; i++) {
        const t = STATIC_TESTIMONIALS[i];
        await payload.create({
          collection: "testimonials",
          data: {
            quote:     t.quote,
            name:      t.name,
            role:      t.role,
            emoji:     t.emoji,
            accentRgb: t.rgb,
            stat:      t.stat,
            company:   t.co,
            order:     i + 1,
          },
        });
      }
    }

    /* ── Services ── */
    const existingS = await payload.find({ collection: "services", limit: 1 });
    if (!existingS.docs.length) {
      for (let i = 0; i < STATIC_SERVICES.length; i++) {
        const s = STATIC_SERVICES[i];
        await payload.create({
          collection: "services",
          data: {
            icon:      s.icon,
            title:     s.title,
            desc:      s.desc,
            accentRgb: s.accentRgb,
            order:     i + 1,
          },
        });
      }
    }

    return NextResponse.json({ ok: true, message: "Database seeded with initial content." });
  } catch (err) {
    console.error("[seed]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
