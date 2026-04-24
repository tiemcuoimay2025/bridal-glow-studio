import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fetchStyles } from "@/lib/queries";
import natural from "@/assets/style-natural.jpg";

const fallbackImg = (url: string) => {
  if (!url) return natural;
  if (url.startsWith("/src/assets/style-")) {
    // map seeded paths to bundled imports via direct URL — vite serves from /src in dev only
    return url;
  }
  return url;
};

export function Styles() {
  const section = useQuery({
    queryKey: ["site_content", "styles_section"],
    queryFn: async () => {
      const { data } = await supabase.from("site_content").select("value").eq("key", "styles_section").maybeSingle();
      return (data?.value ?? {}) as any;
    },
  });
  const styles = useQuery({ queryKey: ["styles"], queryFn: fetchStyles });

  return (
    <section id="styles" className="bg-secondary/40 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow={section.data?.eyebrow ?? "Makeup Style"}
          title={section.data?.title ?? "Phong cách signature"}
          subtitle={section.data?.subtitle}
        />

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {styles.data?.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden">
                  <img src={fallbackImg(s.image_url)} alt={s.name} loading="lazy"
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/10" />
                </div>
                <h3 className="mt-6 font-serif text-2xl text-foreground">{s.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
