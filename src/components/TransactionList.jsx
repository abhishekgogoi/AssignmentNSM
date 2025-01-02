import React, { useState } from "react";
import DocumentDetails from "./DocumentDetails";
import FilterModel from "./FilterModel";
import ChevronDown from "../assets/chevron-down.svg";
import Folder from "../assets/folder.svg";
import Microphone from "../assets/microphone.svg";
import { Search } from "lucide-react";
import Download from "../assets/arrow-down-to-line.svg";
import Filter from "../assets/filter.svg";
import CaretDown from "../assets/caret-down.svg";
import Group from "../assets/Group 193539.svg";
import Group1 from "../assets/Group 193548.svg";
import ChevronRight from "../assets/chevron-right.svg";
import transactionsData from "../data/transactions.json";
import { useTransaction } from "../context/TransactionContext";

const TransactionList = () => {
  const { expandedTransactions, toggleTransaction } = useTransaction();
  const [isDocumentDetailsOpen, setIsDocumentDetailsOpen] = useState(false);
  const [selectedDocStatus, setSelectedDocStatus] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState({
    stageStatus: null,
    dateRange: null,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const { transactions } = transactionsData;

  const handleDocumentClick = (status) => {
    setIsDocumentDetailsOpen(true);
    setSelectedDocStatus(status);
  };

  const handleFilterApply = (filters) => {
    setActiveFilter({
      stageStatus: filters.stageStatus,
      dateRange: filters.dateRange,
    });
    setIsFilterModalOpen(false);
  };

  const handleFilterClear = () => {
    setActiveFilter({ stageStatus: null, dateRange: null });
  };

  const isDateInRange = (date, range) => {
    if (!range || !range.startDate || !range.endDate) return true;

    const transactionDate = new Date(date.split(".").reverse().join("-")); // Convert "dd.mm.yyyy" to Date
    return (
      transactionDate >= range.startDate && transactionDate <= range.endDate
    );
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const statusMatch =
      !activeFilter.stageStatus ||
      transaction.status === activeFilter.stageStatus;

    const dateMatch = isDateInRange(transaction.date, activeFilter.dateRange);

    return statusMatch && dateMatch;
  });

  const searchedTransactions = !searchTerm
    ? filteredTransactions
    : filteredTransactions.filter((transaction) =>
        transaction.phase.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="flex-1 p-4 bg-gray-50">
      <div className="space-y-2">
        {/* Search and filters */}
        <div className="flex items-center justify-between gap-8">
          {/* Left section - Folder dropdown and search in single unified bar */}
          <div className="bg-white rounded-lg shadow flex items-stretch h-10">
            <div className="px-3 flex items-center">
              <img src={Folder} alt="Folder" className="w-4 h-4 mr-2" />
              <select className="appearance-none bg-transparent border-none outline-none w-40">
                <option>All (selected folder)</option>
              </select>
              <img src={ChevronDown} className="w-3 h-3 ml-2" alt="dropdown" />
            </div>

            {/* Full height divider */}
            <div className="w-px bg-gray-200"></div>

            <div className="flex items-center pl-3 w-[32rem]">
              {" "}
              {/* Fixed width for search section */}
              <div className="relative w-full">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search within all folders and content, or a specific folder's content"
                  className="w-full bg-transparent border-none outline-none pl-10 pr-10 text-sm placeholder-gray-500"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <img
                    src={Microphone}
                    alt="Voice Search"
                    className="w-4 h-4 text-gray-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right section - Status, Download, Filter */}
          <div className="flex items-center gap-3">
            <div className="relative bg-white rounded-lg shadow">
              <select
                className="appearance-none h-10 pl-4 pr-10 w-48 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                defaultValue="All Status"
              >
                <option>All Status</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none bg-white rounded-full">
                <img
                  src={ChevronDown}
                  alt="Select"
                  className="w-4 h-4 text-gray-500"
                />
              </div>
            </div>

            {/* Download button in its own container */}
            <button className="h-10 px-3 bg-white shadow border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50">
              <img src={Download} alt="Download" className="w-5 h-5" />
            </button>

            {/* Filter button without background */}
            <button
              className="h-10 px-3 flex items-center justify-center hover:bg-gray-100 rounded-lg"
              onClick={() => setIsFilterModalOpen(true)}
            >
              <img src={Filter} alt="Filter" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-6 px-6 py-3 font-semibold text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <span>#</span>
          </div>

          <div className="flex items-center gap-1 text-gray-600">
            <span>Phase</span>
            <img src={CaretDown} alt="Sort" className="w-4 h-4 opacity-50" />
          </div>

          <div className="flex items-center gap-1 text-gray-600">
            <span>Status</span>
            <img src={CaretDown} alt="Sort" className="w-4 h-4 opacity-50" />
          </div>

          <div className="flex items-center gap-1 text-gray-600">
            <span>Document</span>
            <img src={CaretDown} alt="Sort" className="w-4 h-4 opacity-50" />
          </div>

          <div className="flex items-center gap-1 text-gray-600">
            <span>Responsible Party</span>
            <img src={CaretDown} alt="Sort" className="w-4 h-4 opacity-50" />
          </div>

          <div className="flex items-center gap-1 text-gray-600">
            <span>Update Date</span>
            <img src={CaretDown} alt="Sort" className="w-4 h-4 opacity-50" />
          </div>
        </div>

        {/* Table Content */}
        {searchedTransactions.length > 0 ? (
          searchedTransactions.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow">
              <div
                className={`grid grid-cols-6 px-6 py-4 text-sm relative ${
                  item.hasBlueIndicator
                    ? "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-500"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() => toggleTransaction(item.id)}
                  >
                    <img
                      src={ChevronRight}
                      alt="expand"
                      className={`w-3 h-3 transition-transform ${
                        expandedTransactions.has(item.id)
                          ? "transform rotate-90"
                          : ""
                      }`}
                    />
                  </button>
                  <span className="text-gray-700">{item.id}</span>
                </div>

                <div>
                  <div className="text-gray-700">{item.phase}</div>
                  <div className="text-gray-500 text-xs mt-1">
                    {item.subPhase}
                  </div>
                </div>

                <div className="pt-[10px]">
                  <span
                    className={`px-6 py-1 rounded text-xs text-white ${item.statusColor}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {item.document !== "-" ? (
                    <>
                      <button
                        onClick={() => handleDocumentClick(item.status)}
                        className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded"
                      >
                        <img src={Group1} alt="document" className="w-4 h-4" />
                        <span className="text-gray-700">{item.document}</span>
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-gray-700 bg-gray-50 px-2 py-1 rounded">
                    {item.responsible}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-gray-700">{item.date}</span>
                  <img src={Group} alt="calendar" className="w-4 h-4" />
                </div>
              </div>

              {/* Sub-transactions */}
              {expandedTransactions.has(item.id) &&
                item.subTransactions?.map((subItem) => (
                  <div
                    key={subItem.id}
                    className="grid grid-cols-6 px-6 py-4 text-sm border-t"
                  >
                    <div className="flex items-center gap-3 pl-6">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <img
                          src={ChevronRight}
                          alt="expand"
                          className="w-3 h-3"
                        />
                      </button>
                      <span className="text-gray-700">{subItem.id}</span>
                    </div>

                    <div>
                      <div className="text-gray-700">{subItem.phase}</div>
                      <div className="text-gray-500 text-xs mt-1">
                        {subItem.subPhase}
                      </div>
                    </div>

                    <div className="pt-[10px]">
                      <span
                        className={`px-6 py-1 rounded text-xs text-white ${subItem.statusColor}`}
                      >
                        {subItem.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {subItem.document !== "-" ? (
                        <>
                          <button
                            onClick={() => handleDocumentClick(subItem.status)}
                            className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded"
                          >
                            <img
                              src={Group1}
                              alt="document"
                              className="w-4 h-4"
                            />
                            <span className="text-gray-700">
                              {subItem.document}
                            </span>
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-700 bg-gray-50 px-2 py-1 rounded">
                        {subItem.responsible}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-700">{subItem.date}</span>
                      <img src={Group} alt="calendar" className="w-4 h-4" />
                    </div>
                  </div>
                ))}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No transactions found matching your search
          </div>
        )}
      </div>

      <DocumentDetails
        isOpen={isDocumentDetailsOpen}
        onClose={() => setIsDocumentDetailsOpen(false)}
        status={selectedDocStatus}
      />

      <FilterModel
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleFilterApply}
        onClear={handleFilterClear}
      />
    </div>
  );
};

export default TransactionList;
