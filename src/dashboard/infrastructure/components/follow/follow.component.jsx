import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Button, Typography } from "@mui/material";

export const Follow = ({ getUsersToFollowUseCase }) => {
  const [usersToFollow, setUsersToFollow] = useState([]);
  useEffect(() => {
    getUsersToFollowUseCase().then(setUsersToFollow);
  }, []);

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <Typography variant="h6">following</Typography>
      <List component="nav" aria-label="main mailbox folders">
        {usersToFollow.map((user) => (
          <div key={user.id}>
            <ListItem>
              <ListItemText primary={user.name} />
              <Button variant="contained" size="small">
                follow
              </Button>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Box>
  );
};
