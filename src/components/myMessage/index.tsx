import useAuthStore, { AuthState } from "../../store/authStore";

type MyMessageProps = {
  isUserOnline: boolean;
  roomMessage: {
    message: string;
    createdAt: Date;
  };
};

const MyMessage = ({ isUserOnline, roomMessage }: MyMessageProps) => {
  const logedInUser = useAuthStore((state: AuthState) => state.logedInUser);

  return (
    <div className="mt-4 h-full flex justify-end">
      <div className="flex items-end gap-x-2 right-0 lg:right-4 max-w-[100%] lg:max-w-[45%] w-full">
        <div className="w-16 h-14 relative">
          <img
            src={logedInUser?.avatar}
            alt="avatar"
            className="h-full w-full rounded-md"
          />
          <div
            className={`absolute bottom-[-3px] right-[-3px] h-3 w-3 ${
              isUserOnline ? "bg-green-500" : "bg-red-500"
            } rounded-full border-2 border-white`}
          ></div>
        </div>
        <div className="max-w-[90%] bg-messageContainerSender p-2 rounded-md text-[#eee] w-full">
          <h6 className="font-semibold text-sm md:text-md">You</h6>
          <p className="text-[10px] md:text-xs font-medium">
            {roomMessage.message}
          </p>
          <div className="flex justify-end mt-2">
            <p className="text-xs">
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

export default MyMessage;
