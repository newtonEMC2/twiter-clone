import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { getAllCommentsUseCase } from "../../../application/comment/getAllCommentsUseCase";
import { createCommentUseCase } from "../../../application/comment/createCommentUseCase";
import { getFollowingUsersUseCase } from "../../../application/user/getFollowingUsersUseCase";
import { commentsStore } from "../../../domain/comment/comment.store";
import { Dashboard } from "./dashboard.view";
import { store } from "../../../infrastructure/store/store";

const commentsRepository = {
  getAllComments: () => Promise.resolve([{ content: "::comment::" }]),
  createComment: () => Promise.resolve({ content: "::newcomment::" }),
};

const usersRepository = {
  getFollowingUsers: () => Promise.resolve([{ name: "::username::" }]),
};

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

const DashboardWrapped = () => (
  <Provider store={store}>
    <DashboardInstance></DashboardInstance>
  </Provider>
);

describe("Dashboard view", () => {
  describe("When comments loads", () => {
    it("should retrieve and display comments", async () => {
      render(<DashboardWrapped></DashboardWrapped>);
      const comment = await screen.findByText(/::comment::/);
      expect(comment).toBeInTheDocument();
    });
  });
  describe("When creating a task", () => {
    it("should come up the new task in the screen", async () => {
      render(<DashboardWrapped></DashboardWrapped>);

      const contentInput = screen.getByLabelText("content");
      fireEvent.change(contentInput, {
        target: { value: "::newcomment::" },
      });

      const submitButton = screen.getByLabelText("submit-button");
      fireEvent.click(submitButton);

      const newContent = await screen.findByText(/::newcomment::/);

      expect(newContent).toBeInTheDocument();
    });
  });
  describe("When following users loads", () => {
    it("should retrieve and display users that we follow", async () => {
      render(<DashboardWrapped></DashboardWrapped>);
      const user = await screen.findByText(/::username::/);
      expect(user).toBeInTheDocument();
    });
  });
});
