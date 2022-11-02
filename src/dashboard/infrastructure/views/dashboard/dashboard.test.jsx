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
      let userName = await within(followSection).findByText("Marta");
      expect(userName).toBeInTheDocument();

      const userToFollowButton =
        within(followSection).getByLabelText("follow-Marta");
      await act(async () => {
        fireEvent.click(userToFollowButton);
      });

      userName = within(followSection).queryByText("Marta");
      expect(userName).not.toBeInTheDocument();
    });

    it("should come up in following box", async () => {
      UsersRepository.mockImplementation(UsersRepositoryMock);
      CommentsRepository.mockImplementation(CommentsRepositoryMock);
      render(withRedux(DashboardInstance)(store()));

      let followSection = screen.getByLabelText("follow-users-section");
      let userName = await within(followSection).findByText("Marta");
      expect(userName).toBeInTheDocument();

      const userToFollowButton =
        within(followSection).getByLabelText("follow-Marta");
      await act(async () => {
        fireEvent.click(userToFollowButton);
      });

      const followingSection = await screen.findByLabelText(
        "following-users-section"
      );
      userName = await within(followingSection).findByText("Marta");
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
        { name: "unfollow-Jose" }
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

      //check user is in following list
      let followingSection = screen.getByLabelText("following-users-section");
      let userName = await within(followingSection).findByText("Jose");
      expect(userName).toBeInTheDocument();

      // unfollow user
      const userToUnfollowButton = within(followingSection).getByRole(
        "button",
        { name: "unfollow-Jose" }
      );
      await act(async () => {
        fireEvent.click(userToUnfollowButton);
      });

      // make sure the user is on `follow` section
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

      const chatBox = screen.getByLabelText("chat-list");

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
      it("should show chats with just this user as author", async () => {
        UsersRepository.mockImplementation(UsersRepositoryMock);
        CommentsRepository.mockImplementation(CommentsRepositoryMock);
        render(withRedux(DashboardInstance)(store()));

        const clickableList = screen.getByRole("list", {
          name: "following-users-list",
        });
        const clickableListItems = await within(clickableList).findAllByRole(
          "listitem"
        );
        const clickableListItem = clickableListItems.find((item) =>
          /jose/i.test(item.textContent)
        );

        await act(async () => {
          fireEvent.click(clickableListItem);
        });

        const chatList = screen.getByRole("list", { name: "chat-list" });
        const chatListItems = await within(chatList).findAllByRole("listitem");
        chatListItems.forEach((item) =>
          expect(item.textContent).toMatch(/jose/i)
        );
      });
    });
  });
});
