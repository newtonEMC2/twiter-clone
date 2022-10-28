import { render, screen, fireEvent, within } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { DashboardInstance } from "../../../../App";
import { store } from "../../../infrastructure/store/store";
import { UsersRepository } from "../../repositories/users.repository";
import { CommentsRepository } from "../../repositories/comments.repository";
import { withRedux } from "../../../../../test/wrappers/withRedux";
import { CommentsRepositoryMock } from "../../../../../test/mocks/comments.repository.mock";
import { UsersRepositoryMock } from "../../../../../test/mocks/users.repository.mock";

jest.mock("../../repositories/users.repository");
jest.mock("../../repositories/comments.repository");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("dashboard", () => {
  describe("when a new user is followed", () => {
    it("should remove it from follow box", async () => {
      UsersRepository.mockImplementation(UsersRepositoryMock);
      CommentsRepository.mockImplementation(CommentsRepositoryMock);
      render(withRedux(DashboardInstance)(store()));

      let followSection = screen.getByLabelText("follow-users-section");
      let userName = await within(followSection).findByText("Veronica");
      expect(userName).toBeInTheDocument();

      const userToFollowButton = within(followSection).getByRole("button", {
        name: "follow",
      });
      await act(async () => {
        fireEvent.click(userToFollowButton);
      });

      followSection = await screen.findByLabelText("follow-users-section");
      userName = within(followSection).queryByText("Veronica");
      expect(userName).not.toBeInTheDocument();
    });

    it("should come up in following box", async () => {
      UsersRepository.mockImplementation(UsersRepositoryMock);
      CommentsRepository.mockImplementation(CommentsRepositoryMock);
      render(withRedux(DashboardInstance)(store()));

      let followSection = screen.getByLabelText("follow-users-section");
      let userName = await within(followSection).findByText("Veronica");
      expect(userName).toBeInTheDocument();

      const userToFollowButton = within(followSection).getByRole("button", {
        name: "follow",
      });
      await act(async () => {
        fireEvent.click(userToFollowButton);
      });

      const followingSection = await screen.findByLabelText(
        "following-users-section"
      );
      userName = await within(followingSection).findByText("Veronica");
      expect(userName).toBeInTheDocument();
    });
  });

  describe("when a new user is unfollowed", () => {
    it("should remove following user from the following box", async () => {
      UsersRepository.mockImplementation(UsersRepositoryMock);
      CommentsRepository.mockImplementation(CommentsRepositoryMock);
      render(withRedux(DashboardInstance)(store()));

      let followingSection = screen.getByLabelText("following-users-section");
      let userName = await within(followingSection).findByText("Jose");
      expect(userName).toBeInTheDocument();

      const userToUnfollowButton = within(followingSection).getByRole(
        "button",
        { name: "unfollow" }
      );
      await act(async () => {
        fireEvent.click(userToUnfollowButton);
      });

      followingSection = await screen.findByLabelText(
        "following-users-section"
      );
      userName = within(followingSection).queryByText("Jose");
      expect(userName).not.toBeInTheDocument();
    });

    it("should add the following user into the follow box", async () => {
      UsersRepository.mockImplementation(UsersRepositoryMock);
      CommentsRepository.mockImplementation(CommentsRepositoryMock);
      render(withRedux(DashboardInstance)(store()));

      let followingSection = screen.getByLabelText("following-users-section");
      let userName = await within(followingSection).findByText("Jose");
      expect(userName).toBeInTheDocument();

      const userToUnfollowButton = within(followingSection).getByRole(
        "button",
        { name: "unfollow" }
      );
      await act(async () => {
        fireEvent.click(userToUnfollowButton);
      });

      const followSection = screen.getByLabelText("follow-users-section");
      userName = within(followSection).queryByText("Jose");
      expect(userName).toBeInTheDocument();
    });
  });
  describe("when the authenticated user posts a tweet", () => {
    it("should come up in the tweets list", async () => {
      UsersRepository.mockImplementation(UsersRepositoryMock);
      CommentsRepository.mockImplementation(CommentsRepositoryMock);
      render(withRedux(DashboardInstance)(store()));

      const inputField = screen.getByLabelText("content");
      await act(async () => {
        fireEvent.change(inputField, { target: { value: "::mycomment::" } });
      });

      const submitButton = screen.getByLabelText("submit-button");
      await act(async () => {
        fireEvent.click(submitButton);
      });

      const chatBox = screen.getByLabelText("chat");

      expect(within(chatBox).getByText("::mycomment::")).toBeInTheDocument();
    });

    it("should reset the input", async () => {
      UsersRepository.mockImplementation(UsersRepositoryMock);
      CommentsRepository.mockImplementation(CommentsRepositoryMock);
      render(withRedux(DashboardInstance)(store()));

      const inputField = screen.getByLabelText("content");
      await act(async () => {
        fireEvent.change(inputField, { target: { value: "::mycomment::" } });
      });

      const submitButton = screen.getByLabelText("submit-button");
      await act(async () => {
        fireEvent.click(submitButton);
      });

      expect(inputField).toHaveValue("");
    });

    it.skip("should also be able to post a tweet on intro keystroke", async () => {
      UsersRepository.mockImplementation(UsersRepositoryMock);
      CommentsRepository.mockImplementation(CommentsRepositoryMock);
      render(withRedux(DashboardInstance)(store()));

      let inputField = screen.getByLabelText("content");
      await act(async () => {
        fireEvent.change(inputField, { target: { value: "::mycomment::" } });
      });
      await act(async () => {
        fireEvent.keyDown(inputField, {
          key: "Enter",
          code: "Enter",
          charCode: 13,
        });
      });

      inputField = await screen.findByLabelText("content");

      expect(inputField).toHaveValue("");
    });
  });

  describe("when chat comments are filtered by user", () => {
    describe("And when just one user is selected", () => {
      it("should show chats with just this user as author", () => {
        UsersRepository.mockImplementation(UsersRepositoryMock);
        CommentsRepository.mockImplementation(CommentsRepositoryMock);
        render(withRedux(DashboardInstance)(store()));
      });
    });
  });
});
