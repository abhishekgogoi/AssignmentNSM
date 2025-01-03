import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../components/Header";

// Mock the context
jest.mock("../context/SlidingBarContext.jsx", () => ({
  useSlidingBar: () => ({
    isRotated: false,
    toggleSlidingBar: jest.fn(),
    isSlidingBarOpen: false,
  }),
}));

describe("Header Component", () => {
  test("renders navigation items", () => {
    render(<Header />);
    expect(screen.getByText("CLIENT")).toBeInTheDocument();
    expect(screen.getByText("MATTER")).toBeInTheDocument();
    expect(screen.getByText("TRANSACTION DETAIL PAGE")).toBeInTheDocument();
    expect(screen.getByText("TRANSACTION CONTENTS")).toBeInTheDocument();
  });

  test("toggle button functionality", () => {
    const mockToggle = jest.fn();
    jest
      .spyOn(require("../context/SlidingBarContext.jsx"), "useSlidingBar")
      .mockImplementation(() => ({
        isRotated: false,
        toggleSlidingBar: mockToggle,
        isSlidingBarOpen: false,
      }));

    render(<Header />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockToggle).toHaveBeenCalled();
  });

  test("button is hidden when sliding bar is open", () => {
    jest
      .spyOn(require("../context/SlidingBarContext.jsx"), "useSlidingBar")
      .mockImplementation(() => ({
        isRotated: false,
        toggleSlidingBar: jest.fn(),
        isSlidingBarOpen: true,
      }));

    render(<Header />);
    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });

  test("icon rotation when isRotated is true", () => {
    jest
      .spyOn(require("../context/SlidingBarContext.jsx"), "useSlidingBar")
      .mockImplementation(() => ({
        isRotated: true,
        toggleSlidingBar: jest.fn(),
        isSlidingBarOpen: false,
      }));

    render(<Header />);
    const icon = screen.getByAltText("Group");
    expect(icon.style.transform).toBe("rotate(180deg)");
  });
});
