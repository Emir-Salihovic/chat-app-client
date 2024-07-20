import { instance as axios } from "./index";

export async function fetchRooms() {
  const response = await axios("/rooms");
  return response.data;
}

export async function fetchJoinedRooms() {
  const response = await axios("/rooms/joined");
  return response.data;
}

export async function fetchSingleRoom(roomId: string) {
  const response = await axios(`/rooms/${roomId}`);
  return response.data;
}
