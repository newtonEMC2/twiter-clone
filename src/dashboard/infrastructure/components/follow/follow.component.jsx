import React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Button, Typography } from "@mui/material";

export const Follow = ({ followUserUseCase, usersStore }) => {
  const dispatch = useDispatch();
  const authenticatedUser = useSelector(
    usersStore.selectAuthenticatedUser,
    shallowEqual
  );
  const usersToFollow =
    useSelector(usersStore.selectUsersToFollow, shallowEqual) || [];

  return (
    <Box
      aria-label="follow-users-section"
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      <Typography variant="h6">follow</Typography>
      <List component="nav">
        {usersToFollow.map((user) => (
          <div key={user.id}>
            <ListItem>
              <ListItemText primary={user.name} />
              <Button
                variant="contained"
                size="small"
                onClick={() =>
                  followUserUseCase({
                    userToFollow: user,
                    loggedInUser: authenticatedUser,
                    dispatch,
                  })
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
