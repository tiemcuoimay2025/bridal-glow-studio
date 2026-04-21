export function StickyCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
      <a
        href="tel:+84901234567"
        aria-label="Gọi điện"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-foreground shadow-luxury ring-1 ring-border transition-transform hover:scale-110"
      >
        ☎
      </a>
      <a
        href="https://zalo.me/0901234567"
        target="_blank"
        rel="noreferrer"
        aria-label="Zalo"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-foreground shadow-luxury ring-1 ring-border transition-transform hover:scale-110"
      >
        <span className="text-[10px] font-semibold tracking-wider">ZALO</span>
      </a>
      <a
        href="#booking"
        className="rounded-full bg-foreground px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-background shadow-luxury transition-all hover:bg-foreground/90"
      >
        Đặt lịch
      </a>
    </div>
  );
}
