import axios from "axios";
import { socket } from "../main";

const token = null; //put token here

const userId = "6698f8bf35f0398d66655337";

export async function sendMessage(roomId: string, message: string) {
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
  const response = await axios(
    `http://localhost:8000/api/v1/rooms/messages/${roomId}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
}
