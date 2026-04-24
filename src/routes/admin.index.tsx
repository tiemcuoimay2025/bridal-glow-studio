import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const bookings = useQuery({
    queryKey: ["admin_bookings_count"],
    queryFn: async () => {
      const { count } = await supabase.from("bookings").select("*", { count: "exact", head: true });
      const { count: newCount } = await supabase.from("bookings").select("*", { count: "exact", head: true }).eq("status", "new");
      return { total: count ?? 0, new: newCount ?? 0 };
    },
  });

  const counts = useQuery({
    queryKey: ["admin_counts"],
    queryFn: async () => {
      const [s, g, sv, t] = await Promise.all([
        supabase.from("styles").select("*", { count: "exact", head: true }),
        supabase.from("gallery_images").select("*", { count: "exact", head: true }),
        supabase.from("services").select("*", { count: "exact", head: true }),
        supabase.from("testimonials").select("*", { count: "exact", head: true }),
      ]);
      return { styles: s.count ?? 0, gallery: g.count ?? 0, services: sv.count ?? 0, testimonials: t.count ?? 0 };
    },
  });

  const cards = [
    { label: "Đơn mới", value: bookings.data?.new ?? "—", to: "/admin/bookings", highlight: true },
    { label: "Tổng booking", value: bookings.data?.total ?? "—", to: "/admin/bookings" },
    { label: "Phong cách", value: counts.data?.styles ?? "—", to: "/admin/styles" },
    { label: "Ảnh gallery", value: counts.data?.gallery ?? "—", to: "/admin/gallery" },
    { label: "Dịch vụ", value: counts.data?.services ?? "—", to: "/admin/services" },
    { label: "Cảm nhận", value: counts.data?.testimonials ?? "—", to: "/admin/testimonials" },
  ];

  return (
    <div>
      <PageHeader title="Tổng quan" description="Xin chào! Đây là bảng điều khiển ANHTHULE Admin." />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} to={c.to as any}
            className={`block border p-6 transition-all hover:-translate-y-0.5 ${
              c.highlight ? "border-rose bg-rose/5" : "border-border bg-background"
            }`}>
            <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{c.label}</div>
            <div className="mt-3 font-serif text-4xl text-foreground">{c.value}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
