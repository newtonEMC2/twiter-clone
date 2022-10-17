import React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Button, Typography } from "@mui/material";

export const Following = ({ unfollowUserUseCase, usersStore }) => {
  const dispatch = useDispatch();
  const authenticatedUser = useSelector(usersStore.selectAuthenticatedUser);
  const followingUsers = useSelector(
    usersStore.selectFollowingUsers,
    shallowEqual
  );

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <Typography variant="h6">following</Typography>
      <List component="nav" aria-label="main mailbox folders">
        {followingUsers.map((user) => (
          <div key={user.id}>
            <ListItemButton selected onClick={(event) => {}}>
              <ListItemText primary={user.name} />
              <Button
                variant="contained"
                size="small"
                onClick={() =>
                  unfollowUserUseCase({
                    userToUnfollow: user,
                    loggedInUser: authenticatedUser,
                    dispatch,
                  })
                }
              >
                unfollow
              </Button>
            </ListItemButton>
            <Divider />
          </div>
        ))}
      </List>
    </Box>
  );
};
