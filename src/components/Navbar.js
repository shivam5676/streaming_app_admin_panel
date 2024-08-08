import React, { useEffect, useRef, useState } from "react";
import iosLogo from "../assests/IOS-Logo-white.png";
import { CgMenu } from "react-icons/cg";
import { FiSend } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
const Navbar = () => {
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

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);
  return (
    <div className="bg-[#36394C] w-[100vw] h-[70px] flex">
      <div className="flex flex-shrink-0 w-[240px] bg-[#2A3142]  text-white h-[100%] items-center justify-center">
        <img src={iosLogo} className="w-[35px] h-[35px]"></img>
        <p className="text-3xl font-semibold mx-2">Reelies </p>
      </div>
      <div className="h-[100%] w-[100%] flex items-center justify-between">
        <CgMenu className="h-[28px] w-[28px] text-white mx-4" />
        <div className="relative inline-block" ref={dropdownRef}>
          <div className="  flex items-center justify-center" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className={`px-8 py-2 rounded-full flex items-center gap-2 text-white font-semibold shadow-[-2px_-2px_5px_rgba(255,_255,_255,_0.8),_5px_5px_5px_rgba(0,_0,_0,_0.25)] transition-all hover:shadow-[-1px_-1px_5px_rgba(96,_165,_250,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(96,_165,_250,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)] hover:text-blue-400`}
            >
              <IoMdAddCircleOutline className="h-[28px] w-[28px]" />

              <span className="text-xl">Create</span>
            </button>
          </div>

          {isOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-[#2A3142] text-white border border-gray-200 rounded shadow-lg">
              <a
                href="#"
                className="block px-4 py-2 text-white hover:text-blue-300 font-semibold hover:bg-gray-700"
              >
                Option 1
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-white hover:text-blue-300 font-semibold hover:bg-gray-700"
              >
                Option 2
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-white hover:text-blue-300 font-semibold hover:bg-gray-700"
              >
                Option 3
              </a>
            </div>
          )}
        </div>{" "}
        <div className="mx-8 flex items-center h-[50px]">
          <div className="text-white border-2 px-2 rounded-xl text-bold mx-3 flex items-center justify-center">
            <input
              placeholder="search box"
              className="bg-transparent  outline-none h-[30px] w-[120px] bg-[#2A3142]"
            ></input>
            <IoSearch className="h-[24px] w-[24px] mx-2" />
          </div>
          <FaRegUserCircle className="h-[35px] w-[35px] text-white" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
