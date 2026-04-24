import { createFileRoute, Outlet, Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  head: () => ({ meta: [{ title: "Admin — ANHTHULE" }] }),
});

const nav = [
  { to: "/admin", label: "Tổng quan", end: true },
  { to: "/admin/header", label: "Header & Logo" },
  { to: "/admin/hero", label: "Hero" },
  { to: "/admin/about", label: "Giới thiệu" },
  { to: "/admin/styles", label: "Phong cách" },
  { to: "/admin/gallery", label: "Album ảnh" },
  { to: "/admin/services", label: "Dịch vụ" },
  { to: "/admin/testimonials", label: "Cảm nhận" },
  { to: "/admin/footer", label: "Footer & Liên hệ" },
  { to: "/admin/seo", label: "SEO & CTA" },
  { to: "/admin/bookings", label: "Đơn đặt lịch" },
];

function AdminLayout() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Đang tải...</div>;
  }

  if (!user) return null;

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-foreground">Không có quyền truy cập</h1>
          <p className="mt-3 text-sm text-muted-foreground">Tài khoản này không phải admin.</p>
          <button onClick={async () => { await signOut(); navigate({ to: "/login" }); }}
            className="mt-6 rounded-md border border-border px-4 py-2 text-sm hover:bg-secondary">
            Đăng xuất
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-secondary/30">
      <aside className="hidden w-64 flex-col border-r border-border bg-background md:flex">
        <div className="border-b border-border px-6 py-6">
          <Link to="/" className="font-serif text-lg tracking-[0.3em] text-foreground">ANHTHULE</Link>
          <p className="mt-1 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Admin</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          {nav.map((n) => {
            const active = n.end ? location.pathname === n.to : location.pathname.startsWith(n.to);
            return (
              <Link key={n.to} to={n.to}
                className={`block px-6 py-2.5 text-sm transition-colors ${
                  active ? "bg-secondary text-foreground font-medium border-l-2 border-rose" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}>
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border p-4">
          <p className="mb-2 truncate text-xs text-muted-foreground">{user.email}</p>
          <button onClick={async () => { await signOut(); navigate({ to: "/login" }); }}
            className="w-full rounded border border-border px-3 py-2 text-xs hover:bg-secondary">
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-30 flex items-center justify-between border-b border-border bg-background px-4 py-3">
        <Link to="/" className="font-serif text-sm tracking-[0.3em]">ANHTHULE</Link>
        <button onClick={async () => { await signOut(); navigate({ to: "/login" }); }} className="text-xs text-muted-foreground">
          Đăng xuất
        </button>
      </div>

      <main className="flex-1 overflow-x-hidden p-6 pt-20 md:p-10 md:pt-10">
        {/* Mobile nav scroll */}
        <div className="md:hidden mb-6 -mx-6 overflow-x-auto px-6">
          <div className="flex gap-2 pb-2">
            {nav.map((n) => {
              const active = n.end ? location.pathname === n.to : location.pathname.startsWith(n.to);
              return (
                <Link key={n.to} to={n.to}
                  className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${
                    active ? "border-rose bg-rose/10 text-foreground" : "border-border text-muted-foreground"
                  }`}>
                  {n.label}
                </Link>
              );
            })}
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
