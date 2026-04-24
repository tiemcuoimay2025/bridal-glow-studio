import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useSiteContent(key: string) {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ["site_content", key],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_content").select("value").eq("key", key).maybeSingle();
      if (error) throw error;
      return (data?.value ?? {}) as any;
    },
  });

  const [draft, setDraft] = useState<any>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (query.data && draft === null) setDraft(query.data);
  }, [query.data, draft]);

  const update = (patch: any) => {
    setDraft((d: any) => ({ ...(d ?? {}), ...patch }));
    setDirty(true);
  };

  const setAll = (v: any) => {
    setDraft(v);
    setDirty(true);
  };

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("site_content").upsert({ key, value: draft });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Đã lưu");
      setDirty(false);
      qc.invalidateQueries({ queryKey: ["site_content", key] });
      qc.invalidateQueries({ queryKey: ["site_content_all"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  return { value: draft ?? {}, update, setAll, save: () => save.mutate(), saving: save.isPending, dirty, loading: query.isLoading };
}
