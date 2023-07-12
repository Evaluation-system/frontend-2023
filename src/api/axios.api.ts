import axios from "axios";
import { getTokenFromLocalStorage } from "helpers/localstorage.helper";

const URL: string = import.meta.env.VITE_URL;

const baseURLS = "http://localhost:3005/";
export const instance = axios.create({
  baseURL: baseURLS,
  headers: {
    Authorization: `Bearer ` + getTokenFromLocalStorage() || "",
  },
  withCredentials: true,
});
