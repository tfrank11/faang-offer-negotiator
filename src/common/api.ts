import {
  ICreateThreadData,
  ICreateThreadResponse,
  ISendMessageRequest,
  IThreadData,
  IThreadDataResponse,
} from "./types";

const API_HOST =
  import.meta.env.MODE === "development"
    ? "http://localhost:8000"
    : "https://faang-api-b6b090a1218d.herokuapp.com";

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

export async function createThread(
  uid: string
): Promise<ICreateThreadData | null> {
  const url = API_HOST + "/create_thread";
  try {
    const body = JSON.stringify({ uid });
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    const data = (await res.json()) as ICreateThreadResponse;
    if (data.success) {
      return data.data;
    }
  } catch (err) {
    return null;
  }
  return null;
}

export async function getMessages(
  threadId: string
): Promise<IThreadData | null> {
  const url = API_HOST + "/threads/" + threadId;
  try {
    const res = await fetch(url);
    const data = (await res.json()) as IThreadDataResponse;
    if (data.success) {
      return data.data;
    }
  } catch (err) {
    return null;
  }
  return null;
}

export async function sendThreadMessage(
  threadId: string,
  message: string,
  uid: string
): Promise<IThreadData | null> {
  const url = API_HOST + "/send_message";
  const request: ISendMessageRequest = {
    thread_id: threadId,
    message,
    uid,
  };
  const body = JSON.stringify(request);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    const data = (await res.json()) as IThreadDataResponse;
    if (data.success) {
      return data.data;
    }
  } catch (err) {
    return null;
  }
  return null;
}
