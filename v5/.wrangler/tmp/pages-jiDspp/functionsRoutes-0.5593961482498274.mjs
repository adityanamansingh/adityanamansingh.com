import { onRequestPost as __api_contact_ts_onRequestPost } from "/Users/adityanamansingh/Sites/old/adityanamansingh.com/v5/functions/api/contact.ts"

export const routes = [
    {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_contact_ts_onRequestPost],
    },
  ]