import React, { useState, useEffect } from "react";
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
import { useTransaction } from "../context/TransactionContext";
import "../App.css";

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
  const [isListening, setIsListening] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //Fetch transactions from backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/transactions/list');
        const data = await response.json();
        setTransactions(data.transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  //Search functionality
  useEffect(() => {
    const searchTransactions = async () => {
      if (!searchTerm) {
        const response = await fetch('http://localhost:5000/api/transactions/list');
        const data = await response.json();
        setTransactions(data.transactions);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(
            `http://localhost:5000/api/transactions/search?search=${encodeURIComponent(searchTerm)}`
        );
        const data = await response.json();
        setTransactions(data.transactions);
      } catch (error) {
        console.error('Error searching transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      searchTransactions();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const startSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  };

  const handleDocumentClick = (status) => {
    setIsDocumentDetailsOpen(true);
    setSelectedDocStatus(status);
  };


  const handleFilterApply = async (filters) => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (filters.stageStatus) {
        params.append('stageStatus', filters.stageStatus);
      }
      if (filters.dateRange?.startDate) {
        params.append('startDate', filters.dateRange.startDate.toISOString());
      }
      if (filters.dateRange?.endDate) {
        params.append('endDate', filters.dateRange.endDate.toISOString());
      }

      const url = `http://localhost:5000/api/transactions/filter?${params.toString()}`;
      const response = await fetch(url);
      const data = await response.json();
      setTransactions(data.transactions);
      setActiveFilter(filters);
      setIsFilterModalOpen(false);
    } catch (error) {
      console.error('Error applying filters:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterClear = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/transactions/list');
      const data = await response.json();
      setTransactions(data.transactions);
      setActiveFilter({ stageStatus: null, dateRange: null });
    } catch (error) {
      console.error('Error clearing filters:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchedTransactions = !searchTerm
    ? transactions
    : transactions.filter((transaction) =>
        transaction.phase.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-8">
        <div className="bg-white rounded-lg shadow flex items-stretch h-10">
          <div className="px-3 flex items-center">
            <img src={Folder} alt="Folder" className="w-4 h-4 mr-2" />
            <select className="appearance-none bg-transparent border-none outline-none w-40">
              <option>All (selected folder)</option>
            </select>
            <img src={ChevronDown} className="w-3 h-3 ml-2" alt="dropdown" />
          </div>

          <div className="w-px bg-gray-200"></div>

          <div className="flex items-center pl-3 w-[32rem]">
            {" "}
            <div className="relative w-full">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={18}/>
              </div>
              <input
                  data-testid="search-input"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search within all folders and content, or a specific folder's content"
                  className="w-full bg-transparent border-none outline-none pl-10 pr-10 text-sm placeholder-gray-500"
              />
              <button
                  onClick={startSpeechRecognition}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <img
                    src={Microphone}
                    alt="Voice Search"
                    className={`w-4 h-4 cursor-pointer microphone-icon ${isListening ? 'microphone-active' : ''}`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 min-w-fit">
          <div className="relative bg-white rounded-lg shadow">
            <select
                data-testid="status-select"
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

          <button className="h-10 w-10 flex-shrink-0 bg-white shadow border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50">
            <img src={Download} alt="Download" className="w-5 h-5" />
          </button>

          <button
            data-testid="filter-button"
            className="h-10 w-10 flex-shrink-0 flex items-center justify-center hover:bg-gray-100 rounded-lg"
            onClick={() => setIsFilterModalOpen(true)}
          >
            <img src={Filter} alt="Filter" className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-6 px-6 py-3 font-semibold text-base">
        <div className="flex items-center gap-1 text-gray-600 ml-2">
          <span>#</span>
        </div>

        <div className="flex items-center gap-1 text-black mr-[20rem]">
          <span>Phase</span>
          <img src={CaretDown} alt="Sort" className="w-2 h-2 opacity-50" />
        </div>

        <div className="flex items-center gap-1 text-black">
          <span>Status</span>
          <img src={CaretDown} alt="Sort" className="w-2 h-2 opacity-50" />
        </div>

        <div className="flex items-center gap-1 text-black">
          <span>Document</span>
          <img src={CaretDown} alt="Sort" className="w-2 h-2 opacity-50" />
        </div>

        <div className="flex items-center gap-1 text-black -ml-12">
          <span>Responsible Party</span>
          <img src={CaretDown} alt="Sort" className="w-2 h-2 opacity-50" />
        </div>

        <div className="flex items-center gap-1 text-black">
          <span>Update Date</span>
          <img src={CaretDown} alt="Sort" className="w-2 h-2 opacity-50" />
        </div>
      </div>

      {isLoading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : (
      <div className="flex-1 pb-4 space-y-2">
        {searchedTransactions.length > 0 ? (
          searchedTransactions.map((item) => (
            <div
              key={item.id}
              data-testid={`transaction-${item.id}`}
              className="bg-white rounded-lg shadow"
            >
              <div
                className={`grid grid-cols-6 px-6 py-4 text-sm relative ${
                  item.document !== "-" ? "blue-ribbon-container" : ""
                }`}
              >
                {item.document !== "-" && <div className="blue-ribbon"></div>}
                <div className="flex items-center gap-3">
                  <button
                    data-testid={`expand-button-${item.id}`}
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
                  <div className="text-gray-700 mr-10 truncate max-w-[200px]">
                    {item.phase}
                  </div>
                  <div className="text-gray-500 text-xs mt-1 mr-10 truncate max-w-[200px]">
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
                        data-testid={`document-button-${item.id}`}
                        onClick={() => handleDocumentClick(item.status)}
                        className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded"
                      >
                        <img
                          src={Group1}
                          alt="document"
                          className={`w-6 h-6 ${
                            item.status === "Not Started"
                              ? "group1-custom-color-1"
                              : "group1-custom-color"
                          }`}
                        />
                        <span style={{ color: "#226fea" }}>
                          {item.document}
                        </span>
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="text-gray-700 px-2 py-1 rounded truncate -ml-12"
                    style={{ backgroundColor: "#f0f4f9" }}
                  >
                    {item.responsible}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <img
                    src={Group}
                    alt="calendar"
                    className="w-8 h-8 group-custom-color"
                  />
                  <span className="text-gray-700">{item.date}</span>
                </div>
              </div>

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
                      <div className="text-gray-700 mr-10 truncate max-w-[200px]">
                        {subItem.phase}
                      </div>
                      <div className="text-gray-500 text-xs mt-1 mr-10 truncate max-w-[200px]">
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
                              className="w-6 h-6 group1-custom-color"
                            />
                            <span style={{ color: "#226fea" }}>
                              {subItem.document}
                            </span>
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-700 bg-gray-50 px-2 py-1 rounded truncate -ml-12">
                        {subItem.responsible}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <img
                        src={Group}
                        alt="calendar"
                        className="w-8 h-8 group-custom-color"
                      />
                      <span className="text-gray-700">{subItem.date}</span>
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
      )}

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
