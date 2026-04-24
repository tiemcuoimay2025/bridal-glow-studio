import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function StickyCTA() {
  const { data } = useQuery({
    queryKey: ["site_content", "sticky_cta"],
    queryFn: async () => {
      const { data } = await supabase.from("site_content").select("value").eq("key", "sticky_cta").maybeSingle();
      return (data?.value ?? {}) as any;
    },
  });

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
      {data?.phone && (
        <a href={`tel:${data.phone}`} aria-label="Gọi điện"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-foreground shadow-luxury ring-1 ring-border hover:scale-110 transition-transform">☎</a>
      )}
      {data?.zalo && (
        <a href={data.zalo} target="_blank" rel="noreferrer" aria-label="Zalo"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-foreground shadow-luxury ring-1 ring-border hover:scale-110 transition-transform">
          <span className="text-[10px] font-semibold tracking-wider">ZALO</span>
        </a>
      )}
      <a href="#booking" className="rounded-full bg-foreground px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-background shadow-luxury hover:bg-foreground/90">
        {data?.booking_label ?? "Đặt lịch"}
      </a>
    </div>
  );
}
