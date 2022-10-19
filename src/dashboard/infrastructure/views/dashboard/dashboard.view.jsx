import React from "react";
import Grid from "@mui/material/Grid";
import { TimelineInput } from "../../components/timelineInput/timelineInput.component";
import { Following } from "../../components/following/following.component";
import { Follow } from "../../components/follow/follow.component";
import { useAuth } from "./useAuth";
import { Chat } from "../../components/chat/chatMessages/chat.component";

export const Dashboard =
  ({
    getAllCommentsUseCase,
    createCommentUseCase,
    getAuthenticatedUserUseCase,
    followUserUseCase,
    unfollowUserUseCase,
    usersStore,
    commentsStore,
  }) =>
  () => {
    useAuth({ useCase: getAuthenticatedUserUseCase, usersStore });

    return (
      <>
        <Grid container>
          <Grid item xs={3} container direction="column">
            <Grid item xs>
              <Following
                unfollowUserUseCase={unfollowUserUseCase}
                usersStore={usersStore}
                commentsStore={commentsStore}
              ></Following>
            </Grid>
            <Grid item xs>
              <Follow
                followUserUseCase={followUserUseCase}
                usersStore={usersStore}
              ></Follow>
            </Grid>
          </Grid>
          <Grid item xs={9}>
            <Chat
              getAllCommentsUseCase={getAllCommentsUseCase}
              commentsStore={commentsStore}
            ></Chat>
          </Grid>
        </Grid>
        <span style={{ position: "fixed", bottom: "1rem", right: "0.5rem" }}>
          <TimelineInput
            createCommentUseCase={createCommentUseCase}
          ></TimelineInput>
        </span>
      </>
    );
  };
