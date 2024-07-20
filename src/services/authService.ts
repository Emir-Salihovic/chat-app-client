import { instance as axios } from "./index";

export type AuthLoginData = {
  username: string;
  password: string;
};

export type User = {
  _id: string;
  username: string;
};

export async function login(data: AuthLoginData) {
  const response = await axios.post(`/users/login`, data, {
    withCredentials: true,
  });

  return response.data;
}

export async function logout() {
  await axios.post(`/users/logout`);
}

export async function whoAmI() {
  const response = await axios.get(`/users/me`);
  return response.data;
}
