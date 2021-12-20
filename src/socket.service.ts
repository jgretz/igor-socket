import {io, Socket} from 'socket.io-client';
import Logger from '@jgretz/igor-log';
import {SocketEvents, SocketEventHandler} from './Types';

export class SocketService {
  socket: Socket;

  constructor() {
    // create the socket
    this.socket = io(process.env.HERMES_SOCKET_URL, {
      reconnectionDelayMax: 10000,
    });

    // standard events - we don't do anything with these right now
    this.socket.on(SocketEvents.Connect, () => {
      Logger.log(`${process.env.HERMES_SOCKET_URL}: Socket Connected`);
    });

    this.socket.on(SocketEvents.Error, (data) => {
      Logger.error(`${process.env.HERMES_SOCKET_URL}: Socket Error`, data);
    });

    this.socket.on(SocketEvents.Disconnect, () => {
      Logger.log(`${process.env.HERMES_SOCKET_URL}: Socket Disconnected`);
    });
  }

  subscribe(event: string, handler: SocketEventHandler) {
    this.socket.on(event, (args, callback) => {
      Logger.log(`${process.env.HERMES_SOCKET_URL}: ${event}`);

      handler(args, callback);
    });
  }

  send<T>(event: string, ...args: any[]): Promise<T> {
    return new Promise((resolve) => {
      this.socket.emit(event, ...args, (response: T | PromiseLike<T>) => {
        resolve(response);
      });
    });
  }
}
