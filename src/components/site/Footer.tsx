import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function Footer() {
  const { data } = useQuery({
    queryKey: ["site_content", "footer"],
    queryFn: async () => {
      const { data } = await supabase.from("site_content").select("value").eq("key", "footer").maybeSingle();
      return (data?.value ?? {}) as any;
    },
  });
  const contacts: Array<{ label: string; href: string }> = data?.contacts ?? [];
  const socials: Array<{ label: string; href: string }> = data?.socials ?? [];

  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="font-serif text-2xl tracking-[0.3em] text-foreground">{data?.brand ?? "ANHTHULE"}</div>
            <p className="mt-2 text-[11px] uppercase tracking-[0.4em] text-muted-foreground">{data?.tagline}</p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">{data?.description}</p>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.4em] text-foreground">{data?.contact_title ?? "Liên hệ"}</h4>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {contacts.map((c, i) => (
                <li key={i}>{c.href ? <a href={c.href} className="hover:text-foreground">{c.label}</a> : c.label}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.4em] text-foreground">{data?.social_title ?? "Theo dõi"}</h4>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {socials.map((s, i) => (
                <li key={i}><a href={s.href} className="hover:text-foreground">{s.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-[11px] uppercase tracking-[0.3em] text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} {data?.copyright}</span>
          <span>{data?.tagline_right}</span>
        </div>
      </div>
    </footer>
  );
}
