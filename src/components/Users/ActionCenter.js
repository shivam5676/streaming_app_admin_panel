import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import GenreSelector from "../commonComponents/genreSelector";
import LanguageSelector from "../commonComponents/LanguageSelector";

const ActionCenter = (props) => {
  const [reasonSelector, setReasonSelector] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const params = useParams();
  const connectionString = process.env.REACT_APP_API_URL;
  useEffect(() => {
    async function fetchDAta() {
      try {
        const res = await axios.post(
          `${connectionString}/admin/getUserDetails`,
          { id: params.uid }
        );
        setUserDetails(res.data.userDetails);
        toast.success("user fetched successfully");
      } catch (err) {
        console.log(err);
      }
    }
    fetchDAta();
  }, []);
  const reasonSelectorHandler = (e) => {
    // console.log(e.target.value)
    setReasonSelector(e.target.value);
  };
  const genreHAndler = (data) => {
    console.log(data);
  };
  const selectedLanguageHandler = (data) => {
    console.log(data);
  };
  return (
    <div className="bg-[#2E3648] w-[100%] ">
      <div className="bg-[#2E3648] w-[100%] h-[300px] overflow-y-auto overflow-x-hidden">
        <p className="text-white font-bold text-center p-3  text-[1.2rem]">
          Action Center
        </p>
        <div className="flex text-white text-sm font-semibold px-2 py-1">
          <p className=" flex items-center text-[.95rem] text-yellow-400">
            I want to
          </p>
          <form className="max-w-sm ">
            {/* <label for="underline_select" className="sr-only">
                    Underline select
                  </label> */}
            <select
              onChange={reasonSelectorHandler}
              id="underline_select"
              className="block py-2.5 px-2 mx-2 w-full text-sm text-red-400 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option selected className="font-bold " value="null">
                Select Your Query
              </option>{" "}
              <option value="add-mints" className="px-2">
                Add Mints
              </option>
              <option value="remove-mints" className="px-2">
                Remove Mints{" "}
              </option>{" "}
              <option value="activate-membership" className="px-2">
                Activate Premium Membership{" "}
              </option>
              <option value="deactivate-membership" className="px-2">
                DeActivate Premium Membership
              </option>{" "}
              <option value="terminate-account" className="px-2">
                Terminate Account
              </option>{" "}
              <option value="genre-perfernces" className="px-2">
                update Genre Prefences
              </option>{" "}
              <option value="language-preferences" className="px-2">
                update Content language perferences
              </option>
            </select>
          </form>
        </div>
        {reasonSelector === "add-mints" && (
          <>
            <div className="flex items-center text-sm font-semibold px-2 py-2 text-yellow-500">
              <p>
                Reason for Adding Mints <span className="text-red-500">*</span>
              </p>
              <form className="max-w-sm mx-2">
                <label for="underline_select" className="sr-only">
                  Underline select
                </label>
                <select
                  id="underline_select"
                  className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                  <option selected>Choose a Reason</option>
                  <option value="US">Missing Daily Check in Bonus</option>
                  <option value="CA">Others</option>
                </select>
              </form>
            </div>
            <div className="flex text-sm font-semibold px-2  text-yellow-500 py-2">
              <p>
                Amounts (Mints) <span className="text-red-500">*</span>
              </p>
              <input
                className="border-b-2 bg-transparent mx-2 outline-none text-blue-300"
                type="text"
                pattern="[0-9]*"
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/\D/g, ""))
                }
              ></input>
            </div>
            <div className="flex items-end justify-end m-4">
              <div className=" relative inline-flex items-center justify-center  px-6 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="absolute flex text-sm items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                  Submit
                </span>
                <span className="relative invisible">Submit</span>
              </div>
            </div>
          </>
        )}
        {reasonSelector === "remove-mints" && (
          <>
            <div className="flex text-sm font-semibold px-2  text-yellow-500 py-2">
              <p>
                Reason for removing Mints{" "}
                <span className="text-red-500">*</span>
              </p>
              <input
                className="border-b-2 bg-transparent mx-2 outline-none text-blue-300"
                type="text"
              ></input>
            </div>
            <div className="flex text-sm font-semibold px-2  text-yellow-500 py-2">
              <p>
                Amounts (Mints) <span className="text-red-500">*</span>
              </p>
              <input
                className="border-b-2 bg-transparent mx-2 outline-none text-blue-300"
                type="text"
                pattern="[0-9]*"
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/\D/g, ""))
                }
              ></input>
            </div>
            <div className="flex items-end justify-end m-4">
              <div className=" relative inline-flex items-center justify-center  px-6 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="absolute flex text-sm items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                  Submit
                </span>
                <span className="relative invisible">Submit</span>
              </div>
            </div>
          </>
        )}
        {reasonSelector === "activate-membership" && (
          <>
            <div className="flex text-sm font-semibold px-2  text-yellow-500 py-2">
              <p>
                Reason for removing Mints{" "}
                <span className="text-red-500">*</span>
              </p>
              <input
                className="border-b-2 bg-transparent mx-2 outline-none text-blue-300"
                type="text"
              ></input>
            </div>
            <div className="flex text-sm font-semibold px-2  text-yellow-500 py-2">
              <p>
                Time (in months) <span className="text-red-500">*</span>
              </p>
              <input
                className="border-b-2 bg-transparent mx-2 outline-none text-blue-300"
                type="text"
                pattern="[0-9]*"
                placeholder="eg...12 months , 3 months"
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/\D/g, ""))
                }
              ></input>
            </div>
            <div className="flex items-end justify-end m-4">
              <div className=" relative inline-flex items-center justify-center  px-6 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="absolute flex text-sm items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                  Submit
                </span>
                <span className="relative invisible">Submit</span>
              </div>
            </div>
          </>
        )}{" "}
        {reasonSelector === "deactivate-membership" && (
          <>
            <div className="flex text-sm font-semibold px-2  text-yellow-500 py-2">
              <p>
                Reason for Deactivating Account
                <span className="text-red-500">*</span>
              </p>
              <input
                className="border-b-2 bg-transparent mx-2 outline-none text-blue-300"
                type="text"
              ></input>
            </div>

            <div className="flex items-end justify-end m-4">
              <div className=" relative inline-flex items-center justify-center  px-6 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="absolute flex text-sm items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                  Submit
                </span>
                <span className="relative invisible">Submit</span>
              </div>
            </div>
          </>
        )}
        {reasonSelector === "terminate-account" && (
          <>
            <div className="flex text-sm font-semibold px-2  text-yellow-500 py-2">
              <p>
                Reason for Terminating Account
                <span className="text-red-500">*</span>
              </p>
              <input
                className="border-b-2 bg-transparent mx-2 outline-none text-blue-300"
                type="text"
              ></input>
            </div>

            <div className="flex items-end justify-end m-4">
              <div className=" relative inline-flex items-center justify-center  px-6 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="absolute flex text-sm items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                  Submit
                </span>
                <span className="relative invisible">Submit</span>
              </div>
            </div>
          </>
        )}{" "}
        {reasonSelector === "genre-perfernces" && (
          <>
            {/* write genere preferences selector here we will fetch genre regarding to that user only from login list*/}
            <GenreSelector
              selectedGenre={genreHAndler}
              editGenres={props.genres}
            />
            <div className="flex items-end justify-end m-4">
              <div className=" relative inline-flex items-center justify-center  px-6 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="absolute flex text-sm items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                  Submit
                </span>
                <span className="relative invisible">Submit</span>
              </div>
            </div>
          </>
        )}{" "}
        {reasonSelector === "language-preferences" && (
          <>
            {/* write genere preferences selector here we will fetch genre regarding to that user only from login list*/}
            <LanguageSelector
              selectedLanguage={selectedLanguageHandler}
              editGenres={props.languages}
            />
            <div className="flex items-end justify-end m-4">
              <div className=" relative inline-flex items-center justify-center  px-6 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="absolute flex text-sm items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                  Submit
                </span>
                <span className="relative invisible">Submit</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ActionCenter;
