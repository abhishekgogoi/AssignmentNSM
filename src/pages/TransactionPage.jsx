import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TransactionList from "../components/TransactionList";
import RightSidebar from "../components/RightSidebar";
import SlidingBar from "../components/SlidingBar";

const TransactionPage = () => {
  const [isSlidingBarOpen, setSlidingBarOpen] = useState(false);

  const toggleSlidingBar = () => {
    setSlidingBarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar and SlidingBar Wrapper */}
      <div className="relative flex">
        {/* Sidebar */}
        <Sidebar />

        {/* SlidingBar */}
        {isSlidingBarOpen && (
          <div
            className="absolute left-20 top-0 h-full z-10 transition-transform duration-300"
            style={{
              transform: isSlidingBarOpen
                ? "translateX(0)"
                : "translateX(-100%)",
            }}
          >
            <SlidingBar isOpen={isSlidingBarOpen} />
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSlidingBarOpen ? "ml-[20rem]" : "ml-15"
        }`}
      >
        {/* Header */}
        <div className="h-16 bg-white border-b">
          <Header onGroupClick={toggleSlidingBar} />
        </div>

        {/* Transaction List */}
        <div className="flex-1 overflow-auto bg-gray-50 px-6 py-4">
          <TransactionList />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-16 bg-white border-l flex-shrink-0">
        <RightSidebar />
      </div>
    </div>
  );
};

export default TransactionPage;
