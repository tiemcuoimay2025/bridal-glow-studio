import { useState, type FormEvent } from "react";
import { z } from "zod";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const schema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập tên").max(80),
  phone: z
    .string()
    .trim()
    .min(8, "Số điện thoại không hợp lệ")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Số điện thoại không hợp lệ"),
  weddingDate: z.string().trim().min(1, "Vui lòng chọn ngày"),
  service: z.string().trim().min(1, "Vui lòng chọn dịch vụ"),
  notes: z.string().trim().max(500).optional(),
});

export function Booking() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [error, setError] = useState<string>("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const result = schema.safeParse({
      name: f.get("name"),
      phone: f.get("phone"),
      weddingDate: f.get("weddingDate"),
      service: f.get("service"),
      notes: f.get("notes") || undefined,
    });
    if (!result.success) {
      setStatus("error");
      setError(result.error.issues[0]?.message ?? "Vui lòng kiểm tra lại");
      return;
    }
    setStatus("ok");
    setError("");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="booking" className="relative bg-secondary/50 py-24 md:py-36">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Booking"
          title="Giữ lịch ngay hôm nay"
          subtitle="Để lại thông tin, ANHTHULE sẽ liên hệ tư vấn cá nhân trong vòng 24 giờ."
        />

        <Reveal>
          <form
            onSubmit={onSubmit}
            className="mt-14 space-y-6 border border-border/70 bg-background p-8 shadow-luxury md:p-12"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field label="Họ & tên" name="name" required />
              <Field label="Số điện thoại" name="phone" type="tel" required />
              <Field label="Ngày cưới" name="weddingDate" type="date" required />
              <SelectField
                label="Dịch vụ"
                name="service"
                options={[
                  "Trang điểm cô dâu",
                  "Pre-wedding",
                  "Trang điểm dự tiệc",
                  "Tư vấn khác",
                ]}
              />
            </div>
            <Field label="Ghi chú" name="notes" textarea />

            {status === "error" && (
              <p className="text-sm text-rose">{error}</p>
            )}
            {status === "ok" && (
              <p className="text-sm text-foreground">
                ✦ Cảm ơn bạn! ANHTHULE sẽ liên hệ trong 24h tới.
              </p>
            )}

            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-3 bg-foreground px-8 py-4 text-xs uppercase tracking-[0.3em] text-background transition-all hover:bg-foreground/90 md:w-auto"
            >
              Gửi yêu cầu đặt lịch
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const cls =
    "mt-2 w-full border-0 border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-rose";
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
        {required && <span className="text-rose"> *</span>}
      </span>
      {textarea ? (
        <textarea name={name} rows={3} className={cls} />
      ) : (
        <input name={name} type={type} required={required} className={cls} />
      )}
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        {label} <span className="text-rose">*</span>
      </span>
      <select
        name={name}
        required
        defaultValue=""
        className="mt-2 w-full border-0 border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-rose"
      >
        <option value="" disabled>
          Chọn dịch vụ
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
