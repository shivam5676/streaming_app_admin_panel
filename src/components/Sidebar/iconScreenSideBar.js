import { current } from "@reduxjs/toolkit";
import React, { useRef, useState } from "react";
import { BiSolidCameraMovie, BiSolidCheckboxChecked } from "react-icons/bi";
import { CiSliderVertical } from "react-icons/ci";
import { FaAffiliatetheme } from "react-icons/fa6";
import { GrUserSettings, GrVmMaintenance } from "react-icons/gr";
import { HiOutlineHome } from "react-icons/hi";
import { IoMdAnalytics } from "react-icons/io";
import { IoLanguage, IoLogOutOutline } from "react-icons/io5";
import {
  MdOutlineMovie,
  MdOutlineNotificationAdd,
  MdOutlineSubscriptions,
} from "react-icons/md";
import { RiAdminLine, RiAdvertisementFill } from "react-icons/ri";
import { SiWebflow } from "react-icons/si";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSliceAction } from "../../store/loginSlice";

const IconScreenSideBar = () => {
  const dispatch = useDispatch();
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  const menuRefs = useRef([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const item = ["menu item", "close item"];
  const [position, setPosition] = useState(null);
  const navigate = useNavigate("");
  const handleMouseEnter = (index) => {
    setHoveredItem(index);
    const rect = menuRefs.current[index].getBoundingClientRect(); // Get position of hovered div
    setPosition({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
  };
  console.log(position);
  const menuItems = [
    {
      title: "Dashboard",
      icon: <HiOutlineHome className="h-[20px] w-[20px]" />,
      subItems: [{ name: "Dashboard", navigateTo: "/" }],
    },
    {
      title: "Movies",
      icon: <MdOutlineMovie className="h-[20px] w-[20px]" />,
      subItems: [
        { name: "Add Movies", navigateTo: "/addMovies" },
        { name: "All Movies", navigateTo: "/allMovies" },
      ],
    },
    {
      title: "Hero",
      icon: <GrVmMaintenance className="h-[20px] w-[20px]" />,
      subItems: [
        { name: "Add Slider", navigateTo: "/addSlider" },
        { name: "All Slider", navigateTo: "/allSliders" },
      ],
    },
    {
      title: "Layout",
      icon: <TfiLayoutGrid3 className="h-[20px] w-[20px]" />,
      subItems: [
        { name: "Add Layout", navigateTo: "/addLayout" },
        { name: "All Layout", navigateTo: "/allLayouts" },
      ],
    },
    {
      title: "Movies",
      icon: <BiSolidCameraMovie className="h-[20px] w-[20px]" />,
      subItems: [
        { name: "Add Movie", navigateTo: "/addMovies" },
        { name: "All Movie", navigateTo: "/allMovies" },
      ],
    },

    {
      title: "Web shows",
      icon: <SiWebflow className="h-[20px] w-[20px]" />,
      subItems: [
        { name: "Add Shows", navigateTo: "/addWebShows" },
        { name: "All Shows", navigateTo: "" },
      ],
    },

    {
      title: "Ads",
      icon: <RiAdvertisementFill className="h-[20px] w-[20px]" />,
      subItems: [
        { name: "Add Ads", navigateTo: "" },
        { name: "All Ads", navigateTo: "" },
      ],
    },
    {
      title: "Notification Section",
      icon: <MdOutlineNotificationAdd className="h-[20px] w-[20px]" />,
      subItems: [
        { name: "Add Notification", navigateTo: "/addNotification" },
        { name: "All Notification", navigateTo: "/allNotification" },
      ],
    },
    {
      title: "Users",
      icon: <GrUserSettings className="h-[20px] w-[20px]" />,
      subItems: [
        { name: "Add Users", navigateTo: "" },
        { name: "All Users", navigateTo: "/allUsers" },
      ],
    },
    {
      title: "Movies",
      icon: <RiAdminLine className="h-[20px] w-[20px]" />,
      subItems: [
        { name: "Add Admin", navigateTo: "" },
        { name: "All Admin", navigateTo: "/allAdmin" },
      ],
    },

    {
      title: "Package Plan",
      icon: <MdOutlineSubscriptions className="h-[20px] w-[20px]" />,
      subItems: [
        { name: "Add Package", navigateTo: "/addPackage" },
        { name: "All Package", navigateTo: "/allPackage" },
      ],
    },

    {
      title: "Genres",
      icon: <CiSliderVertical className="h-[20px] w-[20px]" />,
      subItems: [{ name: "Genres", navigateTo: "/GenresList" }],
    },
    ,
    {
      title: "Languages",
      icon: <IoLanguage className="h-[20px] w-[20px]" />,
      subItems: [{ name: "Languages", navigateTo: "/LanguageList" }],
    },
    {
      title: "Checked In Points",
      icon: <BiSolidCheckboxChecked className="h-[20px] w-[20px]" />,
      subItems: [{ name: "Checked In Points", navigateTo: "/CheckedPoints" }],
    },
    {
      title: "Analytics",
      icon: <IoMdAnalytics className="h-[20px] w-[20px]" />,
      subItems: [{ name: "Analytics", navigateTo: "/Analytics" }],
    },
    {
      title: "Theme",
      icon: <FaAffiliatetheme className="h-[20px] w-[20px]" />,
      subItems: [{ name: "Theme", navigateTo: "" }],
    },
    {
      title: "Log Out",
      icon: <IoLogOutOutline className="h-[20px] w-[20px]" />,
      subItems: [
        {
          name: "Log Out",
          navigateTo: "",
          fn: () => {
            localStorage.removeItem("user");
            dispatch(loginSliceAction.logOut());
          },
        },
      ],
    },

    // Add more items as needed
  ];

  return (
    <div
      className={`w-[70px] h-[100%]  z-[100000] ${
        selectedTheme === "Yellow Majestic"
          ? "text-[#FEBD59]"
          : selectedTheme === "modern reeloid"
          ? "bg-black/70 backdrop-blur-sm text-[#FEBD59]"
          : "text-[#A8B2BC]"
      }  pt-4 flex flex-col flex-shrink-0 items-center overflow-y-scroll customScrollbar`}
    >
      {menuItems?.map((item, index) => (
        <div
          key={index}
          ref={(el) => (menuRefs.current[index] = el)}
          className="text-white hover:bg-[#2F374A] w-full cursor-pointer flex items-center p-2 ps-3 relative"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="flex justify-center w-[40px] h-[40px]  rounded-full  items-center text-white font-semibold shadow-[-2px_-2px_5px_rgba(255,_255,_255,_0.8),_5px_5px_5px_rgba(0,_0,_0,_0.25)] transition-all hover:shadow-[-1px_-1px_5px_rgba(96,_165,_250,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(96,_165,_250,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)] hover:text-blue-400">
            {item.icon}
          </div>
          {hoveredItem === index && (
            <div
              className="fixed bg-[#2F374A] text-white px-8 py-2 shadow-lg w-[200px] "
              style={{ top: position.top, left: "66px" }} // Ensure the first item aligns with the icon
            >
              {item.subItems.map((subItem, subIndex) => (
                <p
                  key={subIndex}
                  className="text-[1rem] h-[40px] font-semibold flex items-center"
                  onClick={() => {
                    console.log(subItem);
                    if (subItem.fn) {
                      console.log(subItem.navigateTo, "hello");
                      subItem.fn();
                    }
                    navigate(subItem.navigateTo);
                  }}
                >
                  {subItem.name}
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
