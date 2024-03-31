export enum HRMood {
  OFFER,
  NORMAL_1,
  NORMAL_2,
  NORMAL_3,
  RESCINDED,
}

export enum AppPage {
  LANDING,
  GAME,
}
export interface IUserInfo {
  tokens: number;
}

export interface IAppContext {
  setIsAuthModalOpen: (val: boolean) => void;
  isAuthModalOpen: boolean;
}

interface IMessage {
  id: string;
  content: {
    text: {
      value: string;
    };
  }[];
  role: "user" | "assistant";
}

export interface IAPIResponse<T> {
  success: boolean;
  error_msg?: string;
  data: T;
}

export interface ICreateThreadData {
  threadId: string;
  messages: { data: IMessage[] };
}

export type ICreateThreadResponse = IAPIResponse<ICreateThreadData>;

export enum ThreadOutcome {
  UNKNOWN,
  ACCEPTED,
  RESCINDED,
}

export interface IThreadData {
  messages: { data: IMessage[] };
  isDisabled: boolean;
}
export type IThreadDataResponse = IAPIResponse<IThreadData>;

export interface ISendMessageRequest {
  thread_id: string;
  message: string;
  uid: string;
}

export type ISendDemoMessageRequest = Omit<ISendMessageRequest, "uid">;

export interface IUnlockThreadRequest {
  uid: string;
  thread_id: string;
}

export interface ICreateAndUnlockThreadRequest {
  uid: string;
}

export interface IWebMessage {
  text: string;
  isGpt: boolean;
  id: string;
}
