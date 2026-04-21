import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "Giới thiệu" },
  { href: "#styles", label: "Phong cách" },
  { href: "#gallery", label: "Album" },
  { href: "#services", label: "Dịch vụ" },
  { href: "#testimonials", label: "Cảm nhận" },
  { href: "#booking", label: "Đặt lịch" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="flex flex-col leading-none">
          <span className="font-serif text-xl tracking-[0.3em] text-foreground">
            ANHTHULE
          </span>
          <span className="mt-1 text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
            Bridal Make Up
          </span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[15px] font-medium text-foreground/75 transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#booking"
          className="hidden rounded-full border border-foreground px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background md:inline-block"
        >
          Đặt lịch
        </a>
      </nav>
    </header>
  );
}
