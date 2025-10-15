import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function uploadToSupabase(
  buffer: Buffer,
  fileName: string,
  folder: "converted" | "bg-removed" | "pdf" = "converted"
): Promise<string> {
  const path = `${folder}/${Date.now()}-${fileName}`;
  const { data, error } = await supabase.storage
    .from("converted")
    .upload(path, buffer, {
      contentType: "application/octet-stream",
    });

  if (error) throw error;

  const { data: publicUrl } = supabase.storage
    .from("converted")
    .getPublicUrl(path);

  return publicUrl.publicUrl;
}
