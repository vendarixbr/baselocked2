import { createServerFn } from "@tanstack/react-start";
import { contactPayloadSchema, submitContactMessage } from "./contact.server";

export const createContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data) => contactPayloadSchema.parse(data))
  .handler(async ({ data }) => submitContactMessage(data));