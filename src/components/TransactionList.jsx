import React, { useState } from "react";
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

const TransactionList = () => {
  const [expandedTransactions, setExpandedTransactions] = useState(new Set());

  const toggleTransaction = (id) => {
    const newExpanded = new Set(expandedTransactions);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedTransactions(newExpanded);
  };

  const transactions = [
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
      date: "11.12.2022",
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
          date: "11.12.2022",
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
          date: "11.12.2022",
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
      date: "11.12.2022",
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
      date: "11.12.2022",
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
      date: "11.12.2022",
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
      date: "11.12.2022",
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
      date: "11.12.2022",
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
      date: "11.12.2022",
    },
  ];

  return (
    <div className="flex-1 p-4">
      <div className="bg-white rounded-lg shadow">
        {/* Search and filters */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center flex-1 gap-4">
            <div className="relative border rounded-md flex items-center px-3 py-2">
              <img src={Folder} alt="Folder" className="w-4 h-4 mr-2" />
              <select className="appearance-none bg-transparent border-none outline-none flex-1">
                <option>All (selected folder)</option>
              </select>
              <img src={ChevronDown} className="w-3 h-3 ml-2" alt="dropdown" />
            </div>
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search within all folders and content, or a specific folder's content"
                className="w-full h-10 pl-10 pr-10 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <img
                  src={Microphone}
                  alt="Voice Search"
                  className="w-5 h-5 text-gray-400 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                className="appearance-none bg-white h-10 pl-4 pr-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                defaultValue="All Status"
              >
                <option>All Status</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <img
                  src={ChevronDown}
                  alt="Select"
                  className="w-4 h-4 text-gray-500"
                />
              </div>
            </div>

            <button className="h-10 px-3 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50">
              <img src={Download} alt="Download" className="w-5 h-5" />
            </button>

            <button className="h-10 px-3 flex items-center justify-center hover:bg-gray-100 rounded-lg">
              <img src={Filter} alt="Filter" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-6 px-6 py-3 font-semibold text-sm border-b">
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
        {transactions.map((item) => (
          <React.Fragment key={item.id}>
            <div
              className={`grid grid-cols-6 px-6 py-4 text-sm bg-white relative ${
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

              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs text-white ${item.statusColor}`}
                >
                  {item.status}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {item.document !== "-" ? (
                  <>
                    <img src={Group1} alt="document" className="w-4 h-4" />
                    <span className="text-gray-700">{item.document}</span>
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
                  className="grid grid-cols-6 px-6 py-4 text-sm bg-white relative border-t border-gray-100 pl-12"
                >
                  <div className="flex items-center gap-3">
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

                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs text-white ${subItem.statusColor}`}
                    >
                      {subItem.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {subItem.document !== "-" ? (
                      <>
                        <img src={Group1} alt="document" className="w-4 h-4" />
                        <span className="text-gray-700">
                          {subItem.document}
                        </span>
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
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
