import { useQuery } from "@tanstack/react-query";
import { fetchJoinedRooms } from "../../services/roomService";

type RoomItemProps = {
  room: any;
  onRoomJoin: (roomId: string) => void;
};

const isRoomJoined = (roomId: string, roomsJoined: any[]) => {
  return roomsJoined?.roomsJoined.some((room: any) => room.roomId === roomId);
};

export default function RoomItem({ room, onRoomJoin }: RoomItemProps) {
  const { data: roomsJoined, isLoading: isRoomsJoinedLoading } = useQuery({
    queryKey: ["rooms-joined"],
    queryFn: fetchJoinedRooms,
  });

  const roomInitials = room.name.split("")[0] + room.name.split(" ")[1][0];

  const roomAlreadyJoined = isRoomJoined(room._id, roomsJoined);

  return (
    <div
      key={room._id}
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

      {!roomAlreadyJoined && !isRoomsJoinedLoading && (
        <button
          onClick={() => onRoomJoin(room._id)}
          className="bg-messageContainerSender text-white text-xs py-1 px-3 inline-block rounded-lg h-[30px]"
        >
          +
        </button>
      )}
    </div>
  );
}
