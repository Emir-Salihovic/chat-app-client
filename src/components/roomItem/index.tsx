import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { fetchJoinedRooms } from "../../services/roomService";
import { socket } from "../../main";
import useAuthStore, { AuthState } from "../../store/authStore";

type RoomItemProps = {
  room: any;
};

const isRoomJoined = (roomId: string, roomsJoined: any[]) => {
  return roomsJoined?.roomsJoined.some((room: any) => room.roomId === roomId);
};

export default function RoomItem({ room }: RoomItemProps) {
  const navigate = useNavigate();

  const logedInUser = useAuthStore((state: AuthState) => state.logedInUser);
  const { data: roomsJoined, isLoading: isRoomsJoinedLoading } = useQuery({
    queryKey: ["rooms-joined"],
    queryFn: fetchJoinedRooms,
  });

  // const leaveRoomMutation = useMutation({
  //   mutationKey: ["leave-room"],
  //   mutationFn: leaveRoom,
  //   onSuccess: (data: any) => {
  //     console.log('Data after room leaving', data)
  //   },
  //   onError: (err: any) => {
  //     console.error('Error on leaving room', err)
  //   }
  // })

  const roomInitials = room.name.split("")[0] + room.name.split(" ")[1][0];
  const roomAlreadyJoined = isRoomJoined(room._id, roomsJoined);

  async function joinRoom(roomId: string) {
    socket.emit("joinRoom", { userId: logedInUser?._id, roomId });
  }

  async function leaveRoom(roomId: string) {
    console.log("leaving room...");
    socket.emit("leftRoom", { userId: logedInUser?._id, roomId });
  }

  return (
    <div
      key={room._id}
      onClick={() => navigate(`/rooms/${room._id}`)}
      className="bg-boxGrey flex justify-center items-center md:justify-between gap-x-2 p-2 rounded-lg mb-2"
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

      {!roomAlreadyJoined && !isRoomsJoinedLoading ? (
        <button
          onClick={() => joinRoom(room._id)}
          className="bg-messageContainerSender text-white text-xs py-1 px-3 inline-block rounded-lg h-[30px]"
        >
          +
        </button>
      ) : (
        <button
          onClick={() => leaveRoom(room._id)}
          className="bg-red-500 text-white text-xs py-1 px-3 inline-block rounded-lg h-[30px]"
        >
          &times;
        </button>
      )}
    </div>
  );
}
