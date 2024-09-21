import React, { useState } from "react";
import { BiSolidCameraMovie } from "react-icons/bi";
import { GrUserSettings, GrVmMaintenance } from "react-icons/gr";
import { HiOutlineHome } from "react-icons/hi";
import { LuLayoutList } from "react-icons/lu";
import {
  MdArrowDropDown,
  MdArrowDropUp,
  MdOutlineAddToQueue,
} from "react-icons/md";
import { RiAdvertisementFill } from "react-icons/ri";
import { SiWebflow } from "react-icons/si";
import { TbCopyPlusFilled } from "react-icons/tb";
import { TfiLayoutAccordionList, TfiLayoutGrid3 } from "react-icons/tfi";
import useWindowSize from "../customHooks/useWindowSize";
import { useNavigate } from "react-router-dom";

const BigScreenSideBar = (props) => {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const [currentMenuOpen, setCurrentMEnuOpen] = useState(null);
  console.log(currentMenuOpen);
  const currentMenuHandler = (value) => {
    setCurrentMEnuOpen(value);
  };
  return (
    <div
      className={`w-[240px] z-[10000] bg-[#2A3142] h-[calc(100vh-70px)] pt-4  overflow-y-auto  ${
        width < 992 ? "absolute flex flex-col" : "flex flex-shrink-0 flex-col"
      }`}
    >
      <div className="mx-4 text-white text-sm h-[30px] flex items-center">
        <p className="text-[.75rem]">MAIN</p>
      </div>
      <div className=" text-white  hover:bg-[#2F374A] cursor-pointer">
        <div
          className="mx-4 h-[50px] flex items-center"
          onClick={() => {
            navigate("/");
          }}
        >
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
                <GrVmMaintenance className="h-[20px] w-[20px]" />
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
              <div
                className="flex h-[40px] items-center cursor-pointer ps-12"
                onClick={() => {
                  navigate("/addSlider");
                }}
              >
                <TbCopyPlusFilled className="mx-2" />
                <p>Add Slider</p>
              </div>

              <div
                className="flex h-[40px] items-center  cursor-pointer ps-12"
                onClick={() => {
                  navigate("/allSliders");
                }}
              >
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
              <div
                className="flex h-[40px] items-center cursor-pointer ps-12"
                onClick={() => {
                  navigate("/addLayout");
                }}
              >
                <MdOutlineAddToQueue className="mx-2" />
                <p>Add Layout</p>
              </div>

              <div
                className="flex h-[40px] items-center  cursor-pointer ps-12"
                onClick={() => {
                  navigate("/allLayouts");
                }}
              >
                <LuLayoutList className="mx-2" />

                <p>All Layouts</p>
              </div>
            </div>
          )}
        </div>
      </section>
      <section>
        <div className="mx-4 text-white text-sm h-[30px] flex items-center">
          <p className="text-[.75rem]">CONTENT</p>
        </div>
        <div>
          <div
            className=" text-white  hover:bg-[#2F374A]  cursor-pointer"
            onClick={() => {
              currentMenuOpen == "Movie Section"
                ? currentMenuHandler(null)
                : currentMenuHandler("Movie Section");
            }}
          >
            <div className="mx-4 h-[50px] flex items-center justify-between">
              <div className="flex">
                {" "}
                <BiSolidCameraMovie className="h-[20px] w-[20px]" />
                <p className="text-[1rem] px-4 font-semibold">Movie Section</p>
              </div>
              {currentMenuOpen == "Movie Section" ? (
                <MdArrowDropUp className="h-[25px] w-[25px]" />
              ) : (
                <MdArrowDropDown className="h-[25px] w-[25px]" />
              )}
            </div>
          </div>
          {currentMenuOpen == "Movie Section" && (
            <div className="font-[.8rem] text-white">
              <div
                className="flex h-[40px] items-center cursor-pointer ps-12"
                onClick={() => {
                  navigate("/addMovies");
                }}
              >
                <TbCopyPlusFilled className="mx-2" />
                <p>Add Movies</p>
              </div>

              <div
                className="flex h-[40px] items-center  cursor-pointer ps-12"
                onClick={() => {
                  navigate("/allMovies");
                }}
              >
                <TfiLayoutAccordionList className="mx-2" />
                <p>All Movies</p>
              </div>
            </div>
          )}
        </div>
        <div>
          <div
            className=" text-white  hover:bg-[#2F374A]  cursor-pointer"
            onClick={() => {
              currentMenuOpen == "Web-shows Section"
                ? currentMenuHandler(null)
                : currentMenuHandler("Web-shows Section");
            }}
          >
            <div className="mx-4 h-[50px] flex items-center justify-between">
              <div className="flex items-center">
                {" "}
                <SiWebflow className="h-[20px] w-[20px]" />
                <p className="text-[1rem] px-4 font-semibold">
                  Web Series Section
                </p>
              </div>
              {currentMenuOpen == "Web-shows Section" ? (
                <MdArrowDropUp className="h-[25px] w-[25px]" />
              ) : (
                <MdArrowDropDown className="h-[25px] w-[25px]" />
              )}
            </div>
          </div>
          {currentMenuOpen == "Web-shows Section" && (
            <div className="font-[.8rem] text-white">
              <div
                className="flex h-[40px] items-center cursor-pointer ps-12"
                onClick={() => {
                  navigate("/addWebShows");
                }}
              >
                <MdOutlineAddToQueue className="mx-2" />
                <p>Add Shows</p>
              </div>

              <div className="flex h-[40px] items-center  cursor-pointer ps-12">
                <LuLayoutList className="mx-2" />

                <p>All Shows</p>
              </div>
            </div>
          )}
        </div>
        <div>
          <div
            className=" text-white  hover:bg-[#2F374A]  cursor-pointer"
            onClick={() => {
              currentMenuOpen == "Ads Section"
                ? currentMenuHandler(null)
                : currentMenuHandler("Ads Section");
            }}
          >
            <div className="mx-4 h-[50px] flex items-center justify-between">
              <div className="flex">
                {" "}
                <RiAdvertisementFill className="h-[20px] w-[20px]" />
                <p className="text-[1rem] px-4 font-semibold">Ads Section</p>
              </div>
              {currentMenuOpen == "Ads Section" ? (
                <MdArrowDropUp className="h-[25px] w-[25px]" />
              ) : (
                <MdArrowDropDown className="h-[25px] w-[25px]" />
              )}
            </div>
          </div>
          {currentMenuOpen == "Ads Section" && (
            <div className="font-[.8rem] text-white">
              <div
                className="flex h-[40px] items-center cursor-pointer ps-12"
                onClick={() => {
                  navigate("/addAds");
                }}
              >
                <MdOutlineAddToQueue className="mx-2" />
                <p>Add Ads</p>
              </div>

              <div className="flex h-[40px] items-center  cursor-pointer ps-12">
                <LuLayoutList className="mx-2" />

                <p>All Ads</p>
              </div>
            </div>
          )}
        </div>
      </section>
      <section>
        <div className="mx-4 text-white text-sm h-[30px] flex items-center">
          <p className="text-[.75rem]">USER MANAGEMENT</p>
        </div>
        <div className=" text-white  hover:bg-[#2F374A]">
          <div className="mx-4 h-[50px] flex items-center">
            <GrUserSettings className="h-[20px] w-[20px]" />
            <p className="text-[1rem] px-4 font-semibold">Users</p>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-4 text-white text-sm h-[30px] flex items-center">
          <p className="text-[.75rem]">OTHERS</p>
        </div>
        <div className=" text-white  hover:bg-[#2F374A]">
          <div
            className="mx-4 h-[50px] flex items-center cursor-pointer"
            onClick={() => {
              navigate("/GenresList");
            }}
          >
            <GrUserSettings className="h-[20px] w-[20px]" />
            <p className="text-[1rem] px-4 font-semibold">Genres</p>
          </div>
          <div
            className="mx-4 h-[50px] flex items-center cursor-pointer"
            onClick={() => {
              navigate("/LanguageList");
            }}
          >
            <GrUserSettings className="h-[20px] w-[20px]" />
            <p className="text-[1rem] px-4 font-semibold">Languages</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BigScreenSideBar;
