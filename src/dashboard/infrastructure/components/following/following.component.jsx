import React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Button, Typography } from "@mui/material";
import { useUsers } from "../../hooks/useUsers";

export const Following = ({
  getFollowingUsersUseCase,
  unfollowUserUseCase,
}) => {
  const authenticatedUser = useSelector((state) => state.auth);
  const [users] = useUsers({ useCase: getFollowingUsersUseCase });

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <Typography variant="h6">following</Typography>
      <List component="nav" aria-label="main mailbox folders">
        {users.map((user) => (
          <div key={user.id}>
            <ListItemButton selected onClick={(event) => {}}>
              <ListItemText primary={user.name} />
              <Button
                variant="contained"
                size="small"
                onClick={() =>
                  unfollowUserUseCase({ id: user.id, user: authenticatedUser })
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
