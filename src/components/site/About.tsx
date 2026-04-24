import about from "@/assets/about-artist.jpg";
import { Reveal } from "./Reveal";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function About() {
  const { data } = useQuery({
    queryKey: ["site_content", "about"],
    queryFn: async () => {
      const { data } = await supabase.from("site_content").select("value").eq("key", "about").maybeSingle();
      return (data?.value ?? {}) as any;
    },
  });

  const img = data?.image_url || about;
  const paragraphs: string[] = data?.paragraphs ?? [];
  const stats: Array<{ n: string; l: string }> = data?.stats ?? [];

  return (
    <section id="about" className="relative bg-background py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:px-10">
        <Reveal>
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-full w-full border border-rose/40 md:-left-6 md:-top-6" />
            <img src={img} alt="ANHTHULE" loading="lazy" className="relative h-[560px] w-full object-cover shadow-luxury" />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mb-4 text-[11px] uppercase tracking-[0.5em] text-rose">✦ {data?.eyebrow ?? "About the Artist"} ✦</p>
          <h2 className="font-serif text-4xl leading-tight md:text-5xl"
              dangerouslySetInnerHTML={{ __html: data?.title_html ?? "" }} />
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border/60 pt-8">
            {stats.map((s) => (
              <div key={s.l}>
                <div className="font-serif text-3xl text-gradient-rose md:text-4xl">{s.n}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
