import { useState } from "react";
import { SendMessageIcon } from "../../icons";
import { sendMessage } from "../../services/messageService";

type MessageInputProps = {
  roomId: string | undefined;
};

const MessageInput: React.FC<MessageInputProps> = ({ roomId }) => {
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      console.log("Send message:", message);

      if (!roomId) return;

      sendMessage(roomId, message);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center bg-messageContainerGuest rounded-full px-4 py-2 w-full absolute bottom-3 left-0">
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        placeholder="Your message"
        className="flex-1 bg-transparent border-none outline-none px-2 text-gray-800"
      />

      <button className="cursor-pointer" onClick={() => handleSend()}>
        <SendMessageIcon />
      </button>
    </div>
  );
};

export default MessageInput;
