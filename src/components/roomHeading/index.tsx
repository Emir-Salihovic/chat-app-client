import { Room } from "../../types";
import RoomDropdown from "../roomDropdown";

type RoomHeadingProps = {
  room: Room;
  membersCount: number;
  onlineMembers: number;
  showOptions: boolean;
};

const RoomHeading = ({
  room,
  membersCount,
  onlineMembers,
  showOptions,
}: RoomHeadingProps) => {
  return (
    <div className="flex justify-between pb-2">
      <div className="flex flex-col">
        <h3 className="font-medium text-lg md:text-xl">{room?.name}</h3>
        <p className="text-gray-400 text-xs md:text-sm">
          {membersCount} members, {onlineMembers} online
        </p>
      </div>
      <div className="mt-2">
        <RoomDropdown showOptions={showOptions} room={room} />
      </div>
    </div>
  );
};

export default RoomHeading;
