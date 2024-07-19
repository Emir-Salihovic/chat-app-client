import axios from "axios";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWE1YWNkNWEwNDNlOGIzYTYxZTg1ZSIsImlhdCI6MTcyMTQxMjM4MiwiZXhwIjoxNzIxNDE1OTgyfQ.lWfdNcp4YlRobw9zOGEA9BgH37SPvO3hTOhfzkSD3L0";

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
