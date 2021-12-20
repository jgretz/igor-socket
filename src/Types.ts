export enum SocketEvents {
  Connect = 'connect',
  Disconnect = 'disconnect',
  Error = 'error',
}

export type SocketEventHandler = (args: any, callback: any) => void | Promise<void>;
