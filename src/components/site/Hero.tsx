import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import heroImg from "@/assets/hero-bride.jpg";

export function Hero() {
  const { data } = useQuery({
    queryKey: ["site_content", "hero"],
    queryFn: async () => {
      const { data } = await supabase.from("site_content").select("value").eq("key", "hero").maybeSingle();
      return (data?.value ?? {}) as any;
    },
  });

  const bg = data?.image_url || heroImg;

  return (
    <section id="top" className="relative h-screen min-h-[700px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img src={bg} alt="Bridal" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/70" />
      </div>
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }} className="max-w-3xl">
            <p className="mb-6 text-[11px] uppercase tracking-[0.5em] text-rose">✦ {data?.eyebrow ?? "Bridal Makeup by ANHTHULE"} ✦</p>
            <h1 className="font-serif text-5xl leading-[1.1] text-foreground md:text-7xl lg:text-8xl">
              {data?.title ?? "Tôn vinh vẻ đẹp tự nhiên trong ngày trọng đại"}
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">{data?.subtitle}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#booking" className="group inline-flex items-center gap-3 bg-foreground px-8 py-4 text-xs uppercase tracking-[0.3em] text-background hover:bg-foreground/90">
                {data?.cta_label ?? "Đặt lịch ngay"}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              {data?.secondary_label && (
                <a href="#gallery" className="inline-flex items-center gap-3 border border-foreground/30 px-8 py-4 text-xs uppercase tracking-[0.3em] text-foreground hover:bg-foreground/5">
                  {data.secondary_label}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
