import { useState } from "react";
import useAuthStore, { AuthState } from "../../store/authStore";
import SocketService from "../../services/socketService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchJoinedRooms } from "../../services/roomService";

type RoomDropdownProps = {
  room: any;
  showOptions: boolean;
};

const isRoomJoined = (roomId: string, roomsJoined: any) => {
  return roomsJoined?.roomsJoined.some((room: any) => room.roomId === roomId);
};

export default function RoomDropdown({ room, showOptions }: RoomDropdownProps) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logedInUser = useAuthStore((state: AuthState) => state.logedInUser);
  const { data: roomsJoined, isLoading: isRoomsJoinedLoading } = useQuery({
    queryKey: ["rooms-joined"],
    queryFn: fetchJoinedRooms,
  });

  async function leaveRoom(roomId: string) {
    console.log("leaving room...");
    SocketService.emit("leftRoom", { userId: logedInUser?._id, roomId });

    setIsOpen(false);
    queryClient.invalidateQueries({ queryKey: ["rooms-joined"] });
  }

  const roomAlreadyJoined = isRoomJoined(room?._id, roomsJoined);

  async function joinRoom(roomId: string) {
    SocketService.emit("joinRoom", { userId: logedInUser?._id, roomId });

    setIsOpen(false);
    queryClient.invalidateQueries({ queryKey: ["rooms-joined"] });
  }

  if (!showOptions) return null;

  return (
    <div className="relative inline-block text-left">
      <div onClick={() => setIsOpen((prevState) => !prevState)}>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          Settings
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          {!roomAlreadyJoined && !isRoomsJoinedLoading ? (
            <div
              className="py-1 cursor-pointer"
              role="none"
              onClick={() => joinRoom(room._id)}
            >
              <button
                className="block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
              >
                Join Room
              </button>
            </div>
          ) : (
            <div
              className="py-1 cursor-pointer"
              role="none"
              onClick={() => leaveRoom(room._id)}
            >
              {/* Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" */}
              <button
                className="block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
              >
                Leave Room
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
