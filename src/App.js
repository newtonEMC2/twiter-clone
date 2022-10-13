import { createCommentUseCase } from "./dashboard/application/comment/createCommentUseCase";
import { getAllCommentsUseCase } from "./dashboard/application/comment/getAllCommentsUseCase";
import { commentsRepository } from "./dashboard/domain/comment/comment.repository";
import { Dashboard } from "./dashboard/infrastructure/views/dashboard/dashboard.view";

const DashboardInstance = Dashboard({
  getAllCommentsUseCase: getAllCommentsUseCase({ commentsRepository }),
  createCommentUseCase: createCommentUseCase({ commentsRepository }),
});

function App() {
  return <DashboardInstance></DashboardInstance>;
}

export default App;
