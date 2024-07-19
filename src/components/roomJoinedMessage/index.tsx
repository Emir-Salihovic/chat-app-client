import { useEffect, useState } from "react";

type RoomJoinedMessageProps = {
  messages: string[];
  onRemoveMessage: (messageIndex: number) => void;
};

export default function RoomJoinedMessage({
  messages,
  onRemoveMessage,
}: RoomJoinedMessageProps) {
  const [visibleMessages, setVisibleMessages] = useState<string[]>(messages);

  useEffect(() => {
    setVisibleMessages(messages);
  }, [messages]);

  useEffect(() => {
    const timers: any = [];

    visibleMessages.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages.splice(index, 1);
          return newMessages;
        });
        onRemoveMessage(index);
      }, 3000 * (index + 1));
      timers.push(timer);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [visibleMessages, onRemoveMessage]);

  return (
    visibleMessages.length > 0 && (
      <div className="my-4 rounded-sm p-1 text-center text-xs font-semibold text-messageText">
        {visibleMessages.map((message: string, messageIndex: number) => (
          <h6 className="mt-2" key={messageIndex}>
            {message}! 🥳
          </h6>
        ))}
      </div>
    )
  );
}
