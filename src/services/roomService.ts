import axios from "axios";

const token = null; //put token here

export async function fetchRooms() {
  const response = await axios("http://localhost:8000/api/v1/rooms");
  return response.data;
}

export async function fetchJoinedRooms() {
  const response = await axios("http://localhost:8000/api/v1/rooms/joined", {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
}

export async function fetchSingleRoom(roomId: string) {
  const response = await axios(`http://localhost:8000/api/v1/rooms/${roomId}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
}
