import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";

export const Route = createFileRoute("/admin/services")({ component: () => (
  <CrudList
    table="services"
    title="Dịch vụ & Bảng giá"
    defaults={{ name: "", sub: "", description: "", price: "", featured: false, sort_order: 0 }}
    fields={[
      { key: "name", label: "Tên dịch vụ" },
      { key: "sub", label: "Sub-label (vd: Wedding Day)" },
      { key: "description", label: "Mô tả", type: "textarea" },
      { key: "price", label: "Giá (vd: Từ 3.500.000₫)" },
      { key: "featured", label: "Nổi bật (gói chính)", type: "checkbox" },
      { key: "sort_order", label: "Thứ tự", type: "number" },
    ]}
    display={(r: any) => ({ title: r.name, subtitle: `${r.sub} · ${r.price}` })}
  />
)});
