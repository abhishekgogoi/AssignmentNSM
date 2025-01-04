import House from "../assets/house.svg";
import AlignRight from "../assets/align-right.svg";
import Clipboard from "../assets/clipboard-check-list.svg";
import ClockCircle from "../assets/clock-circle.svg";
import ClipboardPen from "../assets/clipboard-pen.svg";
import Bookmark from "../assets/bookmark.svg";
import Analysis from "../assets/analysis.svg";
import Calendar from "../assets/calender-days-2.svg";
import Reports from "../assets/reports.svg";
import Ellipsis from "../assets/ellipsis.svg";

const RightSidebar = () => {
  const actions = [
    { icon: <img src={House} alt="House" />, label: "Transaction" },
    { icon: <img src={AlignRight} alt="AlignRight" />, label: "Contents" },
    { icon: <img src={Clipboard} alt="Clipboard" />, label: "Tasks" },
    { icon: <img src={ClockCircle} alt="ClockCircle" />, label: "Phases" },
    {
      icon: <img src={ClipboardPen} alt="ClipboardPen" />,
      label: "Sign Tracking",
    },
    {
      icon: <img src={Bookmark} alt="Bookmark" />,
      label: "Critical Info Setting",
    },
    { icon: <img src={Analysis} alt="Analysis" />, label: "Analysis Phases" },
    { icon: <img src={Calendar} alt="Calender" />, label: "Calendars" },
    { icon: <img src={Reports} alt="Reports" />, label: "Activity Log" },
    { icon: <img src={Ellipsis} alt="Ellipsis" /> },
  ];

  return (
    <div
      data-testid="right-sidebar"
      className="w-16 bg-white border-l flex flex-col items-center pt-4 rounded-lg mt-4"
    >
      {actions.map((action, index) => (
        <div key={index}>
          <div
            className={`p-2 cursor-pointer hover:bg-gray-100 rounded w-14 flex flex-col items-center ${
              index !== actions.length - 1 ? "mb-5" : ""
            }`}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              {action.icon}
            </div>
            {action.label && (
              <div className="text-[10px] text-gray-600 text-center mt-1 leading-tight">
                {action.label}
              </div>
            )}
          </div>
          {action.hasSeparator && (
            <div className="w-8 h-px bg-gray-200 my-2 mx-auto" />
          )}
        </div>
      ))}
    </div>
  );
};

export default RightSidebar;
