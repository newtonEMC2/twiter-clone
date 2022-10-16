import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { getAllCommentsUseCase } from "../../../application/comment/getAllCommentsUseCase";
import { createCommentUseCase } from "../../../application/comment/createCommentUseCase";
import { getFollowingUsersUseCase } from "../../../application/user/getFollowingUsersUseCase";
import { getUsersToFollowUseCase } from "../../../application/user/getUsersToFollowUseCase";
import { followUserUseCase } from "../../../application/user/followUserUseCase";
import { unfollowUserUseCase } from "../../../application/user/unfollowUserUseCase";
import { getAuthenticatedUserUseCase } from "../../../application/user/getAuthenticatedUserUseCase";
import { commentsStore } from "../../../domain/comment/comment.store";
import { usersStore } from "../../../domain/user/user.store";
import { Dashboard } from "./dashboard.view";
import { store } from "../../../infrastructure/store/store";
import { UserService } from "../../../domain/user/user.service";

const commentsRepository = {
  getAllComments: () => Promise.resolve([{ content: "::comment::" }]),
  createComment: () => Promise.resolve({ content: "::newcomment::" }),
};

const usersRepository = {
  getFollowingUsers: () => Promise.resolve([{ name: "::followinguser::" }]),
  getUsersToFollow: () => Promise.resolve([{ name: "::usertofollow::" }]),
  getAuthenticatedUser: () =>
    Promise.resolve([{ name: "::authenticatedUser::" }]),
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
    usersStore,
  }),
  getUsersToFollowUseCase: getUsersToFollowUseCase({
    usersRepository,
    usersStore,
  }),
  getAuthenticatedUserUseCase: getAuthenticatedUserUseCase({
    usersRepository,
    usersStore,
  }),
  followUserUseCase: followUserUseCase({
    usersRepository,
    UserService,
  }),
  unfollowUserUseCase: unfollowUserUseCase({
    usersRepository,
    UserService,
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
      const user = await screen.findByText(/::followinguser::/);
      expect(user).toBeInTheDocument();
    });
    it("should retrieve and display users that we don't follow", async () => {
      render(<DashboardWrapped></DashboardWrapped>);
      const user = await screen.findByText(/::usertofollow::/);
      expect(user).toBeInTheDocument();
    });
  });
});
