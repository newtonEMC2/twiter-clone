import { createCommentUseCase } from "./dashboard/application/comment/createCommentUseCase";
import { getAllCommentsUseCase } from "./dashboard/application/comment/getAllCommentsUseCase";
import { getFollowingUsersUseCase } from "./dashboard/application/user/getFollowingUsersUseCase";
import { commentsRepository } from "./dashboard/domain/comment/comment.repository";
import { commentsStore } from "./dashboard/domain/comment/comment.store";
import { usersRepository } from "./dashboard/domain/user/user.repository";
import { Dashboard } from "./dashboard/infrastructure/views/dashboard/dashboard.view";

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
  }),
});

function App() {
  return <DashboardInstance></DashboardInstance>;
}

export default App;
