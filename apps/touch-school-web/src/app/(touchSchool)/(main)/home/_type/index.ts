export interface TreeInfo {
  id: number;
  level: number;
  experience: number;
  lastWateredAt: string;
}

export type GetTreeInfoResponse = TreeInfo;

export interface WaterTreeRequest {
  count: number;
}
export interface WaterTreeResponse {
  success: boolean;
  message: string;
  data: TreeInfo;
}

export interface GetSchoolInfoResponse {
  schoolName: string;
  currentUser: {
    id: number;
    name: string;
    grade: number;
    class: number;
    wateringCount: number;
    joinedAt: string;
  };
  users: {
    id: number;
    name: string;
    grade: number;
    class: number;
    wateringCount: number;
    joinedAt: string;
  }[];
}
