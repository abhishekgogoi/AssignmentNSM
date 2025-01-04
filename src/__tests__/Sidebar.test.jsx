import { render, screen } from "@testing-library/react";
import Sidebar from "../components/Sidebar";

jest.mock("../assets/Muamelat logo.svg", () => "muamelat-icon");
jest.mock("../assets/chart-simple.svg", () => "chart-icon");
jest.mock("../assets/folder-3.svg", () => "folder-icon");
jest.mock("../assets/file-lines.svg", () => "file-lines-icon");
jest.mock("../assets/envelope.svg", () => "envelope-icon");
jest.mock("../assets/file.svg", () => "file-icon");
jest.mock("../assets/sliders.svg", () => "sliders-icon");
jest.mock("../assets/calender-days-2.svg", () => "calendar-icon");
jest.mock("../assets/user-circle.svg", () => "user-circle-icon");

describe("Sidebar", () => {
  test("renders all navigation items", () => {
    render(<Sidebar />);

    expect(screen.getByText("Muamelat")).toBeInTheDocument();
    expect(screen.getByText("Panorama")).toBeInTheDocument();
    expect(screen.getByText("Muamele")).toBeInTheDocument();
    expect(screen.getByText("Documents")).toBeInTheDocument();
    expect(screen.getByText("E-Mails")).toBeInTheDocument();
    expect(screen.getByText("Reports")).toBeInTheDocument();
    expect(screen.getByText("Management Panel")).toBeInTheDocument();
    expect(screen.getByText("Transaction Calendar")).toBeInTheDocument();
  });

  test("renders user profile icon", () => {
    render(<Sidebar />);
    expect(screen.getByAltText("User Profile")).toBeInTheDocument();
  });
});
