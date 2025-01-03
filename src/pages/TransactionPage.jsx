import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TransactionList from "../components/TransactionList";
import RightSidebar from "../components/RightSidebar";
import SlidingBar from "../components/SlidingBar";
import { useSlidingBar } from "../context/SlidingBarContext";

const TransactionPage = () => {
  const { isSlidingBarOpen } = useSlidingBar();

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex">
        <Sidebar />

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

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSlidingBarOpen ? "ml-[20rem]" : "ml-15"
        }`}
      >
        <div>
          <Header />
        </div>

        <div className="flex flex-1 flex-row overflow-auto bg-gray-500 px-6 py-6 gap-4">
          <div className="flex-1">
            <TransactionList />
          </div>
          <div className="flex-shrink-0 -mt-4">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
