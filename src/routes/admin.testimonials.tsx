import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";

export const Route = createFileRoute("/admin/testimonials")({ component: () => (
  <CrudList
    table="testimonials"
    title="Cảm nhận khách hàng"
    defaults={{ name: "", role: "", text: "", initial: "", sort_order: 0 }}
    fields={[
      { key: "name", label: "Tên khách hàng" },
      { key: "role", label: "Vai trò (vd: Cô dâu — Hà Nội)" },
      { key: "text", label: "Nội dung review", type: "textarea" },
      { key: "initial", label: "Chữ cái avatar (vd: M)" },
      { key: "sort_order", label: "Thứ tự", type: "number" },
    ]}
    display={(r: any) => ({ title: r.name, subtitle: r.text })}
  />
)});
