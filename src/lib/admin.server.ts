import { z } from "zod";

type AdminContext = {
  supabase: any;
  userId: string;
};

export const postPayloadSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(2).max(200),
  slug: z.string().trim().max(220).optional().default(""),
  category: z.string().trim().max(120).nullable().optional(),
  summary: z.string().trim().max(500).nullable().optional(),
  content: z.string().max(30000).nullable().optional(),
  cover_image_url: z.string().trim().max(1000).nullable().optional(),
  published: z.boolean().default(false),
});

export const idPayloadSchema = z.object({ id: z.string().uuid() });

export const contactReadPayloadSchema = z.object({
  id: z.string().uuid(),
  read: z.boolean(),
});

export const settingsPayloadSchema = z.object({
  settings: z.object({
    whatsapp: z.string().trim().max(32).optional(),
    email: z.string().trim().email().max(254).or(z.literal("")).optional(),
    hours: z.string().trim().max(500).optional(),
  }),
});

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function assertAdmin(context: AdminContext) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });

  if (error || data !== true) {
    throw new Error("Forbidden");
  }
}

function assertNoError(result: { error: unknown }) {
  if (result.error) throw result.error;
}

export async function loadAdminData(context: AdminContext) {
  await assertAdmin(context);

  const [posts, contacts, settings] = await Promise.all([
    context.supabase.from("posts").select("*").order("created_at", { ascending: false }),
    context.supabase.from("contacts").select("*").order("created_at", { ascending: false }),
    context.supabase.from("settings").select("*"),
  ]);

  assertNoError(posts);
  assertNoError(contacts);
  assertNoError(settings);

  return {
    posts: posts.data ?? [],
    contacts: contacts.data ?? [],
    settings: settings.data ?? [],
  };
}

export async function saveAdminPost(data: z.infer<typeof postPayloadSchema>, context: AdminContext) {
  await assertAdmin(context);

  const payload = {
    title: data.title,
    slug: data.slug || slugify(data.title),
    category: data.category || null,
    summary: data.summary || null,
    content: data.content || null,
    cover_image_url: data.cover_image_url || null,
    published: data.published,
  };

  const result = data.id
    ? await context.supabase.from("posts").update(payload).eq("id", data.id)
    : await context.supabase.from("posts").insert([payload]);

  assertNoError(result);
  return { ok: true };
}

export async function deleteAdminPost(data: z.infer<typeof idPayloadSchema>, context: AdminContext) {
  await assertAdmin(context);
  const result = await context.supabase.from("posts").delete().eq("id", data.id);
  assertNoError(result);
  return { ok: true };
}

export async function updateContactRead(data: z.infer<typeof contactReadPayloadSchema>, context: AdminContext) {
  await assertAdmin(context);
  const result = await context.supabase.from("contacts").update({ read: data.read }).eq("id", data.id);
  assertNoError(result);
  return { ok: true };
}

export async function saveAdminSettings(data: z.infer<typeof settingsPayloadSchema>, context: AdminContext) {
  await assertAdmin(context);

  for (const [key, value] of Object.entries(data.settings)) {
    const result = await context.supabase.from("settings").upsert({ key, value }, { onConflict: "key" });
    assertNoError(result);
  }

  return { ok: true };
}