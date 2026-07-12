export const env = {
  API_BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001/api",
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME ?? "TransitOps",
} as const;
