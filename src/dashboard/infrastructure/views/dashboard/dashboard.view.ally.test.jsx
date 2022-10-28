import { render, screen, act } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { CommentsRepositoryMock } from "../../../../../test/mocks/comments.repository.mock";
import { UsersRepositoryMock } from "../../../../../test/mocks/users.repository.mock";
import { withRedux } from "../../../../../test/wrappers/withRedux";
import { DashboardInstance } from "../../../../App";
import { CommentsRepository } from "../../repositories/comments.repository";
import { UsersRepository } from "../../repositories/users.repository";
import { store } from "../../store/store";

jest.mock("../../repositories/users.repository");
jest.mock("../../repositories/comments.repository");

expect.extend(toHaveNoViolations);

beforeAll(() => {
  // JSDom does not implement this and an error was being
  // thrown from jest-axe because of it.
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);
});

beforeEach(() => {
  jest.resetAllMocks();
});

it("should not have accesibility issues", async () => {
  CommentsRepository.mockImplementation(CommentsRepositoryMock);
  UsersRepository.mockImplementation(UsersRepositoryMock);
  const { container } = await act(async () =>
    render(withRedux(DashboardInstance)(store()))
  );

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
