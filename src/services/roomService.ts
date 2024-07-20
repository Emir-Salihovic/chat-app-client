import { socket } from "../main";
import { instance as axios } from "./index";

export async function fetchRooms() {
  const response = await axios("/rooms");
  return response.data;
}

export async function fetchJoinedRooms() {
  const response = await axios("/rooms/joined");
  return response.data;
}

export async function fetchSingleRoom(userId: string, roomId: string) {
  const response = await axios(`/rooms/${roomId}`);

  const room = response.data;

  if (room.hasJoinedRoom) {
    socket.emit("joinRoom", {
      userId,
      roomId,
    });
  }

  return response.data;
}
