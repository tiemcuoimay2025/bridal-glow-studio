import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const services = [
  {
    name: "Trang điểm cô dâu",
    sub: "Wedding Day",
    desc: "Trọn gói trang điểm + làm tóc cho ngày cưới, có dùng thử trước.",
    price: "Từ 3.500.000₫",
    featured: true,
  },
  {
    name: "Pre-wedding",
    sub: "Photoshoot",
    desc: "Trang điểm theo concept chụp hình cưới ngoại cảnh hoặc studio.",
    price: "Từ 2.000.000₫",
  },
  {
    name: "Trang điểm dự tiệc",
    sub: "Event & Party",
    desc: "Trang điểm sang trọng cho dự tiệc, sự kiện, ăn hỏi, đính hôn.",
    price: "Từ 800.000₫",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-secondary/40 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Services & Pricing"
          title="Dịch vụ & bảng giá"
          subtitle="Mỗi gói đều bao gồm tư vấn cá nhân, dùng thử trước (với cô dâu) và sản phẩm cao cấp nhập khẩu."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.1}>
              <div
                className={`group flex h-full flex-col border p-10 transition-all duration-500 hover:-translate-y-2 ${
                  s.featured
                    ? "border-rose/60 bg-background shadow-luxury"
                    : "border-border bg-background/60"
                }`}
              >
                <p className="text-[10px] uppercase tracking-[0.4em] text-rose">
                  {s.sub}
                </p>
                <h3 className="mt-3 font-serif text-3xl text-foreground">
                  {s.name}
                </h3>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
                <div className="mt-8 border-t border-border/60 pt-6">
                  <div className="font-serif text-2xl text-gradient-rose">
                    {s.price}
                  </div>
                  <a
                    href="#booking"
                    className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-foreground hover:text-rose"
                  >
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
