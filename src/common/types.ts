export enum GameState {
  PLAYING,
  WON,
  LOST,
}

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
