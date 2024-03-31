import {
  IAPIResponse,
  ICreateAndUnlockThreadRequest,
  ICreateThreadData,
  ICreateThreadResponse,
  ISendDemoMessageRequest,
  ISendMessageRequest,
  IThreadData,
  IThreadDataResponse,
  IUnlockThreadRequest,
} from "./types";

const API_HOST =
  import.meta.env.MODE === "development"
    ? "http://localhost:8000"
    : "https://faang-api-b6b090a1218d.herokuapp.com";

export async function generatePaymentLink(
  uid: string,
  threadId: string
): Promise<string | null> {
  const url = API_HOST + "/generate_payment_link";
  try {
    const body = JSON.stringify({ uid, thread_id: threadId });
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

export async function createThread(): Promise<ICreateThreadData | null> {
  const url = API_HOST + "/create_thread";
  try {
    const res = await fetch(url, {
      method: "POST",
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

export async function sendThreadDemoMessage(
  threadId: string,
  message: string
): Promise<IThreadData | null> {
  const url = API_HOST + "/send_demo_message";
  const request: ISendDemoMessageRequest = {
    thread_id: threadId,
    message,
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

export async function unlockThread(
  threadId: string,
  uid: string
): Promise<IAPIResponse<undefined> | null> {
  const url = API_HOST + "/unlock_thread";
  const request: IUnlockThreadRequest = {
    thread_id: threadId,
    uid,
  };
  const body = JSON.stringify(request);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    const data = (await res.json()) as IAPIResponse<undefined>;
    if (data.success) {
      return data;
    }
  } catch (err) {
    return null;
  }
  return null;
}

export async function createAndUnlockThread(
  uid: string
): Promise<ICreateThreadData | null> {
  const url = API_HOST + "/create_and_unlock_thread";
  const request: ICreateAndUnlockThreadRequest = {
    uid,
  };
  const body = JSON.stringify(request);
  try {
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
