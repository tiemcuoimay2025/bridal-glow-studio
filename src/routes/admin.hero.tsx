import { createFileRoute } from "@tanstack/react-router";
import { useSiteContent } from "@/lib/useSiteContent";
import { Field, ImageInput, SaveBar, PageHeader } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/admin/hero")({ component: HeroAdmin });

function HeroAdmin() {
  const { value, update, save, saving, dirty } = useSiteContent("hero");
  return (
    <div>
      <PageHeader title="Hero Section" description="Phần đầu trang chủ — ảnh nền, tiêu đề, CTA." />
      <div className="space-y-6 max-w-2xl">
        <Field label="Eyebrow (chữ nhỏ trên)" value={value.eyebrow ?? ""} onChange={(v) => update({ eyebrow: v })} />
        <Field label="Tiêu đề chính" value={value.title ?? ""} onChange={(v) => update({ title: v })} textarea rows={2} />
        <Field label="Mô tả phụ" value={value.subtitle ?? ""} onChange={(v) => update({ subtitle: v })} textarea />
        <Field label="Nút CTA chính" value={value.cta_label ?? ""} onChange={(v) => update({ cta_label: v })} />
        <Field label="Nút CTA phụ" value={value.secondary_label ?? ""} onChange={(v) => update({ secondary_label: v })} />
        <ImageInput label="Ảnh nền hero (tuỳ chọn — để trống dùng ảnh mặc định)"
          value={value.image_url ?? ""} onChange={(v) => update({ image_url: v })} />
      </div>
      <SaveBar onSave={save} saving={saving} dirty={dirty} />
    </div>
  );
}
