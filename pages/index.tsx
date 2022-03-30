import * as React from "react";
import { Box, Card, Container, FormControl, TextField } from "@mui/material";
import type { NextPage } from "next";

interface IMessage {
  text: string;
  id: string;
}

const Home: NextPage = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const messageBoxRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messageBoxRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessageToList = (text: string) => {
    setMessages((prevMessages) => {
      const messageObject = {
        text,
        id: Math.random().toString(),
      };
      const newMessages = [...prevMessages, messageObject];
      return newMessages;
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addMessageToList(inputValue);
    setInputValue("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trimStart();
    setInputValue(inputValue);
  };
  return (
    <>
      <Container maxWidth="md" sx={{ paddingTop: "2rem" }}>
        <Card
          variant="outlined"
          sx={{
            minHeight: "200px",
            height: "10vh",
            padding: "5px",
            overflow: "auto",
            borderColor: "blue",
          }}
        >
          {messages.map((message) => (
            <Box sx={{ padding: "5px" }} key={message.id}>
              {message.text}
            </Box>
          ))}
          <Box ref={messageBoxRef} />
        </Card>
        <FormControl
          onSubmit={handleSubmit}
          component="form"
          sx={{ marginTop: "10px", width: "100%" }}
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
