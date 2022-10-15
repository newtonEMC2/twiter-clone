import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Button, Typography } from "@mui/material";

export const Following = ({ getFollowingUsersUseCase }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getFollowingUsersUseCase().then(setUsers);
  }, [getFollowingUsersUseCase]);

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <Typography variant="h6">following</Typography>
      <List component="nav" aria-label="main mailbox folders">
        {users.map((user) => (
          <div key={user.id}>
            <ListItemButton selected onClick={(event) => {}}>
              <ListItemText primary={user.name} />
              <Button variant="contained" size="small">
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
