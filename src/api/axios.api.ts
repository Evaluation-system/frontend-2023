import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";

const URL: string = "";
export const instance = axios.create({
  baseURL: URL,
  headers: {
    Authorization: `Bearer ` + getTokenFromLocalStorage() || "",
  },
  withCredentials: true,
});
