/**
 * Server-side signup against the newsletter opt-in endpoint (Lumant),
 * carried over from the old website's form. Shared by /api/nyhedsbrev and
 * the email-gated library (/api/bibliotek).
 */
const OPTIN_URL =
  process.env.NEWSLETTER_OPTIN_URL ||
  "https://e.lumant.dk/api/v1/optin/list_qAKd_lLnad/subscribe";

export async function subscribeToNewsletter(
  name: string,
  email: string,
): Promise<boolean> {
  // Forward as a classic form post, exactly like the old website's <form>.
  const params = new URLSearchParams({ name, email, submit: "" });

  try {
    const response = await fetch(OPTIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      redirect: "follow",
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`[newsletter] opt-in endpoint svarede ${response.status}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[newsletter] opt-in request fejlede:", error);
    return false;
  }
}
