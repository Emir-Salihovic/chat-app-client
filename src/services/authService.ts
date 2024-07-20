import { instance as axios } from "./index";

export type AuthLoginData = {
  username: string;
  password: string;
};

export async function login(data: AuthLoginData) {
  console.log("data", data);
  const response = await axios.post(`/users/login`, data, {
    withCredentials: true,
  });

  return response.data;
}
