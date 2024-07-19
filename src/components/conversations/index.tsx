import { useQuery } from "@tanstack/react-query";
import { fetchRooms } from "../../services/roomService";
import RoomItem from "../roomItem";

export default function Conversations() {
  const { data } = useQuery({ queryKey: ["rooms"], queryFn: fetchRooms });

  return (
    <div className="w-[17%] md:w-[30%] h-full p-2 overflow-y-scroll">
      {data?.rooms.map((room: any) => {
        return <RoomItem key={room._id} room={room} />;
      })}
    </div>
  );
}
