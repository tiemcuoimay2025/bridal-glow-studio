import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";

export const Route = createFileRoute("/admin/gallery")({ component: () => (
  <CrudList
    table="gallery_images"
    title="Album ảnh cô dâu"
    description="Upload hoặc dán URL ảnh hiển thị trong gallery."
    defaults={{ image_url: "", alt: "", sort_order: 0 }}
    fields={[
      { key: "image_url", label: "Ảnh", type: "image" },
      { key: "alt", label: "Mô tả ngắn (alt)" },
      { key: "sort_order", label: "Thứ tự", type: "number" },
    ]}
    display={(r: any) => ({ title: r.alt || "Ảnh", image: r.image_url })}
  />
)});
