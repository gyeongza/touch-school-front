import { api } from '@/app/_apis';
import { GetTreeInfoResponse, WaterTreeResponse } from '../_type';
import { treeFetchTags } from '@/app/_utils/fetch-tags';

export const HomeApi = {
  getTreeInfo: async (userId: number): Promise<GetTreeInfoResponse> => {
    const res = await api.get<GetTreeInfoResponse>('/api/v1/tree/status', {
      next: { tags: [treeFetchTags.treeInfo(userId)] },
    });
    return res.body;
  },

  waterTree: async (): Promise<WaterTreeResponse> => {
    const res = await api.post<WaterTreeResponse>('/api/v1/tree/water');
    return res.body;
  },
};
