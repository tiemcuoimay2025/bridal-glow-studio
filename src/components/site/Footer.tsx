export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="font-serif text-2xl tracking-[0.3em] text-foreground">
              ANHTHULE
            </div>
            <p className="mt-2 text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              Bridal Make Up Artist
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Tôn vinh vẻ đẹp tự nhiên của cô dâu Việt — bằng đôi tay, ánh mắt
              và tấm lòng yêu nghề.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.4em] text-foreground">
              Liên hệ
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="tel:+84901234567" className="hover:text-foreground">
                  ☎ 0901 234 567
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@anhthule.vn"
                  className="hover:text-foreground"
                >
                  ✉ hello@anhthule.vn
                </a>
              </li>
              <li>Studio · Quận 1, TP. HCM</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.4em] text-foreground">
              Theo dõi
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Instagram — @anhthule.makeup
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Facebook — ANHTHULE Bridal
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Zalo — 0901 234 567
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-[11px] uppercase tracking-[0.3em] text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} ANHTHULE Make Up Artist</span>
          <span>Crafted with love · Bridal Atelier</span>
        </div>
      </div>
    </footer>
  );
}
