const API_HOST = import.meta.env.MODE ? "http://localhost:8000" : "tbd";

export async function generatePaymentLink(uid: string): Promise<string | null> {
  const url = API_HOST + "/generate_payment_link";
  try {
    const body = JSON.stringify({ uid });
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    const data = await res.json();
    if (data.success && data.data?.url) {
      return data.data.url;
    }
  } catch (err) {
    return null;
  }
  return null;
}
