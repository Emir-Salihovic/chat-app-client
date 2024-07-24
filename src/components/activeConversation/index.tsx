import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import RoomJoinedMessage from "../roomJoinedMessage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchRoomMembersCount,
  fetchRoomOnlineMembers,
  fetchSingleRoom,
} from "../../services/roomService";
import MessageInput from "../messageInput";
import useAuthStore, { AuthState } from "../../store/authStore";
import SocketService from "../../services/socketService";
import useSocket from "../../hooks/useSocket";
import MyMessage from "../myMessage";
import GuestMessage from "../guestMesage";
import { getRoomMessages } from "../../services/messageService";
import RoomHeading from "../roomHeading";

let deletedRoomTimeout: any;
let scrollTimeout: any;

export default function ActiveConversation() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const params = useParams();

  const [memberJoinedMessages, setMemberJoinedMessages] = useState<string[]>(
    []
  );

  const prevRoomRef = useRef<string>(params.roomId!);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const logedInUser = useAuthStore((state: AuthState) => state.logedInUser);

  const { data: singleRoomData, refetch: fetchRoom } = useQuery({
    queryKey: ["single-room"],
    queryFn: () => fetchSingleRoom(logedInUser?._id!, params.roomId!),
    enabled: false,
  });

  const { data: roomOnlineMembers } = useQuery({
    queryKey: ["room-online-members"],
    queryFn: () => fetchRoomOnlineMembers(params.roomId!),
  });

  const { data: roomMessages, refetch: getMessagesForRoom } = useQuery({
    queryKey: ["room-messages"],
    queryFn: () => getRoomMessages(params.roomId!),
  });

  const { data: roomMembersCount } = useQuery({
    queryKey: ["room-members-count"],
    queryFn: () => fetchRoomMembersCount(params.roomId!),
  });

  const handleUserLeftRoomMessage = (message: string) => {
    console.log("message if user left room", message);

    const queries = [
      "rooms-joined",
      "rooms",
      "room-messages",
      "room-online-members",
      "room-members-count",
    ];

    queries.forEach((query: string) => {
      queryClient.invalidateQueries({ queryKey: [query] });
    });
  };

  const handleUserChangedRoom = (message: string) => {
    console.log("message user changed room", message);
    queryClient.invalidateQueries({ queryKey: ["room-online-members"] });
  };

  const handleUserLogedOut = () => {
    queryClient.invalidateQueries({ queryKey: ["room-online-members"] });
  };

  const handleMemberJoinedMessage = (message: string) => {
    const queries = [
      "rooms-joined",
      "room-messages",
      "room-online-members",
      "room-members-count",
    ];

    queries.forEach((query: string) => {
      queryClient.invalidateQueries({ queryKey: [query] });
    });

    setMemberJoinedMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleReceivedMessage = (message: string) => {
    console.log("message received", message);

    queryClient.invalidateQueries({ queryKey: ["room-online-members"] });
    queryClient.invalidateQueries({ queryKey: ["room-messages"] });

    if (messagesContainerRef.current) {
      // TODO
      scrollTimeout = scrollTimeout = setTimeout(() => {
        messagesContainerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 1000);
    }
  };

  const handleRoomDeletedMessage = (message: string) => {
    console.log("message", message);
    setMemberJoinedMessages((prevState: string[]) => [...prevState, message]);
    deletedRoomTimeout = setTimeout(() => {
      navigate("/rooms");
    }, 2000);
  };

  useSocket({
    userLeftRoom: handleUserLeftRoomMessage,
    userChangedRoom: handleUserChangedRoom,
    userLogedOut: handleUserLogedOut,
    message: handleMemberJoinedMessage,
    messageReceived: handleReceivedMessage,
    roomDeleted: handleRoomDeletedMessage,
  });

  useEffect(() => {
    console.log("Active conversation first effect...");

    if (logedInUser?._id) {
      fetchRoom();
    }

    getMessagesForRoom();

    queryClient.invalidateQueries({ queryKey: ["room-members-count"] });

    if (prevRoomRef.current !== params.roomId) {
      SocketService.emit("roomChanged", {
        userId: logedInUser?._id,
        roomId: prevRoomRef.current,
      });
    }

    prevRoomRef.current = params.roomId!;

    return () => {
      clearTimeout(deletedRoomTimeout);
      clearTimeout(scrollTimeout);
    };
  }, [params.roomId, logedInUser?._id]);

  const handleRemoveMessage = useCallback((index: number) => {
    setMemberJoinedMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      newMessages.splice(index, 1);
      return newMessages;
    });
  }, []);

  return (
    <div className="w-[80%] md:w-[70%] h-full py-0.5 px-4 relative">
      <RoomHeading
        membersCount={roomMembersCount?.roomMembersCount}
        onlineMembers={roomOnlineMembers?.onlineMembers?.length}
        room={singleRoomData?.room}
      />

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
              <MyMessage
                key={roomMessage._id}
                roomMessage={roomMessage}
                isUserOnline={isUserOnline}
              />
            );
          } else {
            return (
              <GuestMessage
                key={roomMessage._id}
                roomMessage={roomMessage}
                isUserOnline={isUserOnline}
              />
            );
          }
        })}

        <div className="h-0" ref={messagesContainerRef}>
          &nbsp;
        </div>
      </div>
      <MessageInput roomId={params.roomId} />
    </div>
  );
}
