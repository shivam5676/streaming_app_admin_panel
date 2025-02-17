import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import RoutesInfoDiv from "../RoutesInfoDiv";
import { useSelector } from "react-redux";
import { CloseFullscreen } from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "axios";

const AddSubscriptionPlan = () => {
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  const connectionString = process.env.REACT_APP_API_URL;
  const mintsRef = useRef(0);
  const priceRef = useRef(0);
  const descriptionRef = useRef("");
  const saveSubscriptionPlan = async () => {
    // console.log("hello");
    const obj = {
      price: priceRef.current.value,
      quantity: mintsRef.current.value,
      description: descriptionRef.current.valuie,
    };
    try {
      const response = await axios.post(
        `${connectionString}/admin/addSubscriptionPlan`,
        obj
      );

      toast.success("Subscription plan added successfully");
    } catch (err) {
      console.log(err);
      if (err?.response && err?.response?.data?.msg) {
        toast.error(err?.response?.data?.msg);
      }
    }
  };
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll px-4 py-2">
      <RoutesInfoDiv
        mainHeading={"Add Subscription"}
        websiteName={"Reelies"}
        sectionName={"users section"}
        currentDir={"Add Subscription"}
      ></RoutesInfoDiv>
      <section className="w-[100%]">
        {" "}
        <div className="flex gap-6 flex-col xl:flex-row">
          <div
            className={`${
              selectedTheme === "modern reeloid"
                ? "bg-black/40 backdrop-blur-lg"
                : "bg-[#2A3042]"
            } flex-1  rounded-md text-white`}
          >
            <div className="m-4 text-[1rem] font-semibold border-b pb-2 border-gray-500 border-spacing-x-3">
              <p>Layout Info</p>
            </div>
            {/* <div className="m-4 font-semibold">
              <p>
                Duration<span className="text-red-500"> *</span>
              </p>

              <input
                className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md"
                // ref={layOutNameRef}
              ></input>
            </div> */}
            <div className="m-4 font-semibold">
              <p>
                Mints<span className="text-red-500"> *</span>
              </p>

              <input
                className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md"
                ref={mintsRef}
                type="number"
              ></input>
            </div>
            <div className="m-4 font-semibold">
              <p>
                Price ( INR )<span className="text-red-500"> *</span>
              </p>

              <input
                className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md"
                ref={priceRef}
              ></input>
            </div>
            <div className="m-4 font-semibold">
              <p>Description</p>
              <textarea
                className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md"
                ref={descriptionRef}
              ></textarea>
            </div>
          </div>
        </div>
      </section>

      <div className="my-3">
        {" "}
        <div className="flex justify-end w-[100%]">
          <div
            onClick={() => {
              saveSubscriptionPlan();
            }}
            className="relative rounded px-5 py-2.5 overflow-hidden group bg-blue-500  hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300 cursor-pointer"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative font-semibold">
              Add Subscription Plan
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubscriptionPlan;
