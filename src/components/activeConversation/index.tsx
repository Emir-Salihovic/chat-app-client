import { useNavigate, useParams } from "react-router-dom";
import { EllipsisHorizontalIcon } from "../../icons";
import { useCallback, useEffect, useRef, useState } from "react";
import RoomJoinedMessage from "../roomJoinedMessage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchRoomMembersCount,
  fetchRoomOnlineMembers,
  fetchSingleRoom,
} from "../../services/roomService";
import MessageInput from "../messageInput";
import { instance as axios } from "../../services";
import useAuthStore, { AuthState } from "../../store/authStore";
import SocketService from "../../services/socketService";

export default function ActiveConversation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const params = useParams();
  const prevRoomRef = useRef<string>(params?.roomId as string);
  const logedInUser = useAuthStore((state: AuthState) => state.logedInUser);
  const [memberJoinedMessages, setMemberJoinedMessages] = useState<string[]>(
    []
  );

  const { data: singleRoomData, refetch: fetchRoom } = useQuery({
    queryKey: ["single-room"],
    queryFn: () =>
      fetchSingleRoom(logedInUser?._id as string, params.roomId as string),
    enabled: false,
  });

  const { data: roomOnlineMembers, refetch } = useQuery({
    queryKey: ["room-online-members"],
    queryFn: () => fetchRoomOnlineMembers(params?.roomId as string),
  });

  const { data: roomMessages, refetch: getMessagesForRoom } = useQuery({
    queryKey: ["room-messages"],
    queryFn: async () => {
      const response = await axios(`/rooms/messages/${params.roomId}`);
      return response.data;
    },
  });

  const { data: roomMembersCount, refetch: getRoomMembersCount } = useQuery({
    queryKey: ["room-members-count"],
    queryFn: () => fetchRoomMembersCount(params?.roomId as string),
  });

  useEffect(() => {
    console.log("Active conversation first effect...");
    if (logedInUser?._id) {
      fetchRoom();
    }
    getMessagesForRoom();

    const handleUserChangedRoom = (message: string) => {
      console.log("message user changed room", message);
      queryClient.invalidateQueries({ queryKey: ["room-online-members"] });
    };

    const handleUserLeftRoomMessage = (message: string) => {
      console.log("message if user left room", message);
      queryClient.invalidateQueries({ queryKey: ["rooms-joined"] });
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      queryClient.invalidateQueries({ queryKey: ["room-messages"] });
      queryClient.invalidateQueries({ queryKey: ["room-online-members"] });
      queryClient.invalidateQueries({ queryKey: ["room-members-count"] });
    };

    const handleUserLogedOut = () => {
      queryClient.invalidateQueries({ queryKey: ["room-online-members"] });
    };

    SocketService.on("userLeftRoom", handleUserLeftRoomMessage);
    SocketService.on("userChangedRoom", handleUserChangedRoom);
    SocketService.on("userLogedOut", handleUserLogedOut);

    queryClient.invalidateQueries({ queryKey: ["room-members-count"] });

    if (prevRoomRef.current !== params.roomId) {
      SocketService.emit("roomChanged", {
        userId: logedInUser?._id,
        roomId: prevRoomRef.current,
      });
    }

    prevRoomRef.current = params.roomId as string;

    console.log("prev room ref", prevRoomRef.current);

    return () => {
      SocketService.off("userLeftRoom", handleUserLeftRoomMessage);
      SocketService.off("userChangedRoom", handleUserChangedRoom);
      SocketService.off("userLogedOut", handleUserLogedOut);
    };
  }, [params.roomId, logedInUser?._id]);

  useEffect(() => {
    console.log("Active conversation second effect...");
    let deletedRoomTimeout: any;

    const handleMemberJoinedMessage = (message: string) => {
      setMemberJoinedMessages((prevMessages) => [...prevMessages, message]);
      queryClient.invalidateQueries({ queryKey: ["rooms-joined"] });
      queryClient.invalidateQueries({ queryKey: ["room-messages"] });
      queryClient.invalidateQueries({ queryKey: ["room-online-members"] });
      queryClient.invalidateQueries({ queryKey: ["room-members-count"] });
    };

    const handleReceivedMessage = (message: string) => {
      console.log("message received", message);
      getMessagesForRoom();
      queryClient.invalidateQueries({ queryKey: ["room-online-members"] });
      queryClient.invalidateQueries({ queryKey: ["room-messages"] });
    };

    const handleRoomDeletedMessage = (message: string) => {
      console.log("message", message);
      setMemberJoinedMessages((prevState: string[]) => [...prevState, message]);
      deletedRoomTimeout = setTimeout(() => {
        navigate("/rooms");
      }, 2000);
    };

    SocketService.on("message", handleMemberJoinedMessage);
    SocketService.on("messageReceived", handleReceivedMessage);
    SocketService.on("roomDeleted", handleRoomDeletedMessage);

    return () => {
      SocketService.off("message", handleMemberJoinedMessage);
      SocketService.off("messageReceived", handleReceivedMessage);
      SocketService.off("roomDeleted", handleRoomDeletedMessage);
      clearTimeout(deletedRoomTimeout);
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
            {roomMembersCount?.roomMembersCount} members,{" "}
            {roomOnlineMembers?.onlineMembers?.length} online
          </p>
        </div>
        <div className="mt-2">
          <EllipsisHorizontalIcon />
        </div>
      </div>

      <RoomJoinedMessage
        messages={memberJoinedMessages}
        onRemoveMessage={handleRemoveMessage}
        show={true}
      />

      <div className="flex flex-col relative min-h-[85%] max-h-[85%] overflow-y-scroll">
        {roomMessages?.roomMessages.map((roomMessage: any) => {
          const isUserOnline = roomOnlineMembers?.onlineMembers.find(
            (member: any) => member.userId === roomMessage.userId._id
          );

          if (roomMessage.userId._id === logedInUser?._id) {
            return (
              <div key={roomMessage._id} className="mt-4 min-h-[70px]">
                <div className="flex items-end gap-x-2 absolute right-0 lg:right-4 max-w-[100%] lg:max-w-[45%] w-full">
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
                        {new Date(roomMessage.createdAt).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
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
                        {new Date(roomMessage.createdAt).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
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
