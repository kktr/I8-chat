import { Server } from 'socket.io';
import { IN_MESSAGE, OLD_MESSAGES, OUT_MESSAGE } from '../consts';
// import { IMessage } from '../interfaces/message';

export function setupHandlers(io: Server) {
  io.on('connection', (socket) => {
    console.log('Client connected');
    socket.emit('connected', 'Connected');
    // socket.on(OUT_MESSAGE, (arg) => {
    //   console.log(arg);
    //   socket.broadcast.emit(IN_MESSAGE, arg);
    // });
  });
}
