import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Đăng nhập — Admin ANHTHULE" }] }),
});

function LoginPage() {
  const { signIn, user, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/admin" });
  }, [user, loading, navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    if (mode === "signin") {
      const { error } = await signIn(email, password);
      setSubmitting(false);
      if (error) return toast.error(error);
      toast.success("Đăng nhập thành công");
      navigate({ to: "/admin" });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setSubmitting(false);
      if (error) return toast.error(error.message);
      toast.success("Tạo tài khoản thành công. Đang đăng nhập...");
      const { error: signInError } = await signIn(email, password);
      if (!signInError) navigate({ to: "/admin" });
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

        <div className="mt-8 flex justify-center gap-6 text-xs uppercase tracking-[0.25em]">
          <button type="button" onClick={() => setMode("signin")}
            className={mode === "signin" ? "text-foreground border-b border-rose pb-1" : "text-muted-foreground"}>
            Đăng nhập
          </button>
          <button type="button" onClick={() => setMode("signup")}
            className={mode === "signup" ? "text-foreground border-b border-rose pb-1" : "text-muted-foreground"}>
            Tạo tài khoản
          </button>
        </div>

        <div className="mt-8 space-y-5">
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Email</span>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border-0 border-b border-border bg-transparent py-3 outline-none focus:border-rose" />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Mật khẩu</span>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full border-0 border-b border-border bg-transparent py-3 outline-none focus:border-rose" />
          </label>
        </div>

        <button type="submit" disabled={submitting}
          className="mt-10 w-full bg-foreground px-8 py-4 text-xs uppercase tracking-[0.3em] text-background hover:bg-foreground/90 disabled:opacity-50">
          {submitting ? "Đang xử lý..." : mode === "signin" ? "Đăng nhập" : "Tạo tài khoản"}
        </button>

        {mode === "signup" && (
          <p className="mt-4 text-center text-[11px] text-muted-foreground">
            Tài khoản đầu tiên đăng ký sẽ tự động trở thành Admin.
          </p>
        )}
      </form>
    </main>
  );
}
