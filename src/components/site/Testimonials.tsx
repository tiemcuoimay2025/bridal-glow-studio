import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fetchTestimonials } from "@/lib/queries";

export function Testimonials() {
  const section = useQuery({
    queryKey: ["site_content", "testimonials_section"],
    queryFn: async () => {
      const { data } = await supabase.from("site_content").select("value").eq("key", "testimonials_section").maybeSingle();
      return (data?.value ?? {}) as any;
    },
  });
  const reviews = useQuery({ queryKey: ["testimonials"], queryFn: fetchTestimonials });

  return (
    <section id="testimonials" className="bg-background py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow={section.data?.eyebrow ?? "Words of Love"} title={section.data?.title ?? "Cảm nhận"} subtitle={section.data?.subtitle} />
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {reviews.data?.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.08}>
              <figure className="flex h-full flex-col border border-border bg-secondary/30 p-10">
                <div className="font-serif text-5xl leading-none text-rose">"</div>
                <blockquote className="mt-2 flex-1 text-base leading-relaxed text-foreground/80">{r.text}</blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-border/60 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose/20 font-serif text-lg text-rose">{r.initial}</div>
                  <div>
                    <div className="font-serif text-lg text-foreground">{r.name}</div>
                    <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{r.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
