export function getServerApiBaseUrl(): string {
  const raw = process.env.API_BASE_URL ?? "http://127.0.0.1:8080";
  return raw.replace(/\/+$/, "");
}
