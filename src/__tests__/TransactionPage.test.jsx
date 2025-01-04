import { render, screen } from "@testing-library/react";
import TransactionPage from "../pages/TransactionPage";
import { useSlidingBar } from "../context/SlidingBarContext";

jest.mock("../components/Sidebar", () => () => (
  <div data-testid="sidebar">Sidebar</div>
));
jest.mock("../components/Header", () => () => (
  <div data-testid="header">Header</div>
));
jest.mock("../components/TransactionList", () => () => (
  <div data-testid="transaction-list">TransactionList</div>
));
jest.mock("../components/RightSidebar", () => () => (
  <div data-testid="right-sidebar">RightSidebar</div>
));
jest.mock("../components/SlidingBar", () => ({ isOpen }) => (
  <div data-testid="sliding-bar">SlidingBar</div>
));

jest.mock("../context/SlidingBarContext");

describe("TransactionPage", () => {
  test("renders all main components", () => {
    useSlidingBar.mockImplementation(() => ({
      isSlidingBarOpen: false,
    }));

    render(<TransactionPage />);

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("transaction-list")).toBeInTheDocument();
    expect(screen.getByTestId("right-sidebar")).toBeInTheDocument();
    expect(screen.queryByTestId("sliding-bar")).not.toBeInTheDocument();
  });

  test("shows sliding bar when open", () => {
    useSlidingBar.mockImplementation(() => ({
      isSlidingBarOpen: true,
    }));

    render(<TransactionPage />);

    expect(screen.getByTestId("sliding-bar")).toBeInTheDocument();
  });

  test("applies correct margin when sliding bar is open", () => {
    useSlidingBar.mockImplementation(() => ({
      isSlidingBarOpen: true,
    }));

    render(<TransactionPage />);

    const mainContent = screen.getByTestId("main-content");
    expect(mainContent).toHaveClass("ml-[20rem]");
  });

  test("applies correct margin when sliding bar is closed", () => {
    useSlidingBar.mockImplementation(() => ({
      isSlidingBarOpen: false,
    }));

    render(<TransactionPage />);

    const mainContent = screen.getByTestId("main-content");
    expect(mainContent).toHaveClass("ml-15");
  });
});
