import { createFileRoute } from "@tanstack/react-router";
import { useSiteContent } from "@/lib/useSiteContent";
import { Field, SaveBar, PageHeader, ImageInput } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/admin/seo")({ component: SeoAdmin });

function SeoAdmin() {
  const seo = useSiteContent("seo");
  const sticky = useSiteContent("sticky_cta");
  const styles = useSiteContent("styles_section");
  const gallery = useSiteContent("gallery_section");
  const services = useSiteContent("services_section");
  const testimonials = useSiteContent("testimonials_section");
  const booking = useSiteContent("booking_section");

  const saveAll = async () => {
    seo.save(); sticky.save(); styles.save(); gallery.save(); services.save(); testimonials.save(); booking.save();
  };
  const dirty = seo.dirty || sticky.dirty || styles.dirty || gallery.dirty || services.dirty || testimonials.dirty || booking.dirty;
  const saving = seo.saving || sticky.saving || styles.saving || gallery.saving || services.saving || testimonials.saving || booking.saving;

  const renderSection = (title: string, ctx: any) => (
    <div className="rounded border border-border bg-background p-6">
      <h3 className="mb-4 font-serif text-xl">{title}</h3>
      <div className="space-y-4">
        <Field label="Eyebrow" value={ctx.value.eyebrow ?? ""} onChange={(v) => ctx.update({ eyebrow: v })} />
        <Field label="Tiêu đề" value={ctx.value.title ?? ""} onChange={(v) => ctx.update({ title: v })} />
        <Field label="Mô tả" value={ctx.value.subtitle ?? ""} onChange={(v) => ctx.update({ subtitle: v })} textarea />
      </div>
    </div>
  );

  const bookingOpts: string[] = booking.value.service_options ?? [];

  return (
    <div>
      <PageHeader title="SEO, CTA & Tiêu đề các section" />
      <div className="space-y-6 max-w-3xl">
        <div className="rounded border border-border bg-background p-6">
          <h3 className="mb-4 font-serif text-xl">SEO</h3>
          <div className="space-y-4">
            <Field label="Title" value={seo.value.title ?? ""} onChange={(v) => seo.update({ title: v })} />
            <Field label="Meta description" value={seo.value.description ?? ""} onChange={(v) => seo.update({ description: v })} textarea />
            <Field label="OG title" value={seo.value.og_title ?? ""} onChange={(v) => seo.update({ og_title: v })} />
            <Field label="OG description" value={seo.value.og_description ?? ""} onChange={(v) => seo.update({ og_description: v })} textarea />
            <ImageInput label="OG image" value={seo.value.og_image ?? ""} onChange={(v) => seo.update({ og_image: v })} />
          </div>
        </div>

        <div className="rounded border border-border bg-background p-6">
          <h3 className="mb-4 font-serif text-xl">Sticky CTA (nút nổi)</h3>
          <div className="space-y-4">
            <Field label="Số điện thoại (tel:)" value={sticky.value.phone ?? ""} onChange={(v) => sticky.update({ phone: v })} />
            <Field label="Link Zalo" value={sticky.value.zalo ?? ""} onChange={(v) => sticky.update({ zalo: v })} />
            <Field label="Nhãn nút Đặt lịch" value={sticky.value.booking_label ?? ""} onChange={(v) => sticky.update({ booking_label: v })} />
          </div>
        </div>

        {renderSection("Section: Phong cách", styles)}
        {renderSection("Section: Album", gallery)}
        {renderSection("Section: Dịch vụ", services)}
        {renderSection("Section: Cảm nhận", testimonials)}

        <div className="rounded border border-border bg-background p-6">
          <h3 className="mb-4 font-serif text-xl">Section: Đặt lịch</h3>
          <div className="space-y-4">
            <Field label="Eyebrow" value={booking.value.eyebrow ?? ""} onChange={(v) => booking.update({ eyebrow: v })} />
            <Field label="Tiêu đề" value={booking.value.title ?? ""} onChange={(v) => booking.update({ title: v })} />
            <Field label="Mô tả" value={booking.value.subtitle ?? ""} onChange={(v) => booking.update({ subtitle: v })} textarea />
            <Field label="Nhãn nút submit" value={booking.value.submit_label ?? ""} onChange={(v) => booking.update({ submit_label: v })} />
            <Field label="Thông báo thành công" value={booking.value.success_message ?? ""} onChange={(v) => booking.update({ success_message: v })} />
            <div>
              <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Danh sách dịch vụ trong dropdown</span>
              <div className="space-y-2">
                {bookingOpts.map((o, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={o} onChange={(e) => {
                      const next = bookingOpts.map((x, idx) => idx === i ? e.target.value : x);
                      booking.update({ service_options: next });
                    }} className="flex-1 rounded border border-border bg-background px-3 py-2 text-sm" />
                    <button onClick={() => booking.update({ service_options: bookingOpts.filter((_, idx) => idx !== i) })} className="text-xs text-rose">Xoá</button>
                  </div>
                ))}
                <button onClick={() => booking.update({ service_options: [...bookingOpts, ""] })} className="text-xs text-rose hover:underline">+ Thêm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 mt-8 -mx-6 border-t border-border bg-background/95 px-6 py-4 backdrop-blur md:-mx-10 md:px-10">
        <button onClick={saveAll} disabled={saving || !dirty}
          className="bg-foreground px-6 py-3 text-xs uppercase tracking-[0.3em] text-background hover:bg-foreground/90 disabled:opacity-40">
          {saving ? "Đang lưu..." : dirty ? "Lưu tất cả" : "Đã lưu"}
        </button>
      </div>
    </div>
  );
}
