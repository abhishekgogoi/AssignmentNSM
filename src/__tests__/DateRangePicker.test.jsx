import { render, screen, fireEvent, act } from "@testing-library/react";
import DateRangePicker from "../components/DateRangePicker";

jest.mock("../assets/calender-days-2.svg", () => "calendar-icon");
jest.mock("lucide-react", () => ({
  ChevronLeft: () => <div data-testid="chevron-left">ChevronLeft</div>,
  ChevronRight: () => <div data-testid="chevron-right">ChevronRight</div>,
}));

describe("DateRangePicker Component", () => {
  const mockOnDateRangeChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders with initial empty state", () => {
    render(<DateRangePicker onDateRangeChange={mockOnDateRangeChange} />);

    expect(screen.getByTestId("date-range-input")).toBeInTheDocument();
    expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();
  });

  test("opens calendar dropdown on input click", () => {
    render(<DateRangePicker onDateRangeChange={mockOnDateRangeChange} />);

    fireEvent.click(screen.getByTestId("date-range-input"));
    expect(screen.getByTestId("custom-range-text")).toBeInTheDocument();
    expect(screen.getByText("Today")).toBeInTheDocument();
  });

  test("displays quick select options", () => {
    render(<DateRangePicker onDateRangeChange={mockOnDateRangeChange} />);

    fireEvent.click(screen.getByPlaceholderText("dd.mm.yyyy - dd.mm.yyyy"));

    const quickSelectOptions = [
      "Today",
      "Yesterday",
      "Last 1 Week",
      "Last 1 Month",
      "Last 6 Month",
      "All Time",
    ];

    quickSelectOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  test("handles quick select option click", () => {
    render(<DateRangePicker onDateRangeChange={mockOnDateRangeChange} />);

    fireEvent.click(screen.getByPlaceholderText("dd.mm.yyyy - dd.mm.yyyy"));
    fireEvent.click(screen.getByText("Today"));

    expect(mockOnDateRangeChange).toHaveBeenCalled();
    const call = mockOnDateRangeChange.mock.calls[0][0];
    expect(call.startDate).toBeInstanceOf(Date);
    expect(call.endDate).toBeInstanceOf(Date);
  });

  test('handles "All Time" selection', () => {
    render(<DateRangePicker onDateRangeChange={mockOnDateRangeChange} />);

    fireEvent.click(screen.getByPlaceholderText("dd.mm.yyyy - dd.mm.yyyy"));
    fireEvent.click(screen.getByText("All Time"));

    const input = screen.getByPlaceholderText("dd.mm.yyyy - dd.mm.yyyy");
    expect(input).toHaveValue("All Time");
  });

  test("displays two months in calendar view", () => {
    render(<DateRangePicker onDateRangeChange={mockOnDateRangeChange} />);

    fireEvent.click(screen.getByPlaceholderText("dd.mm.yyyy - dd.mm.yyyy"));

    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", {
      month: "long",
    });
    const nextMonth = new Date(
      currentDate.setMonth(currentDate.getMonth() + 1)
    ).toLocaleString("default", { month: "long" });

    expect(
      screen.getByText(currentMonth, { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText(nextMonth, { exact: false })).toBeInTheDocument();
  });

  test("navigates months using chevron buttons", () => {
    render(<DateRangePicker onDateRangeChange={mockOnDateRangeChange} />);

    fireEvent.click(screen.getByTestId("date-range-input"));
    fireEvent.click(screen.getByTestId("previous-month-button"));

    const leftHeader = screen.getByTestId("left-calendar-header");
    expect(leftHeader.textContent).toContain("December");
  });

  test("selects date range by clicking calendar dates", () => {
    render(<DateRangePicker onDateRangeChange={mockOnDateRangeChange} />);

    fireEvent.click(screen.getByTestId("date-range-input"));

    const firstDate = screen.getAllByTestId(/^date-cell-\d+$/)[0];
    const secondDate = screen.getAllByTestId(/^date-cell-\d+$/)[4];

    fireEvent.click(firstDate);
    fireEvent.click(secondDate);

    expect(mockOnDateRangeChange).toHaveBeenCalled();
  });

  test("closes calendar on outside click", () => {
    const { container } = render(
      <DateRangePicker onDateRangeChange={mockOnDateRangeChange} />
    );

    fireEvent.click(screen.getByPlaceholderText("dd.mm.yyyy - dd.mm.yyyy"));
    expect(screen.getByText("Custom")).toBeInTheDocument();

    act(() => {
      fireEvent.mouseDown(document.body);
    });

    expect(screen.queryByText("Custom")).not.toBeInTheDocument();
  });

  test("updates with new selected range prop", () => {
    const selectedRange = {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-31"),
    };

    const { rerender } = render(
      <DateRangePicker
        selectedRange={selectedRange}
        onDateRangeChange={mockOnDateRangeChange}
      />
    );

    const input = screen.getByPlaceholderText("dd.mm.yyyy - dd.mm.yyyy");
    expect(input.value).toContain("01/01/2025");
    expect(input.value).toContain("31/01/2025");

    const newRange = {
      startDate: new Date("2025-02-01"),
      endDate: new Date("2025-02-28"),
    };

    rerender(
      <DateRangePicker
        selectedRange={newRange}
        onDateRangeChange={mockOnDateRangeChange}
      />
    );

    expect(input.value).toContain("01/02/2025");
    expect(input.value).toContain("28/02/2025");
  });
});
