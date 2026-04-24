import { createFileRoute } from "@tanstack/react-router";
import { useSiteContent } from "@/lib/useSiteContent";
import { Field, ImageInput, SaveBar, PageHeader } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/admin/header")({ component: HeaderAdmin });

function HeaderAdmin() {
  const { value, update, save, saving, dirty } = useSiteContent("header");
  const menu: Array<{ href: string; label: string }> = value.menu ?? [];

  const setItem = (i: number, k: "href" | "label", v: string) => {
    const next = menu.map((m, idx) => (idx === i ? { ...m, [k]: v } : m));
    update({ menu: next });
  };
  const add = () => update({ menu: [...menu, { href: "#", label: "Mới" }] });
  const remove = (i: number) => update({ menu: menu.filter((_, idx) => idx !== i) });
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= menu.length) return;
    const next = [...menu];
    [next[i], next[j]] = [next[j], next[i]];
    update({ menu: next });
  };

  return (
    <div>
      <PageHeader title="Header & Logo" description="Chữ thương hiệu, tagline và menu điều hướng." />
      <div className="space-y-6 max-w-2xl">
        <Field label="Brand (chữ logo)" value={value.brand ?? ""} onChange={(v) => update({ brand: v })} />
        <Field label="Tagline" value={value.tagline ?? ""} onChange={(v) => update({ tagline: v })} />
        <ImageInput label="Logo (tuỳ chọn — để trống dùng chữ)"
          value={value.logo_url ?? ""} onChange={(v) => update({ logo_url: v })} />
        <Field label="Nhãn nút CTA" value={value.cta_label ?? ""} onChange={(v) => update({ cta_label: v })} />

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Menu</span>
            <button onClick={add} className="text-xs text-rose hover:underline">+ Thêm mục</button>
          </div>
          <div className="space-y-2">
            {menu.map((m, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input value={m.label} placeholder="Nhãn" onChange={(e) => setItem(i, "label", e.target.value)}
                  className="flex-1 rounded border border-border bg-background px-3 py-2 text-sm" />
                <input value={m.href} placeholder="#about hoặc /trang" onChange={(e) => setItem(i, "href", e.target.value)}
                  className="flex-1 rounded border border-border bg-background px-3 py-2 text-sm" />
                <button onClick={() => move(i, -1)} className="text-muted-foreground px-2">↑</button>
                <button onClick={() => move(i, 1)} className="text-muted-foreground px-2">↓</button>
                <button onClick={() => remove(i)} className="text-xs text-rose">Xoá</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SaveBar onSave={save} saving={saving} dirty={dirty} />
    </div>
  );
}
