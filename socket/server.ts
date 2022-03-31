import { Server } from 'socket.io';
// import { IMessage } from '../interfaces/message';

export function setupHandlers(io: Server) {
  io.on('connection', (socket) => {
    console.log('Client connected');
    socket.emit('connected', 'Connected');

    socket.on('Out message', (arg: string) => {
      console.log('Out message', arg);
      socket.broadcast.emit('In message', arg);
    });
  });
}
