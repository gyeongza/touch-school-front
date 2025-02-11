export interface User {
  id: number;
  name: string;
  phoneNumber: string;
  grade: number;
  class: number;
  schoolId: number;
  createdAt: Date;
  waterCount: number;
  school: {
    id: number;
    name: string;
    address?: string;
  };
  attendance: {
    id: number;
    createdAt: Date;
  }[];
}

export interface GetUserResponse extends User {}

export interface GetUserInfoResponse {
  school: {
    id: number;
    name: string;
    totalUser: number;
  };
  tree: {
    id: number;
    level: number;
  };
}

export interface GetAttendanceResponse {
  attendances: {
    id: number;
    userId: number;
    createdAt: Date;
  }[];
  canAttendance: boolean;
}
