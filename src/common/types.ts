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
  assistant_id: string;
  content: {
    text: {
      value: string;
    };
  }[];
  role: "user" | "assistant";
}

interface IAPIResponse<T> {
  success: boolean;
  data: T;
}

export interface ICreateThreadData {
  threadId: string;
  assistantId: string;
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
  thread_status: {
    outcome: ThreadOutcome;
    done: boolean;
    final_tc?: number;
  };
}
export type IThreadDataResponse = IAPIResponse<IThreadData>;

export interface ISendMessageRequest {
  thread_id: string;
  message: string;
  uid: string;
}

export interface IWebMessage {
  text: string;
  isGpt: boolean;
  id: string;
}
