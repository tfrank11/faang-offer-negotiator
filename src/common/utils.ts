import { HRMood, IThreadData, IWebMessage } from "./types";

export function getMessagesFromApiData(data: IThreadData) {
  const result: IWebMessage[] = [];
  for (const each of data.messages.data) {
    const text = each.content?.[0]?.text?.value;
    if (!text) continue;
    const msg: IWebMessage = {
      text,
      isGpt: each.role === "assistant",
      id: each.id,
    };
    result.push(msg);
  }
  return result;
}

export function getRandomNormalHRMood(): HRMood {
  if (Math.random() < 0.5) {
    return HRMood.NORMAL_2;
  } else {
    return HRMood.NORMAL_3;
  }
}

export function checkIfPlayable(
  isDisabled: boolean,
  isDemoDone: boolean,
  isUnlocked: boolean,
  threadUid: string,
  userUid: string
) {
  const isPlayable =
    !isDisabled && (!isDemoDone || (isUnlocked && threadUid === userUid));
  return isPlayable;
}
