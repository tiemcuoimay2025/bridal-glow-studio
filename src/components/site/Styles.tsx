import natural from "@/assets/style-natural.jpg";
import korean from "@/assets/style-korean.jpg";
import softglam from "@/assets/style-softglam.jpg";
import classic from "@/assets/style-classic.jpg";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const styles = [
  {
    img: natural,
    name: "Natural Glow",
    desc: "Lớp nền mỏng, da căng bóng tự nhiên — giữ trọn nét đẹp nguyên bản của cô dâu.",
  },
  {
    img: korean,
    name: "Korean Bridal",
    desc: "Trong trẻo, ngọt ngào theo phong cách K-beauty với môi gradient và má hồng tươi.",
  },
  {
    img: softglam,
    name: "Soft Glam",
    desc: "Mắt shimmer dịu, mi cong tự nhiên — vừa lộng lẫy, vừa giữ nét nhẹ nhàng tinh tế.",
  },
  {
    img: classic,
    name: "Elegant Classic",
    desc: "Vẻ đẹp vượt thời gian: môi đỏ, mắt sắc, đường nét chuẩn mực Hollywood cổ điển.",
  },
];

export function Styles() {
  return (
    <section id="styles" className="bg-secondary/40 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Makeup Style"
          title="Bốn phong cách signature"
          subtitle="Từ trong trẻo tự nhiên đến cổ điển sang trọng — hãy chọn phong cách phù hợp với câu chuyện ngày cưới của bạn."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {styles.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.08}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.name}
                    loading="lazy"
                    width={900}
                    height={1200}
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/10" />
                </div>
                <h3 className="mt-6 font-serif text-2xl text-foreground">
                  {s.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
