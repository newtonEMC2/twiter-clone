import { createCommentUseCase } from "./dashboard/application/comment/createCommentUseCase";
import { getAllCommentsUseCase } from "./dashboard/application/comment/getAllCommentsUseCase";
import { getFollowingUsersUseCase } from "./dashboard/application/user/getFollowingUsersUseCase";
import { commentsRepository } from "./dashboard/domain/comment/comment.repository";
import { commentsStore } from "./dashboard/domain/comment/comment.store";
import { usersStore } from "./dashboard/domain/user/user.store";
import { usersRepository } from "./dashboard/domain/user/user.repository";
import { Dashboard } from "./dashboard/infrastructure/views/dashboard/dashboard.view";
import { getUsersToFollowUseCase } from "./dashboard/application/user/getUsersToFollowUseCase";
import { getAuthenticatedUserUseCase } from "./dashboard/application/user/getAuthenticatedUserUseCase";
import { followUserUseCase } from "./dashboard/application/user/followUserUseCase";

const DashboardInstance = Dashboard({
  getAllCommentsUseCase: getAllCommentsUseCase({
    commentsRepository,
    commentsStore,
  }),
  createCommentUseCase: createCommentUseCase({
    commentsRepository,
    commentsStore,
  }),
  getFollowingUsersUseCase: getFollowingUsersUseCase({
    usersRepository,
    usersStore,
  }),
  getUsersToFollowUseCase: getUsersToFollowUseCase({
    usersRepository,
  }),
  getAuthenticatedUserUseCase: getAuthenticatedUserUseCase({
    usersRepository,
    usersStore,
  }),
  followUserUseCase: followUserUseCase({
    usersRepository,
  }),
});

function App() {
  return <DashboardInstance></DashboardInstance>;
}

export default App;
