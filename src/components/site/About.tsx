import about from "@/assets/about-artist.jpg";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="relative bg-background py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:px-10">
        <Reveal>
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-full w-full border border-rose/40 md:-left-6 md:-top-6" />
            <img
              src={about}
              alt="ANHTHULE đang trang điểm cô dâu"
              loading="lazy"
              width={1200}
              height={1400}
              className="relative h-[560px] w-full object-cover shadow-luxury"
            />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mb-4 text-[11px] uppercase tracking-[0.5em] text-rose">
            ✦ About the Artist ✦
          </p>
          <h2 className="font-serif text-4xl leading-tight md:text-5xl">
            Mỗi cô dâu là một <em className="text-gradient-rose">tác phẩm</em>
            <br />
            riêng biệt
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              Với hơn <span className="text-foreground">8 năm kinh nghiệm</span>{" "}
              trong nghề trang điểm cô dâu, ANHTHULE theo đuổi phong cách trong
              trẻo, nhẹ nhàng — lấy cảm hứng từ vẻ đẹp Hàn Quốc và xu hướng
              luxury bridal châu Âu.
            </p>
            <p>
              Mỗi lớp trang điểm được thiết kế riêng theo từng đường nét gương
              mặt, sắc da và concept của ngày cưới — để cô dâu vẫn là chính
              mình, chỉ đẹp hơn, rạng rỡ hơn và tự tin hơn.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border/60 pt-8">
            {[
              { n: "500+", l: "Cô dâu" },
              { n: "8+", l: "Năm kinh nghiệm" },
              { n: "100%", l: "Cá nhân hoá" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-serif text-3xl text-gradient-rose md:text-4xl">
                  {s.n}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
