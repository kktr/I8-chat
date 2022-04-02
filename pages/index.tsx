import { Box, Card, Container, FormControl, TextField } from '@mui/material';
import type { NextPage } from 'next';
import { Message } from '../components/Message';
import { Socket, io } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';

const Home: NextPage = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const [messagesRoom1, setMessagesRoom1] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const [room, setRoom] = useState<string | undefined>();

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('connection', (socket) => {});

    newSocket?.on('In message', ({ inputValue, room }) => {
      console.log('In message', inputValue);
      addMessageToList(inputValue, room);
    });

    return () => {
      newSocket.removeAllListeners();
      newSocket.close();
    };
  }, [room]);

  useEffect(() => {
    setRoom('default');
  }, []);

  useEffect(() => {
    socket?.emit('join-room', room);
  }, [room, socket]);

  // useEffect(() => {
  //   socket?.on('connected', (arg) => {
  //     addMessageToList(arg, room);
  //   });
  // }, [socket]);

  const addMessageToList = (inputValue: string, chosenRoom: string) => {
    chosenRoom === 'default'
      ? setMessages((prevState) => {
          return [...prevState, inputValue];
        })
      : setMessagesRoom1((prevState) => {
          return [...prevState, inputValue];
        });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (room === undefined) return;
    addMessageToList(inputValue, room);
    socket?.emit('Out message', { inputValue, room });
    setInputValue('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = event.target.value.trimStart();
    setInputValue(newInputValue);
  };

  const scrollToBottom = () => {
    messageBoxRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleBoxClick = () => {
    // addMessageToList('innyEvent');
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     addMessageToList('3sec');
  //   }, 3000);
  // }, []);

  const handleClear = () => {
    room === 'default' ? setMessages([]) : setMessagesRoom1([]);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setRoom(event.currentTarget.value);
  };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{ paddingTop: '2rem' }}
        onClick={handleBoxClick}
      >
        <div className="flex">
          <div className="rooms">
            <h2 className="rooms__header">Rooms</h2>
            <button
              onClick={handleClick}
              id="default"
              value="default"
              className={room === 'default' ? 'button active' : 'button'}
            >
              Default
            </button>
            <button
              onClick={handleClick}
              id="room1"
              className={room === 'room1' ? 'button active' : 'button'}
              value="room1"
            >
              Room one
            </button>
            <button
              onClick={handleClear}
              id="clear"
              className="button clear"
              value="clear"
            >
              Clear
            </button>
          </div>

          <div>
            <Card
              variant="outlined"
              sx={{
                minHeight: '200px',
                height: '80vh',
                width: '700px',
                padding: '10px',
                overflow: 'auto',
                borderColor: 'blue',
              }}
            >
              {room === 'default'
                ? messages.map((message, index) => (
                    <Message
                      text={message}
                      key={`default-${index.toString()}`}
                    />
                  ))
                : messagesRoom1.map((message2, index) => (
                    <Message
                      text={message2}
                      key={`room1-${index.toString()}`}
                    />
                  ))}
              <Box ref={messageBoxRef} />
            </Card>

            <FormControl
              onSubmit={handleSubmit}
              component="form"
              sx={{ marginTop: '10px', width: '100%' }}
            >
              <TextField
                fullWidth
                placeholder="Your message"
                onChange={handleInputChange}
                value={inputValue}
                required
              />
            </FormControl>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
