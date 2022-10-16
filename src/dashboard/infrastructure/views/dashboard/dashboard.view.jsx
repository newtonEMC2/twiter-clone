import React from "react";
import Grid from "@mui/material/Grid";
import { TimelineInput } from "../../components/timelineInput/timelineInput.component";
import { useComments } from "../../hooks/useComments";
import { Following } from "../../components/following/following.component";
import { Follow } from "../../components/follow/follow.component";
import { useAuth } from "./useAuth";

export const Dashboard =
  ({
    getAllCommentsUseCase,
    createCommentUseCase,
    getFollowingUsersUseCase,
    getUsersToFollowUseCase,
    getAuthenticatedUserUseCase,
    followUserUseCase,
    unfollowUserUseCase,
  }) =>
  () => {
    useAuth({ useCase: getAuthenticatedUserUseCase });
    const [comments] = useComments({ getAllCommentsUseCase });

    return (
      <Grid container direction="column" style={{ height: "100vh" }}>
        <Grid xs item container>
          <Grid item xs={3} container direction="column">
            <Grid item xs>
              <Following
                unfollowUserUseCase={unfollowUserUseCase}
                getFollowingUsersUseCase={getFollowingUsersUseCase}
              ></Following>
            </Grid>
            <Grid item xs>
              <Follow
                getUsersToFollowUseCase={getUsersToFollowUseCase}
                followUserUseCase={followUserUseCase}
              ></Follow>
            </Grid>
          </Grid>
          <Grid item xs={9}>
            {JSON.stringify(comments)}
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
