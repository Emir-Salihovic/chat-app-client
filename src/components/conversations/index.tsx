import { socket } from "../../main";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchRooms() {
  const response = await axios("http://localhost:8000/api/v1/rooms");
  return response.data;
}

export default function Conversations() {
  const { data } = useQuery({ queryKey: ["rooms"], queryFn: fetchRooms });

  const userId = "669a5acd5a043e8b3a61e85e";
  const roomId = "669938ffc6986f5d723c2bff";

  const joinRoom = () => {
    socket.emit("joinRoom", { userId, roomId });
  };

  return (
    <div className="w-[17%] md:w-[30%] h-full p-2 overflow-y-scroll">
      {data?.rooms.map((room: any) => {
        const roomInitials =
          room.name.split("")[0] + room.name.split(" ")[1][0];

        return (
          <div
            key={room._id}
            className="bg-boxGrey flex justify-center items-center md:justify-between gap-x-2 p-2 rounded-lg"
          >
            <div className="flex gap-x-2">
              <div className="h-[45px] w-[45px] bg-messageContainerSender text-white rounded-md flex items-center justify-center">
                <p className="text-lg">{roomInitials}</p>
              </div>

              <div className="hidden md:flex flex-col">
                <h6 className="font-semibold">{room.name}</h6>
                <p className="text-black font-light text-xs">
                  Jessie rollins sent...
                </p>
              </div>
            </div>

            <button
              onClick={joinRoom}
              className="bg-messageContainerSender text-white text-xs py-1 px-3 inline-block rounded-lg h-[30px]"
            >
              +
            </button>
          </div>
        );
      })}
    </div>
  );
}
