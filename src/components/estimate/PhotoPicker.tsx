"use client";

import { useEffect, useMemo, useState } from "react";
import { Upload } from "lucide-react";
import { FORM, UPLOAD_LIMITS } from "@/content/site";
import { rejectFile } from "@/lib/estimate-schema";
import { FieldError } from "./fields";

type Picked = { file: File; preview: string };

/**
 * Photo drop zone. The prototype only collected file *names*; production holds
 * real File objects, validates type and size, caps at 10, and shows thumbnails.
 */
export function PhotoPicker({
  files,
  onChange,
}: {
  files: File[];
  onChange: (files: File[]) => void;
}) {
  const [errors, setErrors] = useState<string[]>([]);

  // Previews are derived from the files, so compute them during render...
  const previews: Picked[] = useMemo(
    () => files.map((file) => ({ file, preview: URL.createObjectURL(file) })),
    [files],
  );

  // ...and use the effect only to release the URLs, which is a real side effect.
  useEffect(() => {
    return () => previews.forEach((p) => URL.revokeObjectURL(p.preview));
  }, [previews]);

  function handleSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(event.target.files ?? []);
    const problems: string[] = [];
    const accepted: File[] = [];

    for (const file of picked) {
      const reason = rejectFile(file);
      if (reason) problems.push(reason);
      else accepted.push(file);
    }

    const combined = [...files, ...accepted];
    if (combined.length > UPLOAD_LIMITS.maxFiles) {
      problems.push(`Only the first ${UPLOAD_LIMITS.maxFiles} photos were kept.`);
    }

    setErrors(problems);
    onChange(combined.slice(0, UPLOAD_LIMITS.maxFiles));
    // Reset so picking the same file again still fires a change event.
    event.target.value = "";
  }

  return (
    <div>
      <label className="flex cursor-pointer flex-col items-start gap-2.5 border-2 border-dashed border-ink bg-white p-[30px] hover:bg-gold-tint">
        <Upload size={30} strokeWidth={2} className="stroke-gold-deep" />
        <span className="text-[17px] font-extrabold">
          {FORM.photos.heading}
        </span>
        <span className="text-[14px] text-ink-70">
          {FORM.photos.constraints}
        </span>
        <span className="mt-1.5 bg-ink px-5 py-3.5 text-[13px] font-extrabold uppercase tracking-[.06em] text-page">
          {FORM.photos.chip}
        </span>
        <input
          type="file"
          accept={UPLOAD_LIMITS.accept}
          multiple
          onChange={handleSelect}
          className="hidden"
        />
      </label>

      {errors.length > 0 ? (
        <div className="mt-3 flex flex-col gap-1">
          {errors.map((error) => (
            <FieldError key={error} message={error} />
          ))}
        </div>
      ) : null}

      {previews.length > 0 ? (
        <ul className="mt-3 flex list-none flex-wrap gap-2.5">
          {previews.map(({ file, preview }, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center gap-2 border-2 border-ink bg-white p-2.5 text-[12.5px] font-semibold"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- local object URL */}
              <img
                src={preview}
                alt=""
                className="h-9 w-9 border-2 border-hatch-a object-cover"
              />
              <span className="max-w-[16ch] truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => onChange(files.filter((_, j) => j !== i))}
                aria-label={`Remove ${file.name}`}
                className="cursor-pointer bg-transparent px-0.5 text-[15px] font-extrabold text-gold-deep"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
