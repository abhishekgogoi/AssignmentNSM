import { render, screen, fireEvent, within } from "@testing-library/react";
import TransactionList from "../components/TransactionList";
import { useTransaction } from "../context/TransactionContext";

jest.mock("../assets/folder.svg", () => "folder-icon");
jest.mock("../assets/chevron-down.svg", () => "chevron-down-icon");
jest.mock("../assets/microphone.svg", () => "microphone-icon");
jest.mock("../assets/arrow-down-to-line.svg", () => "download-icon");
jest.mock("../assets/filter.svg", () => "filter-icon");
jest.mock("../assets/caret-down.svg", () => "caret-down-icon");
jest.mock("../assets/Group 193539.svg", () => "calendar-icon");
jest.mock("../assets/Group 193548.svg", () => "document-icon");
jest.mock("../assets/chevron-right.svg", () => "chevron-right-icon");
jest.mock("lucide-react", () => ({
  Search: () => <div data-testid="search-icon">SearchIcon</div>,
}));

jest.mock("../context/TransactionContext");

jest.mock("../data/transactions.json", () => ({
  transactions: [
    {
      id: 1,
      phase: "İŞLEM DOSYALARI / TRANSACTION",
      subPhase: "4 Sub Phase",
      status: "Continuing",
      statusColor: "bg-yellow-400",
      document: "V6",
      hasBlueIndicator: true,
      responsible: "Goksu Safi Işık Avukatlık...",
      date: "11.12.2022",
    },
    {
      id: 2,
      phase: "Aşama / Phase",
      subPhase: "2 Sub Phase",
      status: "Completed",
      statusColor: "bg-emerald-500",
      document: "-",
      hasBlueIndicator: false,
      responsible: "Goksu Safi Işık Avukatlık...",
      date: "20.12.2022",
      subTransactions: [
        {
          id: "2.1",
          phase: "Aşama / Phase",
          subPhase: "1 Sub Phase",
          status: "Completed",
          statusColor: "bg-emerald-500",
          document: "-",
          hasBlueIndicator: false,
          responsible: "Goksu Safi Işık Avukatlık...",
          date: "30.12.2022",
        },
        {
          id: "2.2",
          phase: "Aşama / Phase",
          subPhase: "1 Sub Phase",
          status: "Completed",
          statusColor: "bg-emerald-500",
          document: "V1.2",
          hasBlueIndicator: false,
          responsible: "Goksu Safi Işık Avukatlık...",
          date: "30.12.2022",
        },
      ],
    },
    {
      id: 3,
      phase: "Aşama / Phase",
      subPhase: "5 Sub Phase",
      status: "Not Started",
      statusColor: "bg-red-500",
      document: "V6",
      hasBlueIndicator: true,
      responsible: "Goksu Safi Işık Avukatlık...",
      date: "20.12.2022",
    },
    {
      id: 4,
      phase: "Aşama / Phase",
      subPhase: "4 Sub Phase",
      status: "Not Started",
      statusColor: "bg-red-500",
      document: "-",
      hasBlueIndicator: false,
      responsible: "Goksu Safi Işık Avukatlık...",
      date: "01.01.2025",
    },
    {
      id: 5,
      phase: "Aşama / Phase",
      subPhase: "1 Sub Phase",
      status: "Not Started",
      statusColor: "bg-red-500",
      document: "-",
      hasBlueIndicator: false,
      responsible: "Goksu Safi Işık Avukatlık...",
      date: "01.01.2025",
    },
    {
      id: 6,
      phase: "Aşama / Phase",
      subPhase: "5 Sub Phase",
      status: "Continuing",
      statusColor: "bg-yellow-400",
      document: "V1",
      hasBlueIndicator: true,
      responsible: "Goksu Safi Işık Avukatlık...",
      date: "11.12.2022",
    },
    {
      id: 7,
      phase: "Aşama / Phase",
      subPhase: "4 Sub Phase",
      status: "Not Started",
      statusColor: "bg-red-500",
      document: "-",
      hasBlueIndicator: false,
      responsible: "Goksu Safi Işık Avukatlık...",
      date: "25.12.2022",
    },
    {
      id: 8,
      phase: "Aşama / Phase",
      subPhase: "1 Sub Phase",
      status: "Undefined",
      statusColor: "bg-gray-500",
      document: "-",
      hasBlueIndicator: false,
      responsible: "Goksu Safi Işık Avukatlık...",
      date: "30.12.2022",
    },
    {
      id: 9,
      phase: "Aşama / Phase",
      subPhase: "5 Sub Phase",
      status: "Continuing",
      statusColor: "bg-yellow-400",
      document: "V1",
      hasBlueIndicator: false,
      responsible: "Goksu Safi Işık Avukatlık...",
      date: "25.12.2022",
    },
  ],
}));

describe("TransactionList", () => {
  beforeEach(() => {
    useTransaction.mockImplementation(() => ({
      expandedTransactions: new Set(),
      toggleTransaction: jest.fn(),
    }));
  });

  test("renders search and filter components", () => {
    render(<TransactionList />);
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("filter-button")).toBeInTheDocument();
    expect(screen.getByTestId("status-select")).toBeInTheDocument();
  });

  test("handles search functionality", () => {
    render(<TransactionList />);
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "İŞLEM DOSYALARI" } });
    expect(
      screen.getByText("İŞLEM DOSYALARI / TRANSACTION")
    ).toBeInTheDocument();
  });

  test("toggles transaction expansion", () => {
    const mockToggle = jest.fn();
    useTransaction.mockImplementation(() => ({
      expandedTransactions: new Set(),
      toggleTransaction: mockToggle,
    }));

    render(<TransactionList />);
    const expandButton = screen.getByTestId("expand-button-1");
    fireEvent.click(expandButton);
    expect(mockToggle).toHaveBeenCalledWith(1);
  });

  test("handles document click", async () => {
    render(<TransactionList />);

    const v6Documents = screen.getAllByText("V6")[0];
    fireEvent.click(v6Documents);

    expect(screen.getByTestId("document-details-modal")).toBeInTheDocument();
  });

  test("opens filter modal", () => {
    render(<TransactionList />);
    const filterButton = screen.getByTestId("filter-button");
    fireEvent.click(filterButton);
    expect(screen.getByTestId("modal-overlay")).toBeInTheDocument();
  });

  test("shows no results message when search has no matches", () => {
    render(<TransactionList />);
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "nonexistent" } });
    expect(
      screen.getByText("No transactions found matching your search")
    ).toBeInTheDocument();
  });

  test("displays basic transaction details correctly", () => {
    render(<TransactionList />);

    const firstTransaction = screen.getByTestId("transaction-1");

    expect(
      within(firstTransaction).getByText("İŞLEM DOSYALARI / TRANSACTION")
    ).toBeInTheDocument();

    const statusBadge = within(firstTransaction).getByText("Continuing");
    expect(statusBadge).toHaveClass("bg-yellow-400");
  });

  test("opens document details when clicking on document button", () => {
    render(<TransactionList />);

    const documentButton = screen.getByTestId("document-button-1");

    fireEvent.click(documentButton);

    expect(screen.getByTestId("document-details-modal")).toBeInTheDocument();

    const statusBadge = within(
      screen.getByTestId("document-details-modal")
    ).getByText("Continuing");
    expect(statusBadge).toBeInTheDocument();
  });
});
