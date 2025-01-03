import Word from "../assets/word.svg";
import NoteSticky from "../assets/note-sticky-3.svg";
import Ellipsis from "../assets/ellipsis.svg";
import Cross from "../assets/xmark-bold.svg";
import Profile from "../assets/user-circle.svg";
import ChevronRight from "../assets/chevron-right.svg";
import versionsData from "../data/document-versions.json";

const DocumentDetails = ({ isOpen, onClose, status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-500";
      case "Continuing":
        return "bg-yellow-400";
      case "Not Started":
        return "bg-red-500";
      case "Undefined":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const { versions } = versionsData;

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-[45rem] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Main Container */}
      <div className="flex flex-col h-full">
        {/* Header Section */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          {/* Left side with title */}
          <div className="flex items-center gap-4">
            <div>
              <img src={Word} alt="Word document" className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold">
                  Confidentiality Agreement
                </h2>
                {status && (
                  <span className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${getStatusColor(
                        status
                      )}`}
                    ></div>
                    <span className="text-sm">{status}</span>
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">V. 1.4 (Current Version)</p>
            </div>
          </div>

          {/* Right side with icons */}
          <div className="flex items-center gap-6">
            <button className="p-1 hover:bg-gray-100 rounded">
              <img src={Ellipsis} alt="More options" className="w-5 h-5" />
            </button>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <img src={Cross} alt="Close" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center w-full">
          {/* Left Arrow - Outside the navigation container */}
          <button className="p-2">
            <img
              src={ChevronRight}
              alt="Previous"
              className="w-3 h-3 transform rotate-180 text-gray-500"
            />
          </button>

          {/* Navigation Tabs Container with gray background */}
          <div className="flex-1 bg-gray-50">
            <div className="flex items-center justify-between px-8">
              <button className="px-3 py-3 text-sm text-gray-500 hover:text-gray-700">
                Detail
              </button>
              <button className="px-3 py-3 text-sm text-blue-500 border-b-2 border-blue-500 font-medium">
                Versions
              </button>
              <button className="px-3 py-3 text-sm text-gray-500 hover:text-gray-700">
                Processes
              </button>
              <button className="px-3 py-3 text-sm text-gray-500 hover:text-gray-700">
                Notes
              </button>
              <button className="px-3 py-3 text-sm text-gray-500 hover:text-gray-700">
                Author
              </button>
            </div>
          </div>

          {/* Right Arrow - Outside the navigation container */}
          <button className="p-2">
            <img
              src={ChevronRight}
              alt="Next"
              className="w-3 h-3 text-gray-500"
            />
          </button>
        </div>

        <div className="flex flex-col border-b ml-1">
          <div className="h-px bg-gray-200"></div>
          <div className="px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="bg-gray-200 rounded px-2 py-2">
                <span className="font-medium">4</span>
                <span className="font-medium">Registration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Document Versions List */}
        <div className="flex-1 overflow-auto">
          {versions.map((item, index) => (
            <div
              key={item.version}
              className={`px-6 py-4 border-b ${
                index === 0 ? "bg-gray-200" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex justify-between">
                {/* Left side content */}
                <div className="flex gap-3 flex-1">
                  <img
                    src={Word}
                    alt="Word document"
                    className="w-5 h-5 mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    {/* Version number and type */}
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">
                        V.{item.version}
                      </span>
                      {item.isCurrent && (
                        <span className="text-sm text-gray-500">
                          (Current Version)
                        </span>
                      )}
                      <span className="text-xs text-gray-400">Doc Type</span>
                    </div>

                    {/* Author info */}
                    <div className="flex items-center gap-2 mt-1">
                      <img src={Profile} alt="User" className="w-4 h-4" />
                      <span className="text-sm text-gray-600">
                        {item.author}
                      </span>
                    </div>

                    {/* Last update info */}
                    <div className="mt-1">
                      <div className="text-xs text-gray-400">
                        Last Update:{" "}
                        {item.author.toLowerCase().replace(/ /g, "")}
                      </div>
                      <div className="text-xs text-gray-400">
                        Last Update Date: {item.date}
                      </div>
                    </div>

                    {/* Note section */}
                    <div className="mt-2">
                      <span className="text-sm font-medium">Not:</span>
                      <p className="text-sm text-gray-600 mt-1 pr-4">
                        {item.note}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right side with size and menu */}
                <div className="flex flex-col justify-between items-end ml-4 h-full">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <img
                      src={Ellipsis}
                      alt="More options"
                      className="w-4 h-4"
                    />
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">{item.size}</span>
                    <img src={Word} alt="Word document" className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentDetails;