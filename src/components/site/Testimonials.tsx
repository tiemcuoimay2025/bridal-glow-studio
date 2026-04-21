import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const reviews = [
  {
    name: "Mai Anh",
    role: "Cô dâu — Hà Nội",
    text: "Chị Thu makeup nhẹ nhàng, đúng style mình mong muốn. Cả ngày cưới lớp nền vẫn rất đẹp, ảnh chụp lên tự nhiên và rạng rỡ.",
    initial: "M",
  },
  {
    name: "Hồng Nhung",
    role: "Cô dâu — Sài Gòn",
    text: "Mình rất khó tính chuyện makeup mà chị Thu làm mình ưng từ buổi thử đầu tiên. Cảm ơn chị đã cho mình một ngày cưới hoàn hảo.",
    initial: "N",
  },
  {
    name: "Thuỳ Linh",
    role: "Pre-wedding shoot",
    text: "Ekip cực kỳ chuyên nghiệp, đúng giờ, makeup theo từng concept rất chuẩn. Bộ ảnh pre-wedding của mình đẹp ngoài mong đợi.",
    initial: "L",
  },
  {
    name: "Quỳnh Anh",
    role: "Cô dâu — Đà Nẵng",
    text: "Phong cách Korean bridal chị làm cho mình quá xinh, ai cũng khen. Mình sẽ tiếp tục giới thiệu chị cho bạn bè.",
    initial: "Q",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-background py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Words of Love"
          title="Cảm nhận từ các cô dâu"
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col border border-border bg-secondary/30 p-10">
                <div className="font-serif text-5xl leading-none text-rose">
                  “
                </div>
                <blockquote className="mt-2 flex-1 text-base leading-relaxed text-foreground/80">
                  {r.text}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-border/60 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose/20 font-serif text-lg text-rose">
                    {r.initial}
                  </div>
                  <div>
                    <div className="font-serif text-lg text-foreground">
                      {r.name}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                      {r.role}
                    </div>
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
