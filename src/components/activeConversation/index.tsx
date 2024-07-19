import { useParams } from "react-router-dom";

import { EllipsisHorizontalIcon } from "../../icons";
import AvatarOne from "../../assets/avatar-1.jpg";
import AvatarTwo from "../../assets/avatar-2.jpg";
import AvatarThree from "../../assets/avatar-3.jpg";
import { socket } from "../../main";
import { useCallback, useEffect, useState } from "react";
import RoomJoinedMessage from "../roomJoinedMessage";
import { useQuery } from "@tanstack/react-query";
import { fetchSingleRoom } from "../../services/roomService";

export default function ActiveConversation() {
  const params = useParams();
  const { data: singleRoomData, refetch: fetchRoom } = useQuery({
    queryKey: ["single-room"],
    queryFn: () => fetchSingleRoom(params.roomId as string),
    enabled: false,
  });

  const [memberJoinedMessages, setMemberJoinedMessages] = useState<string[]>(
    []
  );

  useEffect(() => {
    fetchRoom();
  }, [params.roomId]);

  useEffect(() => {
    const handleMessage = (message: string) => {
      console.log("message", message);
      setMemberJoinedMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  const handleRemoveMessage = useCallback((index: number) => {
    setMemberJoinedMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      newMessages.splice(index, 1);
      return newMessages;
    });
  }, []);

  return (
    <div className="w-[80%] md:w-[70%] h-full py-0.5 px-4 overflow-y-scroll">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h3 className="font-medium text-lg md:text-xl">
            {singleRoomData?.room.name}
          </h3>
          <p className="text-gray-400 text-xs md:text-sm">
            23 members, 10 online
          </p>
        </div>

        <div className="mt-2">
          <EllipsisHorizontalIcon />
        </div>
      </div>

      <RoomJoinedMessage
        messages={memberJoinedMessages}
        onRemoveMessage={handleRemoveMessage}
      />

      <div className="flex flex-col relative">
        <div className="mt-4">
          <div className="flex items-end gap-x-2">
            <img
              src={AvatarOne}
              alt="avatar"
              className="h-14 w-14 rounded-md"
            />

            <div className="max-w-[100%] lg:max-w-[40%] bg-messageContainerGuest p-2 rounded-md w-full">
              <h6 className="text-messageText font-semibold text-sm md:text-md">
                Jasmin Lovery
              </h6>

              <p className="text-[10px] md:text-xs font-medium">
                I added new flows to our design system. <br /> Now you can use
                them for your projects!
              </p>

              <div className="flex justify-end mt-2">
                <p className="text-gray-400 text-xs">09:20</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-end gap-x-2">
            <img
              src={AvatarTwo}
              alt="avatar"
              className="h-14 w-14 rounded-md"
            />

            <div className="max-w-[100%] lg:max-w-[40%] bg-messageContainerGuest p-2 rounded-md w-full">
              <h6 className="text-messageText font-semibold text-sm md:text-md">
                Alex Hunt
              </h6>

              <p className="text-[10px] md:text-xs font-medium">
                Hey Guys! Important news!
              </p>

              <div className="flex justify-end mt-2">
                <p className="text-gray-400 text-xs">09:24</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 min-h-[70px]">
          <div className="flex items-end gap-x-2 absolute right-0 lg:right-4 max-w-[100%] lg:max-w-[45%] w-full">
            <img
              src={AvatarThree}
              alt="avatar"
              className="h-14 w-14 rounded-md"
            />

            <div className="max-w-[90%] bg-messageContainerSender p-2 rounded-md text-[#eee] w-full">
              <p className="text-[10px] md:text-xs font-medium">
                Jaden, my congratulations! I will be glad to work with you on a
                new project! 😍
              </p>

              <div className="flex justify-end mt-2">
                <p className="text-xs">09:27</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
