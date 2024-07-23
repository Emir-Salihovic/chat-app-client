// src/services/socket.service.ts
import { io, Socket } from "socket.io-client";

class SocketService {
  private static instance: SocketService;
  private _socket: Socket; // Change property name and keep it private

  private constructor() {
    this._socket = io(import.meta.env.VITE_SOCKET_IO_SERVER);

    this._socket.on("connect", () => {
      console.log("Connected to server");
    });
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public on(event: string, handler: (...args: any[]) => void) {
    this._socket.on(event, handler);
  }

  public off(event: string, handler: (...args: any[]) => void) {
    this._socket.off(event, handler);
  }

  public emit(event: string, data: any) {
    this._socket.emit(event, data);
  }

  public get socket(): Socket {
    return this._socket; // Use getter to access the private property
  }
}

export default SocketService.getInstance();
