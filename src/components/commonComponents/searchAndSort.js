import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const SearchAndSort = (props) => {
  const limitRef = useRef();
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  const searchedQueryRef = useRef("");
  const [searchValue, setSearchValue] = useState(""); // Track input state
  const timeoutRef = useRef(null); // Store timeout ID to prevent re-renders

  useEffect(() => {
    // Clear existing timeout on each input change
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout to log value after 5s of inactivity
    timeoutRef.current = setTimeout(() => {
      console.log("Search input after 3s of inactivity:", searchValue);
      props.searchedQuery(searchValue)
    }, 2000);

    // Cleanup function to clear timeout if component unmounts or re-renders
    return () => clearTimeout(timeoutRef.current);
  }, [searchValue]); // Runs whenever searchValue changes
  return (
    <div className="m-4 text-[.9rem] font-semibold ">
      <div className="flex justify-between text-white   max-sm:flex-col">
        <div className="flex items-center">
          <p>Show </p>
          <select
            onChange={(e) => {
              limitRef.current = e.target.value; // Update ref
              props.limit(e.target.value);
            }}
            className={`${
              selectedTheme === "modern reeloid"
                ? "bg-[#2E3648]/70 rounded backdrop-blur-md"
                : "bg-[#2E3648]"
            } text-[#959db6] mx-2 px-4 py-2  font-normal`}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <p>results </p>
        </div>
        <div className="flex items-center  max-sm:my-2">
          <p>Search : </p>
          <input
            className={`w-[150px] ${
              selectedTheme === "modern reeloid"
                ? "bg-[#2E3648]/70 rounded"
                : "bg-[#2E3648]"
            } mx-2 p-2 max-sm:w-[200px]`}
            placeholder="search here..."
            value={searchValue} // Controlled component
            onChange={(e) => setSearchValue(e.target.value)} // Update state on input
          ></input>
        </div>
      </div>
    </div>
  );
};

export default SearchAndSort;
