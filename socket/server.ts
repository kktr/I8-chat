import { Server } from 'socket.io';
// import { IMessage } from '../interfaces/message';

export function setupHandlers(io: Server) {
  io.on('connection', (socket) => {
    console.log('Client connected');
    socket.emit('connected', 'Connected');
    socket.on('Out message', (arg: string) => {
      console.log('Out message', arg);
      // socket.broadcast.emit('In message', arg);
    });

    // socket.on(OUT_MESSAGE, (arg) => {
    //   console.log(arg);
    //   socket.broadcast.emit(IN_MESSAGE, arg);
    // });
  });
}
