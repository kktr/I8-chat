import * as React from "react";
import { Box, Card, Container, FormControl, TextField } from "@mui/material";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [messages, setMessages] = React.useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("handleSubmit");
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages, inputValue];
      return newMessages;
    });
    setInputValue("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
  };
  return (
    <>
      <Container maxWidth="md">
        <Card sx={{ minHeight: "200px", padding: "5px" }}>
          {messages.map((message, index) => (
            <Box sx={{ padding: "5px" }} key={index}>
              {message}
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
