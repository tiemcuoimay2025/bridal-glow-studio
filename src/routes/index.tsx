import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Styles } from "@/components/site/Styles";
import { Gallery } from "@/components/site/Gallery";
import { Services } from "@/components/site/Services";
import { Testimonials } from "@/components/site/Testimonials";
import { Booking } from "@/components/site/Booking";
import { Footer } from "@/components/site/Footer";
import { StickyCTA } from "@/components/site/StickyCTA";
import heroImg from "@/assets/hero-bride.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "ANHTHULE — Make Up Artist | Trang điểm cô dâu cao cấp",
      },
      {
        name: "description",
        content:
          "ANHTHULE — Bridal Make Up Artist chuyên trang điểm cô dâu cao cấp, phong cách trong trẻo, tự nhiên, Korean & luxury bridal. Đặt lịch ngay hôm nay.",
      },
      { property: "og:title", content: "ANHTHULE — Bridal Make Up Artist" },
      {
        property: "og:description",
        content:
          "Tôn vinh vẻ đẹp tự nhiên trong ngày trọng đại. Trang điểm cô dâu, pre-wedding, dự tiệc.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Styles />
      <Gallery />
      <Services />
      <Testimonials />
      <Booking />
      <Footer />
      <StickyCTA />
    </main>
  );
}
