import { useState } from "react";
import Filter from "../assets/filter.svg";
import Cross from "../assets/xmark-bold.svg";
import ChevronDown from "../assets/chevron-down.svg";
import DateRangePicker from "./DateRangePicker";

const FilterModel = ({ isOpen, onClose, onApply, onClear }) => {
  const [stageStatus, setStageStatus] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dateRange, setDateRange] = useState(null);

  if (!isOpen) return null;

  const handleApply = () => {
    onApply({ stageStatus, dateRange });
    onClose();
  };

  const handleClear = () => {
    setStageStatus("");
    setDateRange(null);
    onClear();
  };

  const options = [
    { value: "Completed", label: "Completed" },
    { value: "Not Started", label: "Not Started" },
    { value: "Continuing", label: "Continuing" },
  ];

  return (
    <div className="fixed inset-0 z-50">
      <div
        data-testid="modal-overlay"
        className="absolute inset-0 bg-black bg-opacity-20"
        onClick={onClose}
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] bg-white rounded-xl shadow-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <img src={Filter} alt="Filter" className="w-5 h-5" />
            <h2 className="text-base font-semibold">Filters</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleClear}
              className="text-blue-500 text-sm font-medium hover:text-blue-600"
            >
              Clear Filters
            </button>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <img src={Cross} alt="Close" className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Stage Status
              </label>
              <div className="relative">
                <div
                  data-testid="stage-status-dropdown"
                  className="w-full px-4 py-2 text-gray-500 bg-white border border-gray-200 rounded cursor-pointer flex items-center justify-between"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span>
                    {stageStatus
                      ? options.find((opt) => opt.value === stageStatus)?.label
                      : "Choose"}
                  </span>
                  <img
                    src={ChevronDown}
                    alt="Expand"
                    className="w-4 h-4 pointer-events-none"
                  />
                </div>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded mt-1 shadow-lg z-10">
                    {options.map((option, index) => (
                      <div
                        key={option.value}
                        onClick={() => {
                          setStageStatus(option.value);
                          setDropdownOpen(false);
                        }}
                        className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                          index !== options.length - 1
                            ? "border-b border-gray-200"
                            : ""
                        }`}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Responsible Party
              </label>
              <div className="relative">
                <select className="w-full px-4 py-2 text-gray-500 bg-white border border-gray-200 rounded appearance-none focus:outline-none">
                  <option value="">Choose</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <img src={ChevronDown} alt="Expand" className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Date Range
            </label>
            <div className="relative">
              <DateRangePicker
                data-testid="date-range-picker"
                selectedRange={dateRange}
                onDateRangeChange={(range) => setDateRange(range)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 px-6 py-4 border-t bg-white rounded-b-xl">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm border border-gray-300 rounded text-gray-600 hover:text-gray-700 hover:border-gray-400"
          >
            Cancel
          </button>
          <button
            data-testid="apply-filters"
            onClick={handleApply}
            className="px-6 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModel;
