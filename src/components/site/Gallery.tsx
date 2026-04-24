import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Lightbox } from "./Lightbox";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fetchGallery } from "@/lib/queries";

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const section = useQuery({
    queryKey: ["site_content", "gallery_section"],
    queryFn: async () => {
      const { data } = await supabase.from("site_content").select("value").eq("key", "gallery_section").maybeSingle();
      return (data?.value ?? {}) as any;
    },
  });
  const list = useQuery({ queryKey: ["gallery_images"], queryFn: fetchGallery });
  const sources = (list.data ?? []).map((i) => i.image_url);

  return (
    <section id="gallery" className="bg-background py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow={section.data?.eyebrow ?? "Gallery"}
          title={section.data?.title ?? "Album cô dâu"}
          subtitle={section.data?.subtitle}
        />
        <Reveal>
          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
            {list.data?.map((img, i) => (
              <button key={img.id} type="button" onClick={() => setOpen(i)}
                className="group relative aspect-[3/4] overflow-hidden" aria-label={`Xem ảnh ${i + 1}`}>
                <img src={img.image_url} alt={img.alt} loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/30" />
              </button>
            ))}
          </div>
        </Reveal>
      </div>
      <Lightbox images={sources} index={open} onClose={() => setOpen(null)}
        onPrev={() => setOpen((i) => (i === null ? i : (i - 1 + sources.length) % sources.length))}
        onNext={() => setOpen((i) => (i === null ? i : (i + 1) % sources.length))} />
    </section>
  );
}
