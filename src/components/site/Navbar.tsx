import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { data } = useQuery({
    queryKey: ["site_content", "header"],
    queryFn: async () => {
      const { data } = await supabase.from("site_content").select("value").eq("key", "header").maybeSingle();
      return (data?.value ?? {}) as any;
    },
  });

  const menu: Array<{ href: string; label: string }> = data?.menu ?? [];

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
      scrolled ? "bg-background/85 backdrop-blur-md border-b border-border/60" : "bg-transparent"
    }`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="flex items-center gap-3 leading-none">
          {data?.logo_url ? (
            <img src={data.logo_url} alt={data.brand} className="h-10 w-auto" />
          ) : (
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-[0.3em] text-foreground">{data?.brand ?? "ANHTHULE"}</span>
              <span className="mt-1 text-[10px] tracking-[0.4em] text-muted-foreground uppercase">{data?.tagline ?? "Bridal Make Up"}</span>
            </div>
          )}
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {menu.map((l) => (
            <li key={l.href + l.label}>
              <a href={l.href} className="text-[15px] font-medium text-foreground/75 transition-colors hover:text-foreground">{l.label}</a>
            </li>
          ))}
          <li>
            <Link to="/login" className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground">Admin</Link>
          </li>
        </ul>
        <a href="#booking" className="hidden rounded-full border border-foreground px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background md:inline-block">
          {data?.cta_label ?? "Đặt lịch"}
        </a>
      </nav>
    </header>
  );
}
