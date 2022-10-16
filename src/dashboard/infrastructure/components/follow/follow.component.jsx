import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Button, Typography } from "@mui/material";

export const Follow = ({ getUsersToFollowUseCase, followUserUseCase }) => {
  const [usersToFollow, setUsersToFollow] = useState([]);
  const authenticatedUser = useSelector((state) => state.auth);

  useEffect(() => {
    getUsersToFollowUseCase().then(setUsersToFollow);
  }, []);

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <Typography variant="h6">follow</Typography>
      <List component="nav" aria-label="main mailbox folders">
        {usersToFollow.map((user) => (
          <div key={user.id}>
            <ListItem>
              <ListItemText primary={user.name} />
              <Button
                variant="contained"
                size="small"
                onClick={() =>
                  followUserUseCase({ id: user.id, user: authenticatedUser })
                }
              >
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
