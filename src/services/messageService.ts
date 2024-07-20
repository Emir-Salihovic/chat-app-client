import { instance as axios } from "./index";
import { socket } from "../main";

export async function sendMessage(
  roomId: string,
  userId: string,
  message: string
) {
  socket.emit("messageSent", { userId, roomId, message });

  //   const response = await axios.post(
  //     `http://localhost:8000/api/v1/rooms/messages/${roomId}`,
  //     {
  //       headers: {
  //         Authorization: token,
  //       },
  //       data: {
  //         message,
  //       },
  //     }
  //   );
  //   if (response.statusText === "ok") {
  //     socket.emit("messageSent", {
  //       userId,
  //       roomId,
  //       message,
  //     });
  //   }
  //   return response.data;
}

export async function getRoomMessages(roomId: string) {
  const response = await axios(`/rooms/messages/${roomId}`);

  return response.data;
}
