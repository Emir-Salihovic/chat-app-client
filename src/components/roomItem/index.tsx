import { useNavigate } from "react-router-dom";

import { socketService as socket } from "../../main";
import useAuthStore, { AuthState } from "../../store/authStore";
import { DeleteRoomIcon } from "../../icons";
import Modal from "../modal";
import { useMemo, useState } from "react";

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
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const logedInUser = useAuthStore((state: AuthState) => state.logedInUser);

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

  async function deleteRoom(roomId: string) {
    socket.emit("deleteRoom", {
      userId: logedInUser?._id,
      roomId,
    });
  }

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

        <div className="flex items-center gap-x-2">
          {logedInUser?._id === room.creator && (
            <div
              onClick={() =>
                setDeleteModalOpen((prevState: boolean) => !prevState)
              }
              className="bg-red-500 cursor-pointer text-white text-xs rounded-lg flex items-center justify-center h-[30px] w-[30px]"
              title="Delete room..."
            >
              <button className="py-1 px-3 inline-block">
                <DeleteRoomIcon />
              </button>
            </div>
          )}
        </div>
      </div>
      <Modal
        open={deleteModalOpen}
        toggleModal={() =>
          setDeleteModalOpen((prevState: boolean) => !prevState)
        }
      >
        <div>
          <h3 className="font-semibold">
            Are you sure you want to delete this room?
          </h3>

          <div className="flex items-center justify-center gap-x-4 mt-4">
            <button
              className="bg-blue-500 text-white py-1 px-2 rounded-lg w-[100px]"
              onClick={() =>
                setDeleteModalOpen((prevState: boolean) => !prevState)
              }
            >
              No
            </button>
            <button
              className="bg-red-500 text-white py-1 px-2 rounded-lg w-[100px]"
              onClick={() => deleteRoom(room._id)}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
