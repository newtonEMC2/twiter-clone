import { render, screen, fireEvent } from "@testing-library/react";
import { getAllCommentsUseCase } from "../../../application/comment/getAllCommentsUseCase";
import { Dashboard } from "./dashboard.view";

const commentsRepository = {
  getAllComments: () => Promise.resolve(["::comment::"]),
};

const DashboardInstance = Dashboard({
  getAllCommentsUseCase: getAllCommentsUseCase({ commentsRepository }),
});

describe("Dashboard view", () => {
  describe("When loads", () => {
    it("should retrieve and display comments", async () => {
      render(<DashboardInstance></DashboardInstance>);
      const comment = await screen.findByText(/::comment::/);
      expect(comment).toBeInTheDocument();
    });
  });
  describe("When creating a task", () => {
    it("should create a task in the db", async () => {});
  });
});
