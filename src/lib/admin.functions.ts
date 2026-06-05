import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  contactReadPayloadSchema,
  deleteAdminPost,
  idPayloadSchema,
  loadAdminData,
  postPayloadSchema,
  saveAdminPost,
  saveAdminSettings,
  settingsPayloadSchema,
  updateContactRead,
} from "./admin.server";

export const getAdminData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => loadAdminData(context));

export const upsertAdminPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => postPayloadSchema.parse(data))
  .handler(async ({ data, context }) => saveAdminPost(data, context));

export const removeAdminPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => idPayloadSchema.parse(data))
  .handler(async ({ data, context }) => deleteAdminPost(data, context));

export const setContactRead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => contactReadPayloadSchema.parse(data))
  .handler(async ({ data, context }) => updateContactRead(data, context));

export const updateAdminSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => settingsPayloadSchema.parse(data))
  .handler(async ({ data, context }) => saveAdminSettings(data, context));