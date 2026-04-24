import { createFileRoute } from "@tanstack/react-router";
import { useSiteContent } from "@/lib/useSiteContent";
import { Field, ImageInput, SaveBar, PageHeader } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/admin/about")({ component: AboutAdmin });

function AboutAdmin() {
  const { value, update, save, saving, dirty } = useSiteContent("about");
  const paragraphs: string[] = value.paragraphs ?? [];
  const stats: Array<{ n: string; l: string }> = value.stats ?? [];

  const setPara = (i: number, v: string) => {
    const next = [...paragraphs];
    next[i] = v;
    update({ paragraphs: next });
  };
  const addPara = () => update({ paragraphs: [...paragraphs, ""] });
  const removePara = (i: number) => update({ paragraphs: paragraphs.filter((_, idx) => idx !== i) });

  const setStat = (i: number, k: "n" | "l", v: string) => {
    const next = stats.map((s, idx) => (idx === i ? { ...s, [k]: v } : s));
    update({ stats: next });
  };
  const addStat = () => update({ stats: [...stats, { n: "", l: "" }] });
  const removeStat = (i: number) => update({ stats: stats.filter((_, idx) => idx !== i) });

  return (
    <div>
      <PageHeader title="Giới thiệu" description="Phần About the Artist." />
      <div className="space-y-6 max-w-2xl">
        <Field label="Eyebrow" value={value.eyebrow ?? ""} onChange={(v) => update({ eyebrow: v })} />
        <Field label="Tiêu đề (có thể dùng <em> và <br/>)" value={value.title_html ?? ""} onChange={(v) => update({ title_html: v })} textarea />
        <ImageInput label="Ảnh About" value={value.image_url ?? ""} onChange={(v) => update({ image_url: v })} />

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Đoạn mô tả</span>
            <button onClick={addPara} className="text-xs text-rose hover:underline">+ Thêm đoạn</button>
          </div>
          <div className="space-y-3">
            {paragraphs.map((p, i) => (
              <div key={i} className="flex gap-2">
                <textarea value={p} rows={3} onChange={(e) => setPara(i, e.target.value)}
                  className="flex-1 rounded border border-border bg-background px-3 py-2 text-sm" />
                <button onClick={() => removePara(i)} className="text-xs text-muted-foreground hover:text-rose">Xoá</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Số liệu nổi bật</span>
            <button onClick={addStat} className="text-xs text-rose hover:underline">+ Thêm</button>
          </div>
          <div className="space-y-2">
            {stats.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input value={s.n} placeholder="500+" onChange={(e) => setStat(i, "n", e.target.value)}
                  className="w-32 rounded border border-border bg-background px-3 py-2 text-sm" />
                <input value={s.l} placeholder="Cô dâu" onChange={(e) => setStat(i, "l", e.target.value)}
                  className="flex-1 rounded border border-border bg-background px-3 py-2 text-sm" />
                <button onClick={() => removeStat(i)} className="text-xs text-muted-foreground hover:text-rose">Xoá</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SaveBar onSave={save} saving={saving} dirty={dirty} />
    </div>
  );
}
