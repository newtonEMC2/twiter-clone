import { render, screen } from "@testing-library/react";
import { StackMessages } from "./chatMessages.component";

describe("Grid", () => {
  describe("when data prop is not what is expected", () => {
    it("should return null if not an array", () => {
      render(
        <StackMessages data={undefined} ariaLabel="test-grid">
          {(listData) => {
            return <h1>{listData.name}</h1>;
          }}
        </StackMessages>
      );
      const gridComponent = screen.queryByLabelText(/test-grid/i);
      expect(gridComponent).not.toBeInTheDocument();
    });
    it("should return null if empty array", () => {
      render(
        <StackMessages data={[]} ariaLabel="test-grid">
          {(listData) => {
            return <h1>{listData.name}</h1>;
          }}
        </StackMessages>
      );

      const gridComponent = screen.queryByLabelText(/test-grid/i);
      expect(gridComponent).not.toBeInTheDocument();
    });
  });

  describe("when children is not passed", () => {
    it("should throw an error", () => {
      const ComponentToRender = (
        <StackMessages
          data={[{ name: "testname" }]}
          ariaLabel="test-grid"
        ></StackMessages>
      );
      expect(() => render(ComponentToRender)).toThrow();
    });
  });

  describe("when data and children are passed", () => {
    it("should render 1 element if data contains one element", () => {
      render(
        <StackMessages data={[{ name: "testname" }]} ariaLabel="test-grid">
          {(listData) => {
            return <h1>{listData.name}</h1>;
          }}
        </StackMessages>
      );
      const gridItem = screen.queryByText("testname");
      expect(gridItem).toBeInTheDocument();
    });
    it("should render multiple elements when data contains multiple elements", () => {
      const data = [{ name: "firstitem" }, { name: "seconditem" }];
      render(
        <StackMessages data={data} ariaLabel="test-grid">
          {(listData) => {
            return <h1>{listData.name}</h1>;
          }}
        </StackMessages>
      );
      data.forEach((item) => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
      });
    });
  });
});
