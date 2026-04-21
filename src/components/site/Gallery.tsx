import { useState } from "react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import hero from "@/assets/hero-bride.jpg";
import korean from "@/assets/style-korean.jpg";
import softglam from "@/assets/style-softglam.jpg";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Lightbox } from "./Lightbox";

const items = [
  { src: hero, h: "row-span-2" },
  { src: g2, h: "" },
  { src: g3, h: "" },
  { src: g1, h: "row-span-2" },
  { src: korean, h: "" },
  { src: g5, h: "" },
  { src: g4, h: "row-span-2" },
  { src: softglam, h: "" },
  { src: g6, h: "" },
];

const sources = items.map((i) => i.src);

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="gallery" className="bg-background py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Bridal Album"
          title="Khoảnh khắc đẹp nhất của cô dâu"
          subtitle="Một phần trong những tác phẩm ANHTHULE đã đồng hành cùng các cô dâu trong ngày trọng đại."
        />

        <Reveal>
          <div className="mt-16 grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[220px] md:grid-cols-3 md:gap-5">
            {items.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setOpen(i)}
                className={`group relative overflow-hidden ${img.h}`}
                aria-label={`Xem ảnh ${i + 1}`}
              >
                <img
                  src={img.src}
                  alt={`Cô dâu ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/30">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="11" cy="11" r="7" />
                      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                      <path d="M11 8v6M8 11h6" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <Lightbox
        images={sources}
        index={open}
        onClose={() => setOpen(null)}
        onPrev={() =>
          setOpen((i) => (i === null ? i : (i - 1 + sources.length) % sources.length))
        }
        onNext={() =>
          setOpen((i) => (i === null ? i : (i + 1) % sources.length))
        }
      />
    </section>
  );
}
