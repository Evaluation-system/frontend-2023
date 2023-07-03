export interface IUserData {
  email: string;
  password: string;
}
export interface IResponseUser {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  password?: string;
}

export interface IResponseUserData {
  token: string;
  user: IResponseUser;
}

export interface IUser {
  id: number;
  email: string;
  token: string;
}
