import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { ImageInput, Field, PageHeader } from "@/components/admin/AdminUI";

export type CrudField = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "image" | "checkbox" | "number";
  placeholder?: string;
};

export function CrudList<T extends Record<string, any>>({
  table,
  title,
  description,
  fields,
  defaults,
  display,
}: {
  table: string;
  title: string;
  description?: string;
  fields: CrudField[];
  defaults: Partial<T>;
  display: (row: T) => { title: string; subtitle?: string; image?: string };
}) {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<T> | null>(null);

  const list = useQuery({
    queryKey: [table],
    queryFn: async () => {
      const { data, error } = await supabase.from(table as any).select("*").order("sort_order");
      if (error) throw error;
      return (data ?? []) as unknown as T[];
    },
  });

  const upsert = useMutation({
    mutationFn: async (row: Partial<T>) => {
      const { error } = await supabase.from(table as any).upsert(row as any);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Đã lưu");
      setEditing(null);
      qc.invalidateQueries({ queryKey: [table] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Đã xoá");
      qc.invalidateQueries({ queryKey: [table] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const move = async (row: T, dir: -1 | 1) => {
    const items = [...(list.data ?? [])];
    const idx = items.findIndex((i) => i.id === row.id);
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const a = items[idx], b = items[j];
    await Promise.all([
      supabase.from(table as any).update({ sort_order: b.sort_order }).eq("id", a.id),
      supabase.from(table as any).update({ sort_order: a.sort_order }).eq("id", b.id),
    ]);
    qc.invalidateQueries({ queryKey: [table] });
  };

  return (
    <div>
      <PageHeader title={title} description={description} />
      <button onClick={() => setEditing({ ...defaults, sort_order: (list.data?.length ?? 0) + 1 } as any)}
        className="mb-6 bg-foreground px-5 py-2.5 text-xs uppercase tracking-[0.25em] text-background hover:bg-foreground/90">
        + Thêm mới
      </button>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.data?.map((row) => {
          const d = display(row);
          return (
            <div key={row.id} className="border border-border bg-background p-4">
              {d.image && <img src={d.image} alt="" className="mb-3 aspect-[4/3] w-full object-cover" />}
              <div className="font-serif text-lg">{d.title}</div>
              {d.subtitle && <div className="mt-1 text-sm text-muted-foreground line-clamp-2">{d.subtitle}</div>}
              <div className="mt-4 flex items-center gap-2 text-xs">
                <button onClick={() => setEditing(row)} className="rounded border border-border px-2 py-1 hover:bg-secondary">Sửa</button>
                <button onClick={() => move(row, -1)} className="rounded border border-border px-2 py-1">↑</button>
                <button onClick={() => move(row, 1)} className="rounded border border-border px-2 py-1">↓</button>
                <button onClick={() => { if (confirm("Xoá mục này?")) remove.mutate(row.id); }}
                  className="ml-auto rounded border border-rose/40 px-2 py-1 text-rose">Xoá</button>
              </div>
            </div>
          );
        })}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4" onClick={() => setEditing(null)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-background p-8 shadow-luxury" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-serif text-2xl">{editing.id ? "Sửa" : "Thêm mới"}</h2>
            <div className="mt-6 space-y-4">
              {fields.map((f) => {
                const v = (editing as any)[f.key] ?? "";
                const set = (val: any) => setEditing({ ...editing, [f.key]: val } as any);
                if (f.type === "image") return <ImageInput key={f.key} label={f.label} value={v} onChange={set} />;
                if (f.type === "checkbox") return (
                  <label key={f.key} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={!!v} onChange={(e) => set(e.target.checked)} />
                    {f.label}
                  </label>
                );
                if (f.type === "number") return <Field key={f.key} label={f.label} type="number" value={String(v)} onChange={(val) => set(Number(val))} placeholder={f.placeholder} />;
                return <Field key={f.key} label={f.label} value={v} onChange={set} textarea={f.type === "textarea"} placeholder={f.placeholder} />;
              })}
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button onClick={() => setEditing(null)} className="rounded border border-border px-4 py-2 text-sm">Huỷ</button>
              <button onClick={() => upsert.mutate(editing)} disabled={upsert.isPending}
                className="bg-foreground px-6 py-2 text-xs uppercase tracking-[0.25em] text-background disabled:opacity-50">
                {upsert.isPending ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
