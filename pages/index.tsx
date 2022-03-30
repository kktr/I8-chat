import * as React from "react";
import { Box, Card, Container, FormControl, TextField } from "@mui/material";
import type { NextPage } from "next";

interface IMessage {
  text: string;
  id: number;
}

const Home: NextPage = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setMessages((prevMessages) => {
      const messageObject = {
        text: inputValue,
        id: parseInt(`${Math.random() * 100}`, 10),
      };
      const newMessages = [...prevMessages, messageObject];
      return newMessages;
    });
    setInputValue("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trimStart();
    setInputValue(inputValue);
  };
  return (
    <>
      <Container maxWidth="md">
        <Card sx={{ minHeight: "200px", height: "80vh", padding: "5px" }}>
          {messages.map((message, index) => (
            <Box sx={{ padding: "5px" }} key={message.id}>
              {message.text}
            </Box>
          ))}
        </Card>
        <FormControl onSubmit={handleSubmit} component="form">
          <TextField
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
