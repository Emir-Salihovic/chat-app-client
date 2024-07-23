// src/hooks/useSocket.ts
import { useEffect } from "react";
import SocketService from "../services/socketService";

const useSocket = (eventHandlers: Record<string, (...args: any[]) => void>) => {
  useEffect(() => {
    const eventNames = Object.keys(eventHandlers);

    eventNames.forEach((eventName) => {
      SocketService.on(eventName, eventHandlers[eventName]);
    });

    return () => {
      eventNames.forEach((eventName) => {
        SocketService.off(eventName, eventHandlers[eventName]);
      });
    };
  }, [eventHandlers]);
};

export default useSocket;
