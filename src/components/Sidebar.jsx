import MuamelatLogo from "../assets/Muamelat logo.svg";
import Chart from "../assets/chart-simple.svg";
import Folder3 from "../assets/folder-3.svg";
import FileLines from "../assets/file-lines.svg";
import Envelope from "../assets/envelope.svg";
import File from "../assets/file.svg";
import Sliders from "../assets/sliders.svg";
import Calendar from "../assets/calender-days-2.svg";
import UserCircle from "../assets/user-circle.svg";

const Sidebar = () => {
  const menuItems = [
    { icon: <img src={MuamelatLogo} alt="MuamelatLogo" />, label: "Muamelat" },
    { icon: <img src={Chart} alt="Chart" />, label: "Panorama" },
    { icon: <img src={FileLines} alt="FileLines" />, label: "Muamele" },
    { icon: <img src={Folder3} alt="Folder3" />, label: "Documents" },
    { icon: <img src={Envelope} alt="Envelope" />, label: "E-Mails" },
    { icon: <img src={File} alt="File" />, label: "Reports" },
    { icon: <img src={Sliders} alt="Sliders" />, label: "Management Panel" },
    {
      icon: <img src={Calendar} alt="Calendar" />,
      label: "Transaction Calendar",
    },
  ];

  return (
    <div className="w-20 bg-blue-900 text-white flex flex-col items-center py-4">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`p-3 mb-2 w-full flex flex-col items-center cursor-pointer
                ${item.active ? "bg-blue-800" : "hover:bg-blue-800"}`}
        >
          <span className="text-xl">{item.icon}</span>
          <span className="text-xs text-center mt-1">{item.label}</span>
        </div>
      ))}

      <div className="mt-auto">
        <div
          className="p-3 w-full flex flex-col items-center cursor-pointer hover:bg-blue-800"
          style={{ marginTop: "10rem" }}
        >
          <span>
            <img src={UserCircle} alt="User Profile" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;