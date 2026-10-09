import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const payload = await getPayload({ config });

    const svcMap: Record<string, string> = {
      web: "web-app", cld: "cloud-devops", ai: "ai-ml",
      mob: "mobile", sec: "cybersecurity", dat: "data-analytics",
    };
    const budgetMap: Record<string, string> = {
      "< $25k": "under-25k", "$25k–$75k": "25k-75k",
      "$75k–$200k": "75k-200k", "$200k+": "200k-plus", Enterprise: "enterprise",
    };
    const timelineMap: Record<string, string> = {
      "ASAP": "asap", "1–3 months": "1-3mo", "3–6 months": "3-6mo", "6+ months": "6mo-plus",
    };
    const sourceMap: Record<string, string> = {
      Google: "google", LinkedIn: "linkedin", Referral: "referral",
      Event: "event", "Social Media": "social", Other: "other",
    };

    await payload.create({
      collection: "leads",
      data: {
        firstName:   body.fn       ?? "",
        lastName:    body.ln       ?? "",
        email:       body.email    ?? "",
        company:     body.company  ?? "",
        role:        body.role     ?? "",
        services:    (body.svcs ?? []).map((s: string) => svcMap[s] ?? s),
        budget:      budgetMap[body.budget]   ?? body.budget   ?? "",
        timeline:    timelineMap[body.timeline] ?? body.timeline ?? "",
        projectName: body.pname ?? "",
        goals:       body.goals  ?? "",
        currentTech: body.tech   ?? "",
        links:       body.links  ?? "",
        source:      sourceMap[body.source] ?? body.source ?? "",
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[leads] failed to save:", err);
    return NextResponse.json({ ok: false, error: "Failed to save lead" }, { status: 500 });
  }
}
