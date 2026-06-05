import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const contactPayloadSchema = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(254).or(z.literal("")).optional(),
  phone: z.string().trim().max(32).optional(),
  subject: z.enum(["Consulta", "Pré-natal", "Dúvida", "Outro"]),
  message: z.string().trim().min(5).max(3000),
});

export async function submitContactMessage(data: z.infer<typeof contactPayloadSchema>) {
  const { error } = await supabaseAdmin.from("contacts").insert([
    {
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      subject: data.subject,
      message: data.message,
    },
  ]);

  if (error) throw error;
  return { ok: true };
}