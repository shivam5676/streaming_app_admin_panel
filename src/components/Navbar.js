import React, { useEffect, useRef, useState } from "react";
// import iosLogo from "../assests/IOS-Logo-white.png";
// import logo from "../assests/logo.png"
import logoIcon from "../assests/mobile.png"
import logo from "../assests/reeloid-logo.png"

import { CgMenu } from "react-icons/cg";
import { FiSend } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import useWindowSize from "./../customHooks/useWindowSize";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
const Navbar = (props) => {
  const dispatch=useDispatch()
  const smallSideBArActivated = props.smallSideBarActivated;
  // console.log(props.smallSideBarActivated)
  const { width, height } = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  
  // console.log(width,height)

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);
  return (
    <div className="bg-[#36394C] w-[100vw] h-[70px] flex">
      {!smallSideBArActivated && width >= 992 ? (
        <div className="flex flex-shrink-0 w-[240px]  bg-[#2A3142] text-white  h-[100%] items-center justify-center">
          <img src={logo} className="mt-3 w-[150px] h-[75%]"></img>
         
        </div>
      ) : (
        <div className="flex flex-shrink-0 w-[70px] bg-[#2A3142]  text-white h-[100%] items-center justify-center">
          <img src={logoIcon} className="w-[40px] h-[50px]"></img>
          {/* <p className="text-3xl font-semibold mx-2">Reelies </p> */}
        </div>
      )}
      <div className="h-[100%] w-[100%] flex items-center justify-between pe-8">
        <CgMenu
          className="h-[28px] w-[28px] text-white mx-4 cursor-pointer"
          onClick={() => {
            props.handleSmallSideBar();
          }}
        />
       { <div className="relative inline-block max-[576px]:hidden" ref={dropdownRef}>
          <div className="  flex items-center justify-center" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className={`px-8 py-2 rounded-full flex items-center gap-2 text-white font-semibold shadow-[-2px_-2px_5px_rgba(255,_255,_255,_0.8),_5px_5px_5px_rgba(0,_0,_0,_0.25)] transition-all hover:shadow-[-1px_-1px_5px_rgba(96,_165,_250,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(96,_165,_250,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)] hover:text-blue-400`}
            >
              <IoMdAddCircleOutline className="h-[24px] w-[24px]" />

              <span className="text-md">Create</span>
            </button>
          </div>

          {isOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-[#2A3142] text-white border border-gray-200 rounded shadow-lg">
              <NavLink
                to="/addMovies"
                className="block px-4 py-2 text-white hover:text-blue-300 font-semibold hover:bg-gray-700"
              >
                Add Movies
              </NavLink>
              <NavLink
                to="/addlayout"
                className="block px-4 py-2 text-white hover:text-blue-300 font-semibold hover:bg-gray-700"
              >
                Add Layout
              </NavLink>
              <NavLink
                to="/addSlider"
                className="block px-4 py-2 text-white hover:text-blue-300 font-semibold hover:bg-gray-700"
              >
                Add Slider
              </NavLink>
            </div>
          )}
        </div>}
        <div className=" flex items-center gap-3 ">
          {width >= 992 ? (
            <div className=" text-white  px-2 rounded-xl text-bold  flex items-center justify-center  bg-[#415072]">
              <input
                placeholder="search..."
                className="bg-transparent  outline-none h-[30px] w-[130px] "
              ></input>
              <IoSearch className="h-[20px] w-[20px] mx-2" />
            </div>
          ) : (
            <IoSearch className="h-[20px] w-[20px] mx-2 text-white" />
          )}
          <FaRegUserCircle className="h-[35px] w-[35px] text-white" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
