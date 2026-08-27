"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";
import {
  CONTACT,
  ESTIMATE_DISCLAIMER,
  FORM,
  NEXT_STEPS,
  PROPERTY_TYPES,
  SERVICE_OPTIONS,
  SERVICE_SLUGS,
  type ServiceOption,
} from "@/content/site";
import { estimateSchema, type EstimateInput } from "@/lib/estimate-schema";
import { FORM_MODE } from "@/lib/metadata";
import { Button } from "@/components/ui/Button";
import { Field, StepHeading, controlClass } from "./fields";
import { PhotoPicker } from "./PhotoPicker";
import { SuccessPanel } from "./SuccessPanel";

type Status = "idle" | "submitting" | "success" | "error";

export function EstimateForm() {
  const searchParams = useSearchParams();
  // Services-page CTAs deep-link the service through, e.g. ?service=moving.
  const preselected: ServiceOption =
    SERVICE_SLUGS[searchParams.get("service") ?? ""] ?? "Moving";

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  // Submissions completed implausibly fast are almost certainly automated.
  const renderedAt = useRef(0);
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EstimateInput>({
    resolver: zodResolver(estimateSchema),
    defaultValues: { service: preselected, propertyType: "House" },
  });

  // useWatch subscribes to just this field, and unlike watch() it memoizes.
  const service = useWatch({ control, name: "service" });
  const showMoving = service === "Moving" || service === "Multiple Services";
  const showDonation =
    service === "Donation Pickup" || service === "Multiple Services";

  useEffect(() => {
    if (status === "success") window.scrollTo({ top: 0, behavior: "auto" });
  }, [status]);

  async function onSubmit(values: EstimateInput) {
    setStatus("submitting");
    setErrorMessage("");

    // Review build: everything above still runs — validation, conditional
    // panels, photo checks — so the client sees the real flow. Only delivery is
    // skipped. Safe here because nobody real submits on the review site.
    if (FORM_MODE === "demo") {
      setStatus("success");
      return;
    }

    const body = new FormData();
    for (const [key, value] of Object.entries(values)) {
      body.append(key, String(value ?? ""));
    }
    body.append("elapsedMs", String(Date.now() - renderedAt.current));
    photos.forEach((photo) => body.append("photos", photo));

    try {
      const response = await fetch("/api/estimate", { method: "POST", body });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Something went wrong.");
      }
      setStatus("success");
    } catch (error) {
      // Values stay in the form so nothing typed is lost on a failed send.
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  }

  if (status === "success") {
    return (
      <SuccessPanel
        onReset={() => {
          // Start genuinely fresh — the prototype remounts its inputs here.
          reset({ service: preselected, propertyType: "House" });
          setStatus("idle");
          setPhotos([]);
          renderedAt.current = Date.now();
        }}
      />
    );
  }

  return (
    <div className="pad mohsplit items-start">
      <form
        noValidate
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        className="flex min-w-0 flex-col gap-[30px]"
      >
        {/* Honeypot: off-screen and hidden from assistive tech. */}
        <div aria-hidden="true" className="absolute left-[-9999px]">
          <label>
            Company
            <input type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
          </label>
        </div>

        <div>
          <StepHeading>{FORM.steps.info}</StepHeading>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
            <Field label={FORM.fullName.label} error={errors.fullName?.message}>
              <input
                {...register("fullName")}
                placeholder={FORM.fullName.placeholder}
                autoComplete="name"
                className={controlClass}
              />
            </Field>
            <Field label={FORM.phone.label} error={errors.phone?.message}>
              <input
                {...register("phone")}
                type="tel"
                placeholder={FORM.phone.placeholder}
                autoComplete="tel"
                className={controlClass}
              />
            </Field>
            <Field label={FORM.email.label} error={errors.email?.message}>
              <input
                {...register("email")}
                type="email"
                placeholder={FORM.email.placeholder}
                autoComplete="email"
                className={controlClass}
              />
            </Field>
            <Field label={FORM.date.label} error={errors.serviceDate?.message}>
              <input
                {...register("serviceDate")}
                type="date"
                className={`${controlClass} py-3.5`}
              />
            </Field>
            <Field
              label={FORM.pickupAddress.label}
              error={errors.pickupAddress?.message}
              full
            >
              <input
                {...register("pickupAddress")}
                placeholder={FORM.pickupAddress.placeholder}
                autoComplete="street-address"
                className={controlClass}
              />
            </Field>
          </div>
        </div>

        <div>
          <StepHeading>{FORM.steps.service}</StepHeading>
          <div
            role="radiogroup"
            aria-label={FORM.steps.service}
            className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] border-2 border-ink"
          >
            {SERVICE_OPTIONS.map((option) => {
              const selected = service === option;
              return (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setValue("service", option)}
                  className={`cursor-pointer border-b-2 border-r-2 border-ink px-4 py-5 text-left text-[13.5px] font-extrabold uppercase tracking-[.06em] ${
                    selected ? "bg-gold text-navy" : "bg-transparent text-ink"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {showMoving ? (
          <div className="border-2 border-gold-deep bg-gold-tint p-6">
            <StepHeading tone="gold">{FORM.steps.movingPanel}</StepHeading>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
              <Field
                label={FORM.destination.label}
                error={errors.destinationAddress?.message}
                full
              >
                <input
                  {...register("destinationAddress")}
                  placeholder={FORM.destination.placeholder}
                  className={controlClass}
                />
              </Field>
              <Field label={FORM.propertyType.label}>
                <select
                  {...register("propertyType")}
                  className={`${controlClass} py-3.5`}
                >
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </Field>
              <Field label={FORM.floor.label}>
                <input
                  {...register("floor")}
                  placeholder={FORM.floor.placeholder}
                  className={controlClass}
                />
              </Field>
              <Field label={FORM.access.label} full>
                <textarea
                  {...register("access")}
                  rows={2}
                  placeholder={FORM.access.placeholder}
                  className={`${controlClass} resize-y`}
                />
              </Field>
            </div>
          </div>
        ) : null}

        {showDonation ? (
          <div className="border-2 border-gold-deep bg-gold-tint p-6">
            <StepHeading tone="gold">{FORM.steps.donationPanel}</StepHeading>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
              <Field label={FORM.donationOrg.label}>
                <input
                  {...register("donationOrg")}
                  placeholder={FORM.donationOrg.placeholder}
                  className={controlClass}
                />
              </Field>
              <Field label={FORM.donationAddress.label}>
                <input
                  {...register("donationAddress")}
                  placeholder={FORM.donationAddress.placeholder}
                  className={controlClass}
                />
              </Field>
            </div>
          </div>
        ) : null}

        <div>
          <StepHeading>{FORM.steps.items}</StepHeading>
          <label className="flex flex-col gap-[7px]">
            <span className="text-[12px] font-extrabold uppercase tracking-[.1em] text-ink-70">
              {FORM.items.label}
            </span>
            <textarea
              {...register("items")}
              rows={6}
              placeholder={FORM.items.placeholder}
              className={`${controlClass} resize-y`}
            />
            <span className="text-[12.5px] text-ink-55">
              {FORM.items.helper}
            </span>
            {errors.items?.message ? (
              <span role="alert" className="text-[12.5px] font-semibold text-[#a3261c]">
                {errors.items.message}
              </span>
            ) : null}
          </label>
        </div>

        <div>
          <StepHeading>{FORM.steps.photos}</StepHeading>
          <PhotoPicker files={photos} onChange={setPhotos} />
        </div>

        <div>
          <StepHeading>{FORM.steps.extra}</StepHeading>
          <Field label={FORM.extra.label}>
            <textarea
              {...register("extra")}
              rows={3}
              placeholder={FORM.extra.placeholder}
              className={`${controlClass} resize-y`}
            />
          </Field>
        </div>

        {status === "error" ? (
          <div role="alert" className="border-2 border-[#a3261c] bg-white p-5">
            <p className="text-[15px] font-extrabold text-ink">
              We couldn&apos;t send your request.
            </p>
            <p className="mt-1.5 text-[14px] leading-[1.6] text-ink-70">
              {errorMessage} Your details are still filled in below — try again,
              or call us at{" "}
              <a href={CONTACT.phoneHref} className="font-extrabold">
                {CONTACT.phone}
              </a>
              .
            </p>
          </div>
        ) : null}

        {FORM_MODE === "offline" ? (
          // No backend in this build. Never show a submit button that silently
          // discards a real customer's request — send them to a channel that
          // actually reaches the business.
          <div className="border-2 border-gold-deep bg-gold-tint p-6">
            <h2 className="text-[13px] font-extrabold uppercase tracking-[.16em]">
              Online requests aren&apos;t switched on yet
            </h2>
            <div className="mb-[18px] mt-1.5 h-0.5 bg-gold-deep" />
            <p className="mb-5 max-w-[64ch] text-[15px] leading-[1.65] text-ink-70">
              We&apos;re still setting this up. Call or email us with the details
              above and we&apos;ll get straight back to you with a free quote —
              photos are welcome by email.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Button href={CONTACT.phoneHref} variant="gold" size="lg">
                Call {CONTACT.phone}
              </Button>
              <Button href={CONTACT.emailHref} variant="outlineLight" size="lg">
                Email Us
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-[18px]">
            <Button
              type="submit"
              variant="gold"
              size="xl"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? FORM.submitting : FORM.submit}
            </Button>
            <span className="flex items-center gap-2 text-[12.5px] text-ink-55">
              <Lock size={15} strokeWidth={2} className="stroke-gold-deep" />
              {FORM.security}
            </span>
          </div>
        )}
      </form>

      <aside className="min-w-0 border-2 border-ink bg-navy">
        <div className="border-b-2 border-gold p-6">
          <span className="text-[11px] font-extrabold uppercase tracking-[.16em] text-gold">
            {FORM.sidebar.kicker}
          </span>
          <a
            href={CONTACT.phoneHref}
            className="mt-2.5 block text-[24px] font-extrabold text-cream no-underline hover:text-gold"
          >
            {CONTACT.phone}
          </a>
          <a
            href={CONTACT.emailHref}
            className="mt-1.5 block break-all text-[14px] font-semibold text-gold no-underline hover:text-gold-light"
          >
            {CONTACT.email}
          </a>
        </div>
        <div className="flex flex-col gap-3.5 p-6">
          <span className="text-[11px] font-extrabold uppercase tracking-[.16em] text-slate-muted">
            {FORM.sidebar.nextLabel}
          </span>
          {NEXT_STEPS.map((step, i) => (
            <div key={step} className="flex gap-3">
              <span className="text-[13px] font-extrabold text-gold">
                {i + 1}
              </span>
              <span className="text-[14px] leading-[1.55] text-slate-text">
                {step}
              </span>
            </div>
          ))}
          <div className="my-0.5 h-0.5 bg-navy-rule-alt" />
          <p className="text-[12.5px] leading-[1.55] text-slate-muted">
            {ESTIMATE_DISCLAIMER}
          </p>
        </div>
      </aside>
    </div>
  );
}
