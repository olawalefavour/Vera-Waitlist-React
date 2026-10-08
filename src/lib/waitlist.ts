/** Public, submit-only integration token supplied by the owner. */
export const collector = {
  endpoint: "https://nino-send-magic.lovable.app/api/public/submit",
  accessKey: "e25b1bd51c4357010cb2f8d19972aaf98eb85723051536fc",
};
export type WaitlistEntry = { name: string; email: string; role: string; idea: string };
export async function submitWaitlist(entry: WaitlistEntry, fetcher: typeof fetch = fetch) {
  if (!entry.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entry.email)) throw new Error("Please enter your name and a valid email address.");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetcher(collector.endpoint, {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, signal: controller.signal,
      body: JSON.stringify({ access_key: collector.accessKey, name: entry.name, email: entry.email,
        message: `Vera Ecosystem waitlist\nRole: ${entry.role}\nWhat I am exploring: ${entry.idea || "Not provided"}` }),
    });
    const data: unknown = await response.json().catch(() => null);
    const result = data && typeof data === "object" ? data as Record<string, unknown> : null;
    if (!response.ok || !result || result.success === false || result.error || result.status === "error") throw new Error(response.status === 429 ? "Too many attempts. Please wait a moment and try again." : "We couldn’t confirm your signup. Please try again in a moment.");
    if (!(result.success === true || result.status === "success" || result.ok === true || typeof result.id === "string" || typeof result.submission_id === "string")) throw new Error("We couldn’t confirm your signup. Please try again in a moment.");
    return result;
  } catch (error) {
    if (controller.signal.aborted) throw new Error("Your connection took too long. We couldn’t confirm your signup; please try again.");
    if (error instanceof TypeError) throw new Error("We couldn’t reach the signup service. Check your connection and try again.");
    throw error;
  } finally { clearTimeout(timer); }
}
