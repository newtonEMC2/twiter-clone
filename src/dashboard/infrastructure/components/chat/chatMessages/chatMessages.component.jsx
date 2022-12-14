import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const StackMessages = ({
  children: componentToRender,
  data,
  ariaLabel,
}) => {
  if (!Array.isArray(data)) return null;
  if (data.length === 0) return null;
  if (!componentToRender) throw new Error();
  return (
    <Box sx={{ width: "65%" }}>
      <Stack component="ul" spacing={2} aria-label={ariaLabel}>
        {data.map((item) => (
          <li key={item.id}>{componentToRender(item)}</li>
        ))}
      </Stack>
    </Box>
  );
};

export const ChatMessage = ({ messageData }) => {
  return (
    <Item>
      <Grid container>
        <Grid item>{messageData.author.name}</Grid>
        <Grid item xs style={{ textAlign: "right" }}>
          {messageData.date}
        </Grid>
      </Grid>
      <Grid>{messageData.content}</Grid>
    </Item>
  );
};
