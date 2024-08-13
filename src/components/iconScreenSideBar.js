import React, { useState } from "react";
import { BiSolidCameraMovie } from "react-icons/bi";
import { GrUserSettings, GrVmMaintenance } from "react-icons/gr";
import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineMovie } from "react-icons/md";
import { RiAdvertisementFill } from "react-icons/ri";
import { SiWebflow } from "react-icons/si";
import { TfiLayoutGrid3 } from "react-icons/tfi";

const IconScreenSideBar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const item = ["menu item", "close item"];
  const menuItems = [
    {
      title: "Dashboard",
      icon: <HiOutlineHome className="h-[20px] w-[20px]" />,
      subItems: ["Dashboard"],
    },
    {
      title: "Movies",
      icon: <MdOutlineMovie className="h-[20px] w-[20px]" />,
      subItems: ["Add Movies", "All Movies"],
    },
    {
      title: "Hero",
      icon: <GrVmMaintenance className="h-[20px] w-[20px]" />,
      subItems: ["Add Slider", "All Slider"],
    },
    {
      title: "Layout",
      icon: <TfiLayoutGrid3 className="h-[20px] w-[20px]" />,
      subItems: ["Add Layout", "All Layout"],
    },
    {
      title: "Movies",
      icon: <BiSolidCameraMovie className="h-[20px] w-[20px]" />,
      subItems: ["Add Movie", "All Movie"],
    },
    ,
    {
      title: "Web shows",
      icon: <SiWebflow className="h-[20px] w-[20px]" />,
      subItems: ["Add Shows", "All Shows"],
    },
    ,
    {
      title: "Ads",
      icon: <RiAdvertisementFill className="h-[20px] w-[20px]" />,
      subItems: ["Add Ads", "All Ads"],
    },
    ,
    {
      title: "Users",
      icon: <GrUserSettings className="h-[20px] w-[20px]" />,
      subItems: ["Users"],
    },
    // Add more items as needed
  ];

  return (
    <div className="w-[70px] h-[100%] bg-[#2A3142]  pt-4 flex flex-col flex-shrink-0 items-center">
      {menuItems?.map((item, index) => (
        <div
          key={index}
          className="text-white hover:bg-[#2F374A] w-full cursor-pointer flex items-center p-2 ps-3 relative"
          onMouseEnter={() => setHoveredItem(index)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="flex justify-center w-[40px] h-[40px]  rounded-full  items-center text-white font-semibold shadow-[-2px_-2px_5px_rgba(255,_255,_255,_0.8),_5px_5px_5px_rgba(0,_0,_0,_0.25)] transition-all hover:shadow-[-1px_-1px_5px_rgba(96,_165,_250,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(96,_165,_250,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)] hover:text-blue-400">
            {item.icon}
          </div>
          {hoveredItem === index && (
            <div
              className="absolute bg-[#2F374A] text-white px-8 py-2 shadow-lg w-[200px] "
              style={{ top: 0, left: "70px" }} // Ensure the first item aligns with the icon
            >
              {item.subItems.map((subItem, subIndex) => (
                <p
                  key={subIndex}
                  className="text-[1rem] h-[40px] font-semibold flex items-center"
                >
                  {subItem}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default IconScreenSideBar;
