import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CalendarDays2 from "../assets/calender-days-2.svg";

const QuickSelectOption = ({
  label,
  onClick,
  isActive,
  "data-testid": testId,
}) => (
  <button
    onClick={onClick}
    data-testid={testId}
    className={`w-full text-left px-4 py-2 text-sm ${
      isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
    }`}
  >
    {label}
  </button>
);

const Calendar = ({
  month,
  year,
  selectedStartDate,
  selectedEndDate,
  onDateClick,
}) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  const isDateInRange = (date) => {
    if (!selectedStartDate || !selectedEndDate || !date) return false;
    return date >= selectedStartDate && date <= selectedEndDate;
  };

  const isDateSelected = (date) => {
    if (!date) return false;
    return (
      (selectedStartDate && date.getTime() === selectedStartDate.getTime()) ||
      (selectedEndDate && date.getTime() === selectedEndDate.getTime())
    );
  };

  return (
    <div className="grid grid-cols-7 gap-1">
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
        <div key={day} className="text-xs text-gray-500 text-center py-2">
          {day}
        </div>
      ))}
      {days.map((date, index) => (
        <div
          key={index}
          data-testid={
            date ? `date-cell-${date.getDate()}` : `empty-cell-${index}`
          }
          className={`h-8 flex items-center justify-center ${
            !date ? "" : "cursor-pointer"
          }`}
          onClick={() => date && onDateClick(date)}
        >
          {date && (
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full
                ${isDateSelected(date) ? "bg-blue-500 text-white" : ""}
                ${
                  isDateInRange(date) && !isDateSelected(date)
                    ? "bg-blue-50 text-blue-600"
                    : ""
                }
                ${
                  !isDateSelected(date) && !isDateInRange(date)
                    ? "hover:bg-gray-100"
                    : ""
                }
              `}
            >
              {date.getDate()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const DateRangePicker = ({ selectedRange, onDateRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(
    selectedRange?.startDate || null
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    selectedRange?.endDate || null
  );
  const [leftMonth, setLeftMonth] = useState(new Date().getMonth());
  const [leftYear, setLeftYear] = useState(new Date().getFullYear());
  const [rightMonth, setRightMonth] = useState(
    leftMonth === 11 ? 0 : leftMonth + 1
  );
  const [rightYear, setRightYear] = useState(
    leftMonth === 11 ? leftYear + 1 : leftYear
  );
  const [inputValue, setInputValue] = useState("");
  const dropdownRef = useRef(null);

  const quickSelectOptions = [
    { label: "Today", days: 0 },
    { label: "Yesterday", days: 1 },
    { label: "Last 1 Week", days: 7 },
    { label: "Last 1 Month", days: 30 },
    { label: "Last 6 Month", days: 180 },
    { label: "All Time", days: null },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateClick = (date) => {
    if (!selectedStartDate || selectedEndDate) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else {
      if (date < selectedStartDate) {
        setSelectedStartDate(date);
        setSelectedEndDate(selectedStartDate);
      } else {
        setSelectedEndDate(date);
      }
    }
  };

  const moveMonth = (direction) => {
    if (direction === "left") {
      setLeftMonth((prevLeftMonth) => {
        const newLeftMonth = prevLeftMonth === 0 ? 11 : prevLeftMonth - 1;
        const newLeftYear = prevLeftMonth === 0 ? leftYear - 1 : leftYear;

        setRightMonth(newLeftMonth === 11 ? 0 : newLeftMonth + 1);
        setRightYear(newLeftMonth === 11 ? newLeftYear + 1 : newLeftYear);
        setLeftYear(newLeftYear);

        return newLeftMonth;
      });
    } else {
      setLeftMonth((prevLeftMonth) => {
        const newLeftMonth = prevLeftMonth === 11 ? 0 : prevLeftMonth + 1;
        const newLeftYear = prevLeftMonth === 11 ? leftYear + 1 : leftYear;

        setRightMonth(newLeftMonth === 11 ? 0 : newLeftMonth + 1);
        setRightYear(newLeftMonth === 11 ? newLeftYear + 1 : newLeftYear);
        setLeftYear(newLeftYear);

        return newLeftMonth;
      });
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (selectedRange) {
      setSelectedStartDate(selectedRange.startDate || null);
      setSelectedEndDate(selectedRange.endDate || null);
    }
  }, [selectedRange]);

  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      const formattedStartDate = formatDate(selectedStartDate);
      const formattedEndDate = formatDate(selectedEndDate);
      setInputValue(`${formattedStartDate} - ${formattedEndDate}`);
      onDateRangeChange?.({
        startDate: selectedStartDate,
        endDate: selectedEndDate,
      });
    } else {
      setInputValue("");
    }
  }, [selectedStartDate, selectedEndDate]);

  useEffect(() => {
    if (selectedRange === null) {
      setSelectedStartDate(null);
      setSelectedEndDate(null);
      setInputValue("");
    }
  }, [selectedRange]);

  const handleQuickSelect = (days) => {
    if (days === null) {
      setSelectedStartDate(null);
      setSelectedEndDate(null);
      setInputValue("All Time");
    } else {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - days);
      setSelectedStartDate(start);
      setSelectedEndDate(end);
    }
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          placeholder="dd.mm.yyyy - dd.mm.yyyy"
          onClick={() => setIsOpen(true)}
          readOnly
          data-testid="date-range-input"
          className="w-full px-4 py-2 text-gray-500 bg-white border border-gray-200 rounded focus:outline-none placeholder:text-gray-500"
        />
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
          <img
            src={CalendarDays2}
            alt="Calendar"
            className="w-5 h-5"
            data-testid="calendar-icon"
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="flex">
            <div className="w-48 border-r border-gray-200">
              <div className="py-2 px-4 bg-[#1f94ff] border-b border-gray-200">
                <span
                  data-testid="custom-range-text"
                  className="text-sm font-medium text-white"
                >
                  Custom
                </span>
              </div>
              <div className="py-2">
                {quickSelectOptions.map((option) => (
                  <QuickSelectOption
                    key={option.label}
                    label={option.label}
                    onClick={() => handleQuickSelect(option.days)}
                    isActive={false}
                    data-testid={`quick-option-${option.label
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  />
                ))}
              </div>
            </div>

            <div className="p-4">
              <div className="flex space-x-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <button
                      data-testid="previous-month-button"
                      onClick={() => moveMonth("left")}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span
                      data-testid="left-calendar-header"
                      className="text-sm font-medium"
                    >
                      {monthNames[leftMonth]} {leftYear}
                    </span>
                  </div>
                  <Calendar
                    month={leftMonth}
                    year={leftYear}
                    selectedStartDate={selectedStartDate}
                    selectedEndDate={selectedEndDate}
                    onDateClick={handleDateClick}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      data-testid="right-calendar-header"
                      className="text-sm font-medium"
                    >
                      {monthNames[rightMonth]} {rightYear}
                    </span>
                    <button
                      data-testid="next-month-button"
                      onClick={() => moveMonth("right")}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <Calendar
                    month={rightMonth}
                    year={rightYear}
                    selectedStartDate={selectedStartDate}
                    selectedEndDate={selectedEndDate}
                    onDateClick={handleDateClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
