import { AuthCredentials } from "../types";
import { instance as axios } from "./index";

export async function login(data: AuthCredentials) {
  const response = await axios.post(`/users/login`, data);
  return response.data;
}

export async function logout() {
  await axios.post(`/users/logout`);
}

export async function signup(data: AuthCredentials) {
  const response = await axios.post(`/users/signup`, data);
  return response.data;
}

export async function whoAmI() {
  const response = await axios.get(`/users/me`);
  return response.data;
}
