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
}

export interface GetUserResponse extends User {}
