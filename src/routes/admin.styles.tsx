import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";

export const Route = createFileRoute("/admin/styles")({ component: () => (
  <CrudList
    table="styles"
    title="Phong cách trang điểm"
    description="Quản lý các style hiển thị trên trang chủ."
    defaults={{ name: "", description: "", image_url: "", sort_order: 0 }}
    fields={[
      { key: "name", label: "Tên phong cách" },
      { key: "description", label: "Mô tả", type: "textarea" },
      { key: "image_url", label: "Ảnh", type: "image" },
      { key: "sort_order", label: "Thứ tự", type: "number" },
    ]}
    display={(r: any) => ({ title: r.name, subtitle: r.description, image: r.image_url })}
  />
)});
