import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Đăng nhập — Admin ANHTHULE" }] }),
});

function LoginPage() {
  const { signIn, user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    navigate({ to: "/admin" });
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Đăng nhập thành công");
      navigate({ to: "/admin" });
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-secondary/40 px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md border border-border bg-background p-10 shadow-luxury">
        <Link to="/" className="block text-center font-serif text-2xl tracking-[0.3em] text-foreground">
          ANHTHULE
        </Link>
        <p className="mt-1 text-center text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          Admin Panel
        </p>

        <div className="mt-10 space-y-5">
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border-0 border-b border-border bg-transparent py-3 outline-none focus:border-rose"
            />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Mật khẩu</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full border-0 border-b border-border bg-transparent py-3 outline-none focus:border-rose"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-10 w-full bg-foreground px-8 py-4 text-xs uppercase tracking-[0.3em] text-background hover:bg-foreground/90 disabled:opacity-50"
        >
          {submitting ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Tài khoản admin được tạo trong Lovable Cloud.
        </p>
      </form>
    </main>
  );
}
