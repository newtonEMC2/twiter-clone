import React from "react";
import Grid from "@mui/material/Grid";
import { TimelineInput } from "../../components/timelineInput/timelineInput.component";
import { useComments } from "../../hooks/useComments";
import { Following } from "../../components/following/following.component";
import { Follow } from "../../components/follow/follow.component";
import { useAuth } from "./useAuth";
import {
  StackMessages,
  ChatMessage,
} from "../../components/chatMessages/chatMessages.component";

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
    const [comments] = useComments({ getAllCommentsUseCase, commentsStore });

    return (
      <Grid container direction="column" style={{ minHeight: "100vh" }}>
        <Grid xs item container>
          <Grid item xs={3} container direction="column">
            <Grid item xs>
              <Following
                unfollowUserUseCase={unfollowUserUseCase}
                usersStore={usersStore}
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
            <StackMessages data={comments}>
              {(messageData) => (
                <ChatMessage messageData={messageData}></ChatMessage>
              )}
            </StackMessages>
          </Grid>
        </Grid>
        <Grid item>
          <TimelineInput
            createCommentUseCase={createCommentUseCase}
          ></TimelineInput>
        </Grid>
      </Grid>
    );
  };
