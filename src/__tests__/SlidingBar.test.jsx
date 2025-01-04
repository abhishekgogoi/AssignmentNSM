import { render, screen, fireEvent } from "@testing-library/react";
import SlidingBar from "../components/SlidingBar";

jest.mock("../assets/folder.svg", () => "folder-icon");
jest.mock("../assets/caret-down.svg", () => "caret-icon");
jest.mock("../assets/filter-bars.svg", () => "filter-bars-icon");
jest.mock("../assets/exclamation-circle-solid.svg", () => "exclamation-icon");
jest.mock("../assets/word.svg", () => "word-icon");
jest.mock("../assets/plus-circle-solid.svg", () => "plus-icon");
jest.mock("../assets/Group 193552.svg", () => "group-icon");

jest.mock("../context/TransactionContext.jsx", () => ({
  useTransaction: () => ({
    expandedStage: null,
    handleStageClick: jest.fn(),
  }),
}));

jest.mock("../context/SlidingBarContext.jsx", () => ({
  useSlidingBar: () => ({
    isRotated: false,
    toggleSlidingBar: jest.fn(),
  }),
}));

jest.mock("../data/stages.json", () => ({
  stages: [
    {
      id: 1,
      name: "Stage 1",
      substages: [
        { id: 11, name: "Substage 1", type: "word" },
        { id: 12, name: "Substage 2", type: "folder" },
      ],
    },
    {
      id: 2,
      name: "Stage 2",
      substages: [],
    },
  ],
  stats: {
    stages: 12,
    subfolders: 23,
    documents: 1235,
  },
}));

describe("SlidingBar Component", () => {
  test("renders correctly when closed", () => {
    render(<SlidingBar isOpen={false} />);
    const slidingBar = screen.getByTestId("sliding-bar"); // Add data-testid to the component
    expect(slidingBar).toHaveClass("-translate-x-full");
  });

  test("renders correctly when open", () => {
    render(<SlidingBar isOpen={true} />);
    expect(screen.getByText("Transaction Contents")).toBeVisible();
  });

  test("displays correct statistics", () => {
    render(<SlidingBar isOpen={true} />);
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("23")).toBeInTheDocument();
    expect(screen.getByText("1235")).toBeInTheDocument();
  });

  test("renders all stages", () => {
    render(<SlidingBar isOpen={true} />);
    expect(screen.getByText("Stage 1")).toBeInTheDocument();
    expect(screen.getByText("Stage 2")).toBeInTheDocument();
  });

  test("handles stage expansion", () => {
    const mockHandleStageClick = jest.fn();
    jest
      .spyOn(require("../context/TransactionContext.jsx"), "useTransaction")
      .mockImplementation(() => ({
        expandedStage: 1,
        handleStageClick: mockHandleStageClick,
      }));

    render(<SlidingBar isOpen={true} />);
    const expandButton = screen.getAllByRole("button")[1]; // First button is the Group icon
    fireEvent.click(expandButton);
    expect(mockHandleStageClick).toHaveBeenCalledWith(1);
  });

  test("shows substages when stage is expanded", () => {
    jest
      .spyOn(require("../context/TransactionContext.jsx"), "useTransaction")
      .mockImplementation(() => ({
        expandedStage: 1,
        handleStageClick: jest.fn(),
      }));

    render(<SlidingBar isOpen={true} />);
    expect(screen.getByText("Substage 1")).toBeInTheDocument();
    expect(screen.getByText("Substage 2")).toBeInTheDocument();
  });

  test("toggle button rotates correctly", () => {
    jest
      .spyOn(require("../context/SlidingBarContext.jsx"), "useSlidingBar")
      .mockImplementation(() => ({
        isRotated: true,
        toggleSlidingBar: jest.fn(),
      }));

    render(<SlidingBar isOpen={true} />);
    const groupIcon = screen.getByAltText("Group");
    expect(groupIcon.style.transform).toBe("rotate(180deg)");
  });

  test("clicking toggle button calls toggleSlidingBar", () => {
    const mockToggleSlidingBar = jest.fn();
    jest
      .spyOn(require("../context/SlidingBarContext"), "useSlidingBar")
      .mockImplementation(() => ({
        isRotated: false,
        toggleSlidingBar: mockToggleSlidingBar,
      }));

    render(<SlidingBar isOpen={true} />);
    const toggleButton = screen.getByTestId("sliding-bar-toggle"); // Add data-testid to the button
    fireEvent.click(toggleButton);
    expect(mockToggleSlidingBar).toHaveBeenCalled();
  });

  test("renders word icon for word type substages", () => {
    jest
      .spyOn(require("../context/TransactionContext.jsx"), "useTransaction")
      .mockImplementation(() => ({
        expandedStage: 1,
        handleStageClick: jest.fn(),
      }));

    render(<SlidingBar isOpen={true} />);
    const wordTypeSubstage = screen.getByText("Substage 1").closest("li");
    expect(wordTypeSubstage).toBeInTheDocument();
    expect(
      wordTypeSubstage.querySelector('img[alt="word"]')
    ).toBeInTheDocument();
  });

  test("renders filter section", () => {
    render(<SlidingBar isOpen={true} />);
    expect(
      screen.getByText("Filter by Client/Matter name")
    ).toBeInTheDocument();
    expect(screen.getAllByAltText("Filter")).toHaveLength(2); // Two filter icons
  });
});
