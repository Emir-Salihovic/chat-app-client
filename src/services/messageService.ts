import { instance as axios } from "./index";

export async function sendMessage(roomId: string, message: string) {
  const response = await axios.post(`/rooms/messages/${roomId}`, { message });

  return response.data;
}

export async function getRoomMessages(roomId: string) {
  const response = await axios(`/rooms/messages/${roomId}`);

  return response.data;
}
