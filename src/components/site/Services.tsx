import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fetchServices } from "@/lib/queries";

export function Services() {
  const section = useQuery({
    queryKey: ["site_content", "services_section"],
    queryFn: async () => {
      const { data } = await supabase.from("site_content").select("value").eq("key", "services_section").maybeSingle();
      return (data?.value ?? {}) as any;
    },
  });
  const services = useQuery({ queryKey: ["services"], queryFn: fetchServices });

  return (
    <section id="services" className="bg-secondary/40 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow={section.data?.eyebrow ?? "Services"} title={section.data?.title ?? "Dịch vụ"} subtitle={section.data?.subtitle} />
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {services.data?.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.1}>
              <div className={`group flex h-full flex-col border p-10 transition-all duration-500 hover:-translate-y-2 ${
                s.featured ? "border-rose/60 bg-background shadow-luxury" : "border-border bg-background/60"
              }`}>
                <p className="text-[10px] uppercase tracking-[0.4em] text-rose">{s.sub}</p>
                <h3 className="mt-3 font-serif text-3xl text-foreground">{s.name}</h3>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                <div className="mt-8 border-t border-border/60 pt-6">
                  <div className="font-serif text-2xl text-gradient-rose">{s.price}</div>
                  <a href="#booking" className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-foreground hover:text-rose">
                    Liên hệ báo giá <span>→</span>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
