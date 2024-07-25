import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

type RoomItemProps = {
  room: any;
};

const getRoomInitials = (roomName: string) => {
  return roomName.split(" ").length > 1
    ? roomName.split("")[0].toUpperCase() +
        roomName.split(" ")[1][0].toUpperCase()
    : roomName.split("")[0].toUpperCase() + "R";
};

export default function RoomItem({ room }: RoomItemProps) {
  const navigate = useNavigate();

  const roomBackgroundSwitcher = useMemo(() => {
    const roomBackgrounds = [
      "bg-blue-500",
      "bg-red-500",
      "bg-messageContainerSender",
      "bg-green-500",
      "bg-amber-500",
      "bg-emerald-500",
      "bg-pink-500",
      "bg-rose-500",
    ];

    const backgroundIndex = Math.floor(Math.random() * roomBackgrounds.length);
    return roomBackgrounds[backgroundIndex];
  }, []);

  return (
    <>
      <div
        key={room._id}
        onClick={() => navigate(`/rooms/${room._id}`)}
        className="bg-boxGrey flex justify-center items-center md:justify-between gap-x-2 p-2 rounded-lg mb-2"
      >
        <div className="flex gap-x-2">
          <div
            className={`h-[45px] w-[45px] ${roomBackgroundSwitcher} text-white rounded-md flex items-center justify-center`}
          >
            <p className="text-lg">{getRoomInitials(room.name)}</p>
          </div>

          <div className="hidden md:flex flex-col">
            <h6 className="font-semibold">{room.name}</h6>
            <p className="text-black font-light text-xs">
              Jessie rollins sent...
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
