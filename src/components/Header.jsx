import Group from "../assets/Group 193552.svg";
import HouseSolid from "../assets/house-solid.svg";
import ChevronRight from "../assets/chevron-right.svg";
import { useSlidingBar } from "../context/SlidingBarContext";

const Header = () => {
  const { isRotated, toggleSlidingBar, isSlidingBarOpen } = useSlidingBar();

  return (
    <div className="bg-white px-4 py-6 shadow-sm">
      <div className="flex items-center text-sm text-gray-600">
        {!isSlidingBarOpen && (
          <span>
            <button
              onClick={toggleSlidingBar}
              className="mr-2 focus:outline-none p-2 hover:bg-white hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)] rounded transition-all duration-200"
            >
              <img
                src={Group}
                alt="Group"
                className="transform transition-transform duration-300"
                style={{
                  transform: isRotated ? "rotate(180deg)" : "rotate(0)",
                }}
              />
            </button>
          </span>
        )}
        <span className="mx-3 ml-5">
          <img src={HouseSolid} alt="HouseSolid" className="w-4 h-4" />
        </span>
        <span>
          <img src={ChevronRight} alt="ChevronRight" />
        </span>
        <span className="mx-3">CLIENT</span>
        <span>
          <img src={ChevronRight} alt="ChevronRight" />
        </span>
        <span className="mx-3">MATTER</span>
        <span>
          <img src={ChevronRight} alt="ChevronRight" />
        </span>
        <span className="mx-3">TRANSACTION DETAIL PAGE</span>
        <span>
          <img src={ChevronRight} alt="ChevronRight" />
        </span>
        <span className="mx-3 font-semibold">TRANSACTION CONTENTS</span>
      </div>
    </div>
  );
};

export default Header;
