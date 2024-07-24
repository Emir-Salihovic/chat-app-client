import { useState } from "react";
import { socketService as socket } from "../../main";
import { toast } from "react-toastify";

import { SendMessageIcon } from "../../icons";
import { sendMessage } from "../../services/messageService";
import useAuthStore, { AuthState } from "../../store/authStore";
import { useMutation } from "@tanstack/react-query";

type MessageInputProps = {
  roomId: string | undefined;
};

const MessageInput: React.FC<MessageInputProps> = ({ roomId }) => {
  const [message, setMessage] = useState("");
  const logedInUser = useAuthStore((state: AuthState) => state.logedInUser);

  const sendMessageMutation = useMutation({
    mutationKey: ["send-message"],
    mutationFn: () => sendMessage(roomId!, message),

    onSuccess: (data) => {
      setMessage("");
      socket.emit("messageSent", { userId: logedInUser?._id, roomId, message });
    },

    onError(err: any) {
      console.error("There was a problem with sending the message...", err);

      // Rate limiting error
      if (err.response.status === 429) {
        toast.error(err.response.data);
      }

      setMessage("");
    },
  });

  const disabled = sendMessageMutation.isPending;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    if (message.trim()) {
      console.log("Send message:", message);

      if (!roomId || !logedInUser?._id) return;
      await sendMessageMutation.mutateAsync();
    }
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed");

      // Handle the Enter key press here
      await handleSend();
    }
  };

  return (
    <div
      className={`flex items-center bg-messageContainerGuest rounded-full px-4 py-2 w-[64%] fixed bottom-6 left-[34%] ${
        disabled ? "text-gray-300" : "text-gray-800"
      }`}
    >
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        placeholder="Your message"
        className={`flex-1 bg-transparent border-none outline-none px-2 ${
          disabled
            ? "placeholder:text-gray-300 cursor-not-allowed"
            : "placeholder:text-gray-400"
        }`}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />

      <button
        disabled={disabled}
        className="cursor-pointer disabled:bg-gray-100 disabled:bg-transparent disabled:cursor-not-allowed"
        onClick={() => handleSend()}
      >
        <SendMessageIcon />
      </button>
    </div>
  );
};

export default MessageInput;
