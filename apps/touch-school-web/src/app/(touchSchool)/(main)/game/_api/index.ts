import { api } from '@/_apis';
import { GameResultRequest, GameResultResponse } from '../_type';

export const GameApi = {
  postPlayResult: async (data: GameResultRequest) => {
    const response = await api.post<GameResultResponse>('/api/v1/game/play', data);
    return response.body;
  },
};
