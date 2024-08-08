import React, { useState } from "react";
import { HiOutlineHome } from "react-icons/hi";
import { LuLayoutList } from "react-icons/lu";
import { MdArrowDropDown, MdArrowDropUp, MdOutlineAddToQueue } from "react-icons/md";
import { TbCopyPlusFilled } from "react-icons/tb";
import { TfiLayoutAccordionList, TfiLayoutGrid3 } from "react-icons/tfi";

const BigScreenSideBar = () => {
  const [currentMenuOpen, setCurrentMEnuOpen] = useState(null);
  console.log(currentMenuOpen);
  const currentMenuHandler = (value) => {
    setCurrentMEnuOpen(value);
  };
  return (
    <div className="w-[240px] bg-[#2A3142] h-[100%] pt-4">
      <div className="mx-4 text-white text-sm h-[30px] flex items-center">
        <p className="text-[.75rem]">MAIN</p>
      </div>
      <div className=" text-white  hover:bg-[#2F374A]">
        <div className="mx-4 h-[50px] flex items-center">
          <HiOutlineHome className="h-[20px] w-[20px]" />
          <p className="text-[1rem] px-4 font-semibold">Dashboard</p>
        </div>
      </div>
      <section>
        <div className="mx-4 text-white text-sm h-[30px] flex items-center">
          <p className="text-[.75rem]">DESIGN</p>
        </div>
        <div>
          <div
            className=" text-white  hover:bg-[#2F374A]  cursor-pointer"
            onClick={() => {
              currentMenuOpen == "Hero Section"
                ? currentMenuHandler(null)
                : currentMenuHandler("Hero Section");
            }}
          >
            <div className="mx-4 h-[50px] flex items-center justify-between">
              <div className="flex">
                {" "}
                <HiOutlineHome className="h-[20px] w-[20px]" />
                <p className="text-[1rem] px-4 font-semibold">Hero Section</p>
              </div>
              {currentMenuOpen == "Hero Section" ? (
                <MdArrowDropUp className="h-[25px] w-[25px]" />
              ) : (
                <MdArrowDropDown className="h-[25px] w-[25px]" />
              )}
            </div>
          </div>
          {currentMenuOpen == "Hero Section" && (
            <div className="font-[.8rem] text-white">
              <div className="flex h-[40px] items-center cursor-pointer ps-12">
                <TbCopyPlusFilled className="mx-2" />
                <p>Add Slider</p>
              </div>

              <div className="flex h-[40px] items-center  cursor-pointer ps-12">
                <TfiLayoutAccordionList className="mx-2" />
                <p>All Sliders</p>
              </div>
            </div>
          )}
        </div>
        <div>
          <div
            className=" text-white  hover:bg-[#2F374A]  cursor-pointer"
            onClick={() => {
              currentMenuOpen == "Layout Manager"
                ? currentMenuHandler(null)
                : currentMenuHandler("Layout Manager");
            }}
          >
            <div className="mx-4 h-[50px] flex items-center justify-between">
              <div className="flex">
                {" "}
                <TfiLayoutGrid3 className="h-[20px] w-[20px]" />
                <p className="text-[1rem] px-4 font-semibold">Layout Manager</p>
              </div>
              {currentMenuOpen == "Layout Manager" ? (
                <MdArrowDropUp className="h-[25px] w-[25px]" />
              ) : (
                <MdArrowDropDown className="h-[25px] w-[25px]" />
              )}
            </div>
          </div>
          {currentMenuOpen == "Layout Manager" && (
            <div className="font-[.8rem] text-white">
              <div className="flex h-[40px] items-center cursor-pointer ps-12">
                <MdOutlineAddToQueue className="mx-2" />
                <p>Add Layout</p>
              </div>

              <div className="flex h-[40px] items-center  cursor-pointer ps-12">
                <LuLayoutList className="mx-2" />
                

                <p>All Layouts</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BigScreenSideBar;
