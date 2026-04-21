import { motion } from "framer-motion";
import hero from "@/assets/hero-bride.jpg";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={hero}
          alt="Cô dâu trang điểm tự nhiên bởi ANHTHULE"
          width={1080}
          height={1920}
          className="h-full w-full object-cover object-[60%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/30" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-[11px] uppercase tracking-[0.5em] text-foreground/70"
        >
          ✦ Luxury Bridal Artistry ✦
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-3xl font-serif text-5xl leading-[1.05] text-foreground md:text-7xl lg:text-[5.5rem]"
        >
          Tôn vinh vẻ đẹp <em className="text-gradient-rose">tự nhiên</em>
          <br />
          trong ngày trọng đại
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-foreground/75 md:text-lg"
        >
          Bridal Makeup by <span className="tracking-[0.2em]">ANHTHULE</span> —
          dịu dàng, tinh khiết và được cá nhân hoá riêng cho từng cô dâu.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <a
            href="#booking"
            className="group inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-xs uppercase tracking-[0.3em] text-background transition-all hover:bg-foreground/90 shadow-luxury"
          >
            Đặt lịch ngay
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#gallery"
            className="text-xs uppercase tracking-[0.3em] text-foreground/80 underline-offset-8 hover:underline"
          >
            Xem album cô dâu
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-foreground/50">
        <svg width="20" height="32" viewBox="0 0 20 32" fill="none">
          <rect x="1" y="1" width="18" height="30" rx="9" stroke="currentColor" strokeWidth="1" />
          <circle cx="10" cy="9" r="2" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
