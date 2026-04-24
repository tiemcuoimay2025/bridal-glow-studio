import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/admin/bookings")({ component: BookingsAdmin });

function BookingsAdmin() {
  const qc = useQueryClient();
  const list = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Đã cập nhật");
      qc.invalidateQueries({ queryKey: ["bookings"] });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("bookings").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Đã xoá");
      qc.invalidateQueries({ queryKey: ["bookings"] });
    },
  });

  const statusColor: Record<string, string> = {
    new: "bg-rose/15 text-rose",
    contacted: "bg-amber-100 text-amber-700",
    confirmed: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-muted text-muted-foreground",
  };

  return (
    <div>
      <PageHeader title="Đơn đặt lịch" description="Quản lý các đơn đặt lịch từ khách hàng." />

      {list.isLoading && <p className="text-muted-foreground">Đang tải...</p>}
      {list.data?.length === 0 && <p className="text-muted-foreground">Chưa có đơn nào.</p>}

      <div className="space-y-3">
        {list.data?.map((b: any) => (
          <div key={b.id} className="border border-border bg-background p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-xl">{b.name}</h3>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${statusColor[b.status] ?? "bg-muted"}`}>
                    {b.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {b.phone} · {b.service} {b.wedding_date && `· Ngày cưới: ${b.wedding_date}`}
                </p>
                {b.notes && <p className="mt-2 text-sm text-foreground/80">"{b.notes}"</p>}
                <p className="mt-2 text-xs text-muted-foreground">
                  Gửi lúc: {new Date(b.created_at).toLocaleString("vi-VN")}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href={`tel:${b.phone}`} className="rounded border border-border px-3 py-1.5 text-xs hover:bg-secondary">Gọi</a>
                <select value={b.status} onChange={(e) => setStatus.mutate({ id: b.id, status: e.target.value })}
                  className="rounded border border-border bg-background px-2 py-1 text-xs">
                  <option value="new">new</option>
                  <option value="contacted">contacted</option>
                  <option value="confirmed">confirmed</option>
                  <option value="cancelled">cancelled</option>
                </select>
                <button onClick={() => { if (confirm("Xoá đơn này?")) remove.mutate(b.id); }}
                  className="rounded border border-rose/40 px-3 py-1.5 text-xs text-rose">Xoá</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
