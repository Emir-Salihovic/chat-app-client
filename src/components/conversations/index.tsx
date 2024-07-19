import { socket } from "../../main";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchJoinedRooms,
  fetchRooms,
  fetchSingleRoom,
} from "../../services/roomService";
import RoomItem from "../roomItem";

export default function Conversations() {
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ["rooms"], queryFn: fetchRooms });

  const userId = "669a5acd5a043e8b3a61e85e";

  const joinRoom = async (roomId: string) => {
    socket.emit("joinRoom", { userId, roomId });

    // await queryClient.fetchQuery({
    //   queryKey: ["single-room"],
    //   queryFn: () => fetchSingleRoom(roomId),
    // });

    await queryClient.invalidateQueries({
      queryKey: ["rooms"],
    });

    await queryClient.invalidateQueries({
      queryKey: ["rooms-joined"],
    });
  };

  return (
    <div className="w-[17%] md:w-[30%] h-full p-2 overflow-y-scroll">
      {data?.rooms.map((room: any) => {
        return <RoomItem key={room._id} room={room} onRoomJoin={joinRoom} />;
      })}
    </div>
  );
}
