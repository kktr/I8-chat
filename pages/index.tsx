import * as React from 'react';
import { Box, Card, Container, FormControl, TextField } from '@mui/material';
import type { NextPage } from 'next';
import { Message } from '../components/Message';
import { Socket, io } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';

const Home: NextPage = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messageBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io();
    newSocket.on('connected', (arg) => {
      addMessageToList(arg);
    });
    setSocket(newSocket);
  }, []);

  const addMessageToList = (newMessage: string) => {
    setMessages([...messages, newMessage]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addMessageToList(inputValue);
    setInputValue('');
    socket?.emit('Out message', inputValue);
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
    addMessageToList('innyEvent');
  };

  useEffect(() => {
    setTimeout(() => {
      addMessageToList('3sec');
    }, 3000);
  }, []);

  return (
    <>
      <Container
        maxWidth="md"
        sx={{ paddingTop: '2rem' }}
        onClick={handleBoxClick}
      >
        <Card
          variant="outlined"
          sx={{
            minHeight: '200px',
            height: '80vh',
            padding: '10px',
            overflow: 'auto',
            borderColor: 'blue',
          }}
        >
          {messages.map((message) => (
            <Message text={message} />
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
          />
        </FormControl>
      </Container>
    </>
  );
};

export default Home;
