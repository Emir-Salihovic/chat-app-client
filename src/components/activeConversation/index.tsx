import { useParams } from "react-router-dom";

import { EllipsisHorizontalIcon } from "../../icons";
import { socket } from "../../main";
import { useCallback, useEffect, useState } from "react";
import RoomJoinedMessage from "../roomJoinedMessage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSingleRoom } from "../../services/roomService";
import MessageInput from "../messageInput";
import { instance as axios } from "../../services";
import useAuthStore, { AuthState } from "../../store/authStore";

export default function ActiveConversation() {
  const queryClient = useQueryClient();
  const params = useParams();
  const logedInUser = useAuthStore((state: AuthState) => state.logedInUser);
  const [memberJoinedMessages, setMemberJoinedMessages] = useState<string[]>(
    []
  );

  const { data: singleRoomData, refetch: fetchRoom } = useQuery({
    queryKey: ["single-room"],
    queryFn: () =>
      fetchSingleRoom(logedInUser?._id as string, params.roomId as string),
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { data: roomMessages, refetch: getMessagesForRoom } = useQuery({
    queryKey: ["room-messages"],
    queryFn: async () => {
      const response = await axios(`/rooms/messages/${params.roomId}`);
      return response.data;
    },
  });

  useEffect(() => {
    fetchRoom();
    getMessagesForRoom();
  }, [params.roomId]);

  useEffect(() => {
    const handleMemberJoinedMessage = (message: string) => {
      setMemberJoinedMessages((prevMessages) => [...prevMessages, message]);

      queryClient.invalidateQueries({
        queryKey: ["rooms-joined"],
      });
    };

    const handleReceivedMessage = (message: string) => {
      console.log("message received", message);
      getMessagesForRoom();
    };

    socket.on("message", handleMemberJoinedMessage);
    socket.on("messageReceived", handleReceivedMessage);

    return () => {
      socket.off("message", handleMemberJoinedMessage);
      socket.off("messageReceived", handleReceivedMessage);
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
    <div className="w-[80%] md:w-[70%] h-full py-0.5 px-4 overflow-y-scroll relative">
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

      <div className="flex flex-col relative h-full">
        {roomMessages?.roomMessages.map((roomMessage: any) => {
          // Ensure the condition is correctly evaluated
          if (roomMessage.userId._id === logedInUser?._id) {
            return (
              <div key={roomMessage._id} className="mt-4 min-h-[70px]">
                <div className="flex items-end gap-x-2 absolute right-0 lg:right-4 max-w-[100%] lg:max-w-[45%] w-full">
                  <img
                    src={logedInUser?.avatar}
                    alt="avatar"
                    className="h-14 w-14 rounded-md"
                  />
                  <div className="max-w-[90%] bg-messageContainerSender p-2 rounded-md text-[#eee] w-full">
                    <h6 className="font-semibold text-sm md:text-md">You</h6>
                    <p className="text-[10px] md:text-xs font-medium">
                      {roomMessage.message}
                    </p>
                    <div className="flex justify-end mt-2">
                      <p className="text-xs">
                        {new Date(roomMessage.createdAt).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="mt-4" key={roomMessage._id}>
                <div className="flex items-end gap-x-2">
                  <img
                    src={roomMessage.userId.avatar}
                    alt="avatar"
                    className="h-14 w-14 rounded-md"
                  />
                  <div className="max-w-[100%] lg:max-w-[40%] bg-messageContainerGuest p-2 rounded-md w-full">
                    <h6 className="text-messageText font-semibold text-sm md:text-md">
                      {roomMessage.userId.username}
                    </h6>
                    <p className="text-[10px] md:text-xs font-medium">
                      {roomMessage.message}
                    </p>
                    <div className="flex justify-end mt-2">
                      <p className="text-gray-400 text-xs">
                        {new Date(roomMessage.createdAt).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>

      <MessageInput roomId={params.roomId} />
    </div>
  );
}
