import Folder from "../assets/folder.svg";
import CaretDown from "../assets/caret-down.svg";
import FilterBars from "../assets/filter-bars.svg";
import Exclamation from "../assets/exclamation-circle-solid.svg";
import Word from "../assets/word.svg";
import Plus from "../assets/plus-circle-solid.svg";
import stagesData from "../data/stages.json";
import { useTransaction } from "../context/TransactionContext";
import { useSlidingBar } from "../context/SlidingBarContext";
import Group from "../assets/Group 193552.svg";

const SlidingBar = ({ isOpen }) => {
  const { expandedStage, handleStageClick } = useTransaction();
  const { isRotated, toggleSlidingBar } = useSlidingBar();

  const { stages, stats } = stagesData;

  return (
    <div
      data-testid="sliding-bar"
      className={`h-full w-80 bg-white shadow-lg transition-all duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        className="flex items-center pl-4 h-[4.3rem] relative"
        style={{ backgroundColor: "#fbfcfe" }}
      >
        <h2 className="text-lg font-semibold">Transaction Contents</h2>
        {isOpen && (
          <button
            data-testid="sliding-bar-toggle"
            onClick={toggleSlidingBar}
            className="absolute right-4 top-5 focus:outline-none p-2 hover:bg-white hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)] rounded transition-all duration-200"
          >
            <img
              src={Group}
              alt="Group"
              className="transform transition-transform duration-300"
              style={{ transform: isRotated ? "rotate(180deg)" : "rotate(0)" }}
            />
          </button>
        )}
      </div>
      <div className="px-4 py-3 border-b">
        <div className="flex items-center space-x-4">
          <div>
            <span className="text-lg font-medium">{stats.stages}</span>
            <p className="text-xs text-gray-500">Stage</p>
          </div>
          <div className="border-l pl-4">
            <span className="text-lg font-medium">{stats.subfolders}</span>
            <p className="text-xs text-gray-500">Subfolder</p>
          </div>
          <div className="border-l pl-4">
            <span className="text-lg font-medium">{stats.documents}</span>
            <p className="text-xs text-gray-500">Document</p>
          </div>
          <div className="border-l pl-4">
            <img src={FilterBars} alt="Filter" />
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Filter by Client/Matter name</span>
          <img src={FilterBars} alt="Filter" className="cursor-pointer" />
        </div>
      </div>

      <ul className="py-2">
        {stages.map((stage) => (
          <li
            key={stage.id}
            className="border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <button
                onClick={() => handleStageClick(stage.id)}
                className="focus:outline-none"
              >
                <img
                  src={CaretDown}
                  alt="Expand"
                  className={`w-2 h-2 transform transition-transform duration-200 mr-2 
                    ${
                      expandedStage === stage.id
                        ? "rotate-0"
                        : "rotate-[-90deg]"
                    }`}
                />
              </button>
              <img src={Folder} alt="Folder" className="w-6 h-6 mr-2" />
              <span className="text-sm">{stage.name}</span>
              <img
                src={Exclamation}
                alt="Info"
                className="w-4 h-4 ml-auto exclamation-icon"
              />
            </div>

            {expandedStage === stage.id && stage.substages && (
              <ul className="relative">
                {stage.substages.map((substage) => (
                  <li
                    key={substage.id}
                    className="flex items-center py-2 hover:bg-gray-50 relative"
                  >
                    {/* Dotted line connector */}
                    <div className="absolute left-[1.25rem] top-0 h-full border-l border-dotted border-gray-300" />
                    <div className="absolute left-[1.25rem] top-1/2 w-3 border-t border-dotted border-gray-300" />

                    <div className="flex items-center pl-10 w-full pr-4">
                      <img
                        src={substage.type === "word" ? Word : Folder}
                        alt={substage.type}
                        className={`w-6 h-6 mr-2 ${
                          substage.type === "word" ? "word-icon" : ""
                        }`}
                      />
                      <span className="text-sm">{substage.name}</span>
                      <div className="ml-auto flex items-center space-x-2">
                        <img
                          src={Exclamation}
                          alt="Info"
                          className="w-4 h-4 exclamation-icon"
                        />
                        {substage.type === "word" && (
                          <img
                            src={Plus}
                            alt="Add"
                            className="w-4 h-4 plus-icon"
                          />
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SlidingBar;
