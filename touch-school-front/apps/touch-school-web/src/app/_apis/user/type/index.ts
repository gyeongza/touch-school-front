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

export interface GetAttendanceResponse {
  attendances: {
    id: number;
    userId: number;
    createdAt: Date;
  }[];
  canAttendance: boolean;
}
