import { useState } from "react";
import Folder from "../assets/folder.svg";
import CaretDown from "../assets/caret-down.svg";
import FilterBars from "../assets/filter-bars.svg";
import Exclamation from "../assets/exclamation-circle-solid.svg";
import Word from "../assets/word.svg";
import Plus from "../assets/plus-circle-solid.svg";

const SlidingBar = ({ isOpen }) => {
  const [expandedStage, setExpandedStage] = useState(null);

  const stages = [
    { id: 1, name: "Stage 1" },
    {
      id: 2,
      name: "Stage 2",
      substages: [
        { id: 2.1, name: "2.1 Stage", type: "folder" },
        { id: 2.2, name: "2.2 Stage", type: "word" },
      ],
    },
    { id: 3, name: "Stage 3" },
    { id: 4, name: "Stage 4" },
    { id: 5, name: "Stage 5" },
    { id: 6, name: "Stage 6" },
    { id: 7, name: "Stage 7" },
    { id: 8, name: "Stage 8" },
    { id: 9, name: "Stage 9" },
  ];

  const handleStageClick = (stageId) => {
    setExpandedStage(expandedStage === stageId ? null : stageId);
  };

  return (
    <div
      className={`h-full w-80 bg-white shadow-lg transition-all duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header Section */}
      <div className="px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Transaction Contents</h2>
        </div>
        <div className="flex items-center mt-3 space-x-4">
          <div>
            <span className="text-sm font-medium">12</span>
            <p className="text-xs text-gray-500">Stage</p>
          </div>
          <div className="border-l pl-4">
            <span className="text-sm font-medium">23</span>
            <p className="text-xs text-gray-500">Subfolder</p>
          </div>
          <div className="border-l pl-4">
            <span className="text-sm font-medium">1235</span>
            <p className="text-xs text-gray-500">Document</p>
          </div>
          <div className="border-l pl-4">
            <img src={FilterBars} alt="Filter" />
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Filter by Client/Matter name</span>
          <img src={FilterBars} alt="Filter" className="cursor-pointer" />
        </div>
      </div>

      {/* Stages List */}
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
              <img src={Folder} alt="Folder" className="w-4 h-4 mr-2" />
              <span className="text-sm">{stage.name}</span>
              <img
                src={Exclamation}
                alt="Info"
                className="w-4 h-4 ml-auto opacity-70"
              />
            </div>

            {/* Substages */}
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
                        className="w-4 h-4 mr-2"
                      />
                      <span className="text-sm">{substage.name}</span>
                      <div className="ml-auto flex items-center space-x-2">
                        <img
                          src={Exclamation}
                          alt="Info"
                          className="w-4 h-4 opacity-70"
                        />
                        {substage.type === "word" && (
                          <img
                            src={Plus}
                            alt="Add"
                            className="w-4 h-4 opacity-70"
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
