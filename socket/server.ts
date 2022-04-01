import { Server } from 'socket.io';
// import { IMessage } from '../interfaces/message';

export function setupHandlers(io: Server) {
  io.on('connection', (socket) => {
    console.log('Client connected');
    socket.emit('connected', 'Connected');

    socket.on('join-room', (room: string) => {
      // socket.rooms.clear();
      socket.join(room);
    });

    socket.on('Out message', ({ inputValue, room }) => {
      console.log('Out message', inputValue);
      socket.to(['default', 'room1']).emit('In message', { inputValue, room });
    });
  });
}
