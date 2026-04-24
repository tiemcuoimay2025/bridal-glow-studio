import { useState, type ChangeEvent } from "react";
import { uploadImage } from "@/lib/upload";

export function ImageInput({
  value,
  onChange,
  label = "Ảnh",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file);
    setUploading(false);
    if (url) onChange(url);
    e.target.value = "";
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <div className="flex items-start gap-4">
        {value && (
          <img src={value} alt="" className="h-24 w-24 rounded border border-border object-cover" />
        )}
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Dán URL ảnh hoặc upload bên dưới"
            className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
          />
          <label className="inline-block cursor-pointer rounded border border-border px-3 py-1.5 text-xs hover:bg-secondary">
            {uploading ? "Đang upload..." : "📁 Upload file"}
            <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={uploading} />
          </label>
        </div>
      </div>
    </div>
  );
}

export function Field({
  label,
  value,
  onChange,
  type = "text",
  textarea,
  rows = 3,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          rows={rows}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
        />
      )}
    </label>
  );
}

export function SaveBar({ onSave, saving, dirty }: { onSave: () => void; saving: boolean; dirty: boolean }) {
  return (
    <div className="sticky bottom-0 mt-8 -mx-6 border-t border-border bg-background/95 px-6 py-4 backdrop-blur md:-mx-10 md:px-10">
      <button
        onClick={onSave}
        disabled={saving || !dirty}
        className="bg-foreground px-6 py-3 text-xs uppercase tracking-[0.3em] text-background hover:bg-foreground/90 disabled:opacity-40"
      >
        {saving ? "Đang lưu..." : dirty ? "Lưu thay đổi" : "Đã lưu"}
      </button>
    </div>
  );
}

export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-8">
      <h1 className="font-serif text-3xl text-foreground">{title}</h1>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}
