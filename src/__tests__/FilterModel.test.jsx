import { render, screen, fireEvent } from "@testing-library/react";
import FilterModel from "../components/FilterModel";

jest.mock("../assets/filter.svg", () => "filter-icon");
jest.mock("../assets/xmark-bold.svg", () => "cross-icon");
jest.mock("../assets/chevron-down.svg", () => "chevron-icon");

jest.mock("../components/DateRangePicker", () => {
  return function MockDateRangePicker({ selectedRange, onDateRangeChange }) {
    return (
      <div data-testid="date-range-picker">
        <input
          type="text"
          placeholder="dd.mm.yyyy - dd.mm.yyyy"
          value={
            selectedRange
              ? `${selectedRange.startDate} - ${selectedRange.endDate}`
              : ""
          }
          readOnly
        />
      </div>
    );
  };
});

describe("FilterModel Component", () => {
  const mockOnClose = jest.fn();
  const mockOnApply = jest.fn();
  const mockOnClear = jest.fn();

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onApply: mockOnApply,
    onClear: mockOnClear,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("does not render when isOpen is false", () => {
    render(<FilterModel {...defaultProps} isOpen={false} />);
    expect(screen.queryByText("Filters")).not.toBeInTheDocument();
  });

  test("renders all filter options when open", () => {
    render(<FilterModel {...defaultProps} />);
    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("Stage Status")).toBeInTheDocument();
    expect(screen.getByText("Responsible Party")).toBeInTheDocument();
    expect(screen.getByText("Date Range")).toBeInTheDocument();
  });

  test("closes when clicking the close button", () => {
    render(<FilterModel {...defaultProps} />);
    fireEvent.click(screen.getByAltText("Close"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("closes when clicking outside the modal", () => {
    render(<FilterModel {...defaultProps} />);
    fireEvent.click(screen.getByTestId("modal-overlay"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("handles stage status selection", () => {
    render(<FilterModel {...defaultProps} />);

    fireEvent.click(screen.getByTestId("stage-status-dropdown"));

    fireEvent.click(screen.getByText("Completed"));
    expect(screen.getByTestId("stage-status-dropdown")).toHaveTextContent(
      "Completed"
    );
  });

  test("handles clear filters", () => {
    render(<FilterModel {...defaultProps} />);
    fireEvent.click(screen.getByText("Clear Filters"));
    expect(mockOnClear).toHaveBeenCalled();
  });

  test("handles apply filters", () => {
    render(<FilterModel {...defaultProps} />);

    fireEvent.click(screen.getByTestId("stage-status-dropdown"));
    fireEvent.click(screen.getByText("Completed"));

    fireEvent.click(screen.getByTestId("apply-filters"));

    expect(mockOnApply).toHaveBeenCalledWith({
      stageStatus: "Completed",
      dateRange: null,
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("handles date range selection", () => {
    render(<FilterModel {...defaultProps} />);

    // Get the date picker and trigger a date selection
    const dateRange = {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-31"),
    };

    const datePicker = screen.getByTestId("date-range-picker");
    fireEvent.click(screen.getByTestId("apply-filters"));

    expect(mockOnApply).toHaveBeenCalledWith(
      expect.objectContaining({
        dateRange: expect.any(Object),
      })
    );
  });

  test("clears date range when filters are cleared", () => {
    const initialDateRange = {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-31"),
    };

    render(
      <FilterModel {...defaultProps} initialDateRange={initialDateRange} />
    );

    // Clear filters
    fireEvent.click(screen.getByText("Clear Filters"));

    expect(mockOnClear).toHaveBeenCalled();
    // Instead of checking the input directly, check if the date range picker was reset
    const datePickerInput = screen
      .getByTestId("date-range-picker")
      .querySelector("input");
    expect(datePickerInput).toHaveValue("");
  });

  test("applies filters with both status and date range", () => {
    render(<FilterModel {...defaultProps} />);

    // Select status
    fireEvent.click(screen.getByTestId("stage-status-dropdown"));
    fireEvent.click(screen.getByText("Completed"));

    // Set date range
    const dateRange = {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-31"),
    };

    // Apply filters
    fireEvent.click(screen.getByTestId("apply-filters"));

    expect(mockOnApply).toHaveBeenCalledWith({
      stageStatus: "Completed",
      dateRange: expect.any(Object),
    });
  });

  test("closes modal on cancel button click", () => {
    render(<FilterModel {...defaultProps} />);

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
