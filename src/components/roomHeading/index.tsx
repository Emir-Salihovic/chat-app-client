import { EllipsisHorizontalIcon } from "../../icons";

type RoomHeadingProps = {
  room: {
    name: string;
  };
  membersCount: number;
  onlineMembers: number;
};

const RoomHeading = ({
  room,
  membersCount,
  onlineMembers,
}: RoomHeadingProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col">
        <h3 className="font-medium text-lg md:text-xl">{room?.name}</h3>
        <p className="text-gray-400 text-xs md:text-sm">
          {membersCount} members, {onlineMembers} online
        </p>
      </div>
      <div className="mt-2">
        <EllipsisHorizontalIcon />
      </div>
    </div>
  );
};

export default RoomHeading;
