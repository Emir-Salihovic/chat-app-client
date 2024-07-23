type GuestMessageProps = {
  isUserOnline: boolean;
  roomMessage: {
    message: string;
    userId: {
      avatar: string;
      username: string;
    };
    createdAt: Date;
  };
};

const GuestMessage = ({ roomMessage, isUserOnline }: GuestMessageProps) => {
  return (
    <div className="mt-4">
      <div className="flex items-end gap-x-2">
        <div className="w-14 h-14 relative">
          <img
            src={roomMessage.userId.avatar}
            alt="avatar"
            className="h-full w-full rounded-md"
          />
          <div
            className={`absolute bottom-[-3px] right-[-3px] h-3 w-3 ${
              isUserOnline ? "bg-green-500" : "bg-red-500"
            } rounded-full border-2 border-white`}
          ></div>
        </div>
        <div className="max-w-[100%] lg:max-w-[40%] bg-messageContainerGuest p-2 rounded-md w-full">
          <h6 className="text-messageText font-semibold text-sm md:text-md">
            {roomMessage.userId.username}
          </h6>
          <p className="text-[10px] md:text-xs font-medium">
            {roomMessage.message}
          </p>
          <div className="flex justify-end mt-2">
            <p className="text-gray-400 text-xs">
              {new Date(roomMessage.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestMessage;
