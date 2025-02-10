import { User } from '../user/type';

export interface AuthData {
  accessToken: string;
  accessTokenExpiryTime: string;
  userData?: User;
}

export interface CustomErrorResponse {
  message: string;
}
