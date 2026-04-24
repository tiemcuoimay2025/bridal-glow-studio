import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export async function uploadImage(file: File): Promise<string | null> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("site-images").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });
  if (error) {
    toast.error("Upload lỗi: " + error.message);
    return null;
  }
  const { data } = supabase.storage.from("site-images").getPublicUrl(path);
  return data.publicUrl;
}
