import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";

const URL: string = import.meta.env.VITE_URL;
export const instance = axios.create({
  baseURL: URL,
  headers: {
    Authorization: `Bearer ` + getTokenFromLocalStorage() || "",
  },
  withCredentials: true,
});
