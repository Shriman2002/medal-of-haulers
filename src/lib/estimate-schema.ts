import { z } from "zod";
import {
  PROPERTY_TYPES,
  SERVICE_OPTIONS,
  UPLOAD_LIMITS,
} from "@/content/site";

/**
 * One schema, both sides of the wire: the form validates against it inline, and
 * the route handler re-validates the parsed FormData with the same rules. Never
 * trust the client copy — the server runs this too.
 */
export const estimateSchema = z
  .object({
    fullName: z.string().trim().min(1, "Please enter your name."),
    phone: z
      .string()
      .trim()
      .min(7, "Please enter a phone number we can reach you on."),
    email: z.string().trim().email("Please enter a valid email address."),
    serviceDate: z.string().trim().min(1, "Please choose a requested date."),
    pickupAddress: z
      .string()
      .trim()
      .min(1, "Please enter the pickup address."),

    service: z.enum(SERVICE_OPTIONS),

    // Moving panel — required only when the panel is visible.
    destinationAddress: z.string().trim().optional().default(""),
    propertyType: z.enum(PROPERTY_TYPES).optional().default("House"),
    floor: z.string().trim().optional().default(""),
    access: z.string().trim().optional().default(""),

    // Donation panel — always optional.
    donationOrg: z.string().trim().optional().default(""),
    donationAddress: z.string().trim().optional().default(""),

    items: z
      .string()
      .trim()
      .min(1, "Please list the items you need moved, removed, or donated."),
    extra: z.string().trim().optional().default(""),

    // Bots fill hidden fields; humans never see this one.
    company: z.string().max(0, "Submission rejected.").optional().default(""),
  })
  .superRefine((value, ctx) => {
    const needsDestination =
      value.service === "Moving" || value.service === "Multiple Services";

    if (needsDestination && !value.destinationAddress) {
      ctx.addIssue({
        code: "custom",
        path: ["destinationAddress"],
        message: "Please enter the moving destination.",
      });
    }
  });

export type EstimateInput = z.input<typeof estimateSchema>;
export type EstimateData = z.output<typeof estimateSchema>;

/** Why a chosen file can't be accepted, or null if it's fine. */
export function rejectFile(file: File): string | null {
  const name = file.name.toLowerCase();
  const extensionOk = UPLOAD_LIMITS.extensions.some((ext) =>
    name.endsWith(ext),
  );
  // HEIC often arrives with an empty or generic MIME type, so accept on either.
  const typeOk =
    (UPLOAD_LIMITS.mimeTypes as readonly string[]).includes(file.type) ||
    extensionOk;

  if (!typeOk) return `${file.name} — must be JPG, JPEG, PNG, or HEIC.`;
  if (file.size > UPLOAD_LIMITS.maxBytes)
    return `${file.name} — larger than 10 MB.`;
  return null;
}
