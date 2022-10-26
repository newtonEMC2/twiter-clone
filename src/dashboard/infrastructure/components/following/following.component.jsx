import React, { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Button, Typography } from "@mui/material";

export const Following = ({
  unfollowUserUseCase,
  usersStore,
  commentsStore,
}) => {
  const dispatch = useDispatch();
  const authenticatedUser = useSelector(
    usersStore.selectAuthenticatedUser,
    shallowEqual
  );
  const followingUsers = useSelector(
    usersStore.selectFollowingUsers,
    shallowEqual
  );

  const ClickableButton = ({ children, id }) => {
    const [toggleIsActive, setToggleIsActive] = useState(false);
    return (
      <ListItemButton
        selected={toggleIsActive}
        onClick={() =>
          setToggleIsActive((p) => {
            const isActive = !p;
            if (isActive) dispatch(commentsStore.updateFilters({ id }));
            else dispatch(commentsStore.removeFilters({ id }));
            return isActive;
          })
        }
      >
        {children}
      </ListItemButton>
    );
  };

  return (
    <Box
      aria-label="following-users-section"
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      <Typography variant="h6">following</Typography>
      <List component="nav" aria-label="main mailbox folders">
        {followingUsers.map((user) => (
          <div key={user.id}>
            <ClickableButton id={user.id}>
              <ListItemText primary={user.name} />
              <Button
                variant="contained"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  unfollowUserUseCase({
                    userToUnfollow: user,
                    loggedInUser: authenticatedUser,
                    dispatch,
                  });
                }}
              >
                unfollow
              </Button>
            </ClickableButton>
            <Divider />
          </div>
        ))}
      </List>
    </Box>
  );
};
