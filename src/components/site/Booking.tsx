import { useState, type FormEvent } from "react";
import { z } from "zod";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(8).max(20).regex(/^[0-9+\-\s()]+$/, "SĐT không hợp lệ"),
  weddingDate: z.string().trim().min(1),
  service: z.string().trim().min(1),
  notes: z.string().trim().max(500).optional(),
});

export function Booking() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const { data } = useQuery({
    queryKey: ["site_content", "booking_section"],
    queryFn: async () => {
      const { data } = await supabase.from("site_content").select("value").eq("key", "booking_section").maybeSingle();
      return (data?.value ?? {}) as any;
    },
  });
  const options: string[] = data?.service_options ?? ["Trang điểm cô dâu", "Pre-wedding", "Trang điểm dự tiệc", "Tư vấn khác"];

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: f.get("name"), phone: f.get("phone"),
      weddingDate: f.get("weddingDate"), service: f.get("service"),
      notes: f.get("notes") || undefined,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Vui lòng kiểm tra lại");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("bookings").insert({
      name: parsed.data.name, phone: parsed.data.phone,
      wedding_date: parsed.data.weddingDate, service: parsed.data.service,
      notes: parsed.data.notes ?? "", status: "new",
    });
    setSubmitting(false);
    if (error) return toast.error(error.message);
    setDone(true);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="booking" className="relative bg-secondary/50 py-24 md:py-36">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <SectionHeading eyebrow={data?.eyebrow ?? "Booking"} title={data?.title ?? "Giữ lịch ngay"} subtitle={data?.subtitle} />
        <Reveal>
          <form onSubmit={onSubmit} className="mt-14 space-y-6 border border-border/70 bg-background p-8 shadow-luxury md:p-12">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FieldX label="Họ & tên" name="name" required />
              <FieldX label="Số điện thoại" name="phone" type="tel" required />
              <FieldX label="Ngày cưới" name="weddingDate" type="date" required />
              <SelectX label="Dịch vụ" name="service" options={options} />
            </div>
            <FieldX label="Ghi chú" name="notes" textarea />
            {done && <p className="text-sm text-foreground">{data?.success_message ?? "✦ Cảm ơn bạn!"}</p>}
            <button type="submit" disabled={submitting}
              className="group inline-flex w-full items-center justify-center gap-3 bg-foreground px-8 py-4 text-xs uppercase tracking-[0.3em] text-background hover:bg-foreground/90 md:w-auto disabled:opacity-50">
              {submitting ? "Đang gửi..." : data?.submit_label ?? "Gửi yêu cầu"}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function FieldX({ label, name, type = "text", required, textarea }: { label: string; name: string; type?: string; required?: boolean; textarea?: boolean }) {
  const cls = "mt-2 w-full border-0 border-b border-border bg-transparent py-3 text-foreground outline-none focus:border-rose";
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{label}{required && <span className="text-rose"> *</span>}</span>
      {textarea ? <textarea name={name} rows={3} className={cls} /> : <input name={name} type={type} required={required} className={cls} />}
    </label>
  );
}

function SelectX({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{label} <span className="text-rose">*</span></span>
      <select name={name} required defaultValue=""
        className="mt-2 w-full border-0 border-b border-border bg-transparent py-3 text-foreground outline-none focus:border-rose">
        <option value="" disabled>Chọn dịch vụ</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
