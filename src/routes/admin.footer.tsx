import { createFileRoute } from "@tanstack/react-router";
import { useSiteContent } from "@/lib/useSiteContent";
import { Field, SaveBar, PageHeader } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/admin/footer")({ component: FooterAdmin });

function FooterAdmin() {
  const { value, update, save, saving, dirty } = useSiteContent("footer");
  const contacts: Array<{ label: string; href: string }> = value.contacts ?? [];
  const socials: Array<{ label: string; href: string }> = value.socials ?? [];

  const updateList = (key: "contacts" | "socials", list: any[]) => update({ [key]: list });

  const renderList = (key: "contacts" | "socials", list: Array<{ label: string; href: string }>) => (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {key === "contacts" ? "Liên hệ" : "Mạng xã hội"}
        </span>
        <button onClick={() => updateList(key, [...list, { label: "", href: "" }])}
          className="text-xs text-rose hover:underline">+ Thêm</button>
      </div>
      <div className="space-y-2">
        {list.map((it, i) => (
          <div key={i} className="flex gap-2">
            <input value={it.label} placeholder="Nhãn" onChange={(e) => {
              const next = list.map((x, idx) => idx === i ? { ...x, label: e.target.value } : x);
              updateList(key, next);
            }} className="flex-1 rounded border border-border bg-background px-3 py-2 text-sm" />
            <input value={it.href} placeholder="Link" onChange={(e) => {
              const next = list.map((x, idx) => idx === i ? { ...x, href: e.target.value } : x);
              updateList(key, next);
            }} className="flex-1 rounded border border-border bg-background px-3 py-2 text-sm" />
            <button onClick={() => updateList(key, list.filter((_, idx) => idx !== i))} className="text-xs text-rose">Xoá</button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <PageHeader title="Footer" description="Thông tin chân trang." />
      <div className="space-y-6 max-w-2xl">
        <Field label="Brand" value={value.brand ?? ""} onChange={(v) => update({ brand: v })} />
        <Field label="Tagline" value={value.tagline ?? ""} onChange={(v) => update({ tagline: v })} />
        <Field label="Mô tả ngắn" value={value.description ?? ""} onChange={(v) => update({ description: v })} textarea />
        <Field label="Tiêu đề mục liên hệ" value={value.contact_title ?? ""} onChange={(v) => update({ contact_title: v })} />
        {renderList("contacts", contacts)}
        <Field label="Tiêu đề mục theo dõi" value={value.social_title ?? ""} onChange={(v) => update({ social_title: v })} />
        {renderList("socials", socials)}
        <Field label="Copyright" value={value.copyright ?? ""} onChange={(v) => update({ copyright: v })} />
        <Field label="Tagline phải" value={value.tagline_right ?? ""} onChange={(v) => update({ tagline_right: v })} />
      </div>
      <SaveBar onSave={save} saving={saving} dirty={dirty} />
    </div>
  );
}
