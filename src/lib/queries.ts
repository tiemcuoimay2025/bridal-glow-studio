import { supabase } from "@/integrations/supabase/client";

export async function fetchSiteContent() {
  const { data, error } = await supabase.from("site_content").select("key, value");
  if (error) throw error;
  const map: Record<string, any> = {};
  for (const row of data ?? []) map[row.key] = row.value;
  return map;
}

export async function fetchStyles() {
  const { data, error } = await supabase.from("styles").select("*").order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function fetchGallery() {
  const { data, error } = await supabase.from("gallery_images").select("*").order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function fetchServices() {
  const { data, error } = await supabase.from("services").select("*").order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function fetchTestimonials() {
  const { data, error } = await supabase.from("testimonials").select("*").order("sort_order");
  if (error) throw error;
  return data ?? [];
}
