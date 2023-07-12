import { instance } from "api/axios.api";
import { IResponseUserData } from "types/types";
import { IUser, IUserData } from "types/types";

export const AuthService = {
  async registartion(
    userData: IUserData
  ): Promise<IResponseUserData | undefined> {
    const { data } = await instance.post<IResponseUserData>(
      "auth/register",
      userData
    );
    return data;
  },
  async login(userData: IUserData): Promise<IUser> {
    const { data } = await instance.post<IUser>("auth/log-in", userData);
    return data;
  },
  async getMe(): Promise<IUser | undefined> {
    const { data } = await instance.get<IUser>("auth");

    if (data) {
      return data;
    }
  },
};
