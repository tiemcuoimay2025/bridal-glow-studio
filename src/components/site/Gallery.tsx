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

const images = [
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

export function Gallery() {
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
            {images.map((img, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden ${img.h}`}
              >
                <img
                  src={img.src}
                  alt={`Cô dâu ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/15" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
