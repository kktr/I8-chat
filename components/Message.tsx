import { Stack } from "@mui/material";

type MessageProps = {
  text: string;
};

export const Message = ({ text }: MessageProps) => {
  return <Stack direction="row">{text}</Stack>;
};
