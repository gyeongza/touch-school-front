export interface School {
  id: number;
  name: string;
  address?: string;
  createdAt: string;
}

export type GetSchoolListResponse = School[];

export interface VerifyCodeResponse {
  isExistingUser: boolean;
}

export interface PostRegisterRequest {
  phoneNumber: string;
  name: string;
  schoolId: number;
  grade: string;
  class: string;
}
