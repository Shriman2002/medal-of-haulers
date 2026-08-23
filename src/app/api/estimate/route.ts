import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { UPLOAD_LIMITS } from "@/content/site";
import { estimateSchema, rejectFile } from "@/lib/estimate-schema";

/**
 * Estimate submissions.
 *
 * STUBBED ON PURPOSE. The form, validation, and both the success and error
 * states are complete and exercised end to end against this handler — it just
 * doesn't deliver anywhere yet. Uploads land in .tmp/estimate-uploads/ and the
 * payload is logged so submissions are inspectable during development.
 *
 * TODO(provider): to go live, replace the "persist" section below with:
 *   1. Upload each photo to object storage (S3 / Vercel Blob / Supabase Storage)
 *      and collect the resulting URLs.
 *   2. Send a transactional email to medalofhaulers@gmail.com containing the
 *      form fields plus *links* to those photos — not attachments. Ten files at
 *      10 MB each is 100 MB, far past Gmail's ~25 MB attachment ceiling.
 *   3. Add real spam protection (captcha, or the form provider's own filtering)
 *      on top of the honeypot and timing checks already here.
 * Nothing else in the app needs to change: the client only reads { ok, error }.
 */

export const runtime = "nodejs";

/** Anything faster than this is a bot, not someone filling in six fields. */
const MIN_ELAPSED_MS = 3_000;

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not read the submitted form." },
      { status: 400 },
    );
  }

  const fields = Object.fromEntries(
    [...form.entries()].filter(([, value]) => typeof value === "string"),
  ) as Record<string, string>;

  // Same schema the client used — the client's copy proves nothing.
  const parsed = estimateSchema.safeParse(fields);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: first?.message ?? "Please check the form and retry." },
      { status: 400 },
    );
  }

  const elapsed = Number(fields.elapsedMs ?? 0);
  if (Number.isFinite(elapsed) && elapsed > 0 && elapsed < MIN_ELAPSED_MS) {
    // Answer as though it worked; a bot learns nothing from a 200.
    console.warn("[estimate] rejected: submitted in %dms", elapsed);
    return NextResponse.json({ ok: true });
  }

  const photos = form.getAll("photos").filter((v): v is File => v instanceof File);
  if (photos.length > UPLOAD_LIMITS.maxFiles) {
    return NextResponse.json(
      { ok: false, error: `Please attach at most ${UPLOAD_LIMITS.maxFiles} photos.` },
      { status: 400 },
    );
  }
  for (const photo of photos) {
    const reason = rejectFile(photo);
    if (reason) return NextResponse.json({ ok: false, error: reason }, { status: 400 });
  }

  /* --- persist (development stand-in; see TODO(provider) above) ----------- */
  try {
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const dir = join(process.cwd(), ".tmp", "estimate-uploads", stamp);
    if (photos.length > 0) await mkdir(dir, { recursive: true });

    const saved: string[] = [];
    for (const photo of photos) {
      const safeName = photo.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      await writeFile(
        join(dir, safeName),
        Buffer.from(await photo.arrayBuffer()),
      );
      saved.push(safeName);
    }

    console.log("[estimate] new request", {
      ...parsed.data,
      company: undefined, // honeypot, always empty by this point
      photos: saved,
      savedTo: photos.length > 0 ? dir : "(no photos)",
    });
  } catch (error) {
    console.error("[estimate] failed to persist", error);
    return NextResponse.json(
      { ok: false, error: "We couldn't save your request. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
