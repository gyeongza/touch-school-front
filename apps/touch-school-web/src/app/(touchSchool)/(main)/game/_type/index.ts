export type GameType = 'bug-kill';

export interface GameResultRequest {
  completedLevels: number[];
  gameType: GameType;
}

export interface GameResultResponse {
  result: {
    message: string;
    waterCount: number;
    gameCompleted: boolean;
  };
}

export interface GameCompleteEvent {
  route: string;
  gameData: GameResultRequest;
}
