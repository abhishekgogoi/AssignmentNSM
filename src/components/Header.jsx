import { useState } from "react";
import Group from "../assets/Group 193552.svg";
import HouseSolid from "../assets/house-solid.svg";
import ChevronRight from "../assets/chevron-right.svg";

const Header = ({ onGroupClick }) => {
  const [isRotated, setIsRotated] = useState(false); // Add this state

  const handleClick = () => {
    setIsRotated((prev) => !prev);
    onGroupClick();
  };

  return (
    <div className="bg-white p-4 shadow-sm">
      <div className="flex items-center text-sm text-gray-600">
        <span>
          <button onClick={handleClick} className="mr-2 focus:outline-none">
            <img
              src={Group}
              alt="Group"
              className="transform transition-transform duration-300"
              style={{ transform: isRotated ? "rotate(180deg)" : "rotate(0)" }}
            />
          </button>
        </span>
        <span className="mx-2">
          <img src={HouseSolid} alt="HouseSolid" />
        </span>
        <span>
          <img src={ChevronRight} alt="ChevronRight" />
        </span>
        <span className="mx-2">CLIENT</span>
        <span>
          <img src={ChevronRight} alt="ChevronRight" />
        </span>
        <span className="mx-2">MATTER</span>
        <span>
          <img src={ChevronRight} alt="ChevronRight" />
        </span>
        <span className="mx-2">TRANSACTION DETAIL PAGE</span>
        <span>
          <img src={ChevronRight} alt="ChevronRight" />
        </span>
        <span className="mx-2 font-semibold">TRANSACTION CONTENTS</span>
      </div>
    </div>
  );
};

export default Header;
