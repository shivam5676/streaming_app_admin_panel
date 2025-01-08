import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sliderSliceACtion } from "../../store/sliderSlice";
import RoutesInfoDiv from "../RoutesInfoDiv";
import Pagination from "../commonComponents/pagination";
import AllSlidersPrint from "./AllSlidersPrint";
import { allSlidersApi, deleteSliderApi } from "../../Api/Slider/SliderApi";

const AllSliders = () => {
  const connectionString = process.env.REACT_APP_API_URL;
  // const [allSliders, setAllSliders] = useState([]);
  const dispatch = useDispatch();
  const allSliders = useSelector((state) => state.sliderData);
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  useEffect(() => {
    if (allSliders.length === 0) {
      try {
        (async () => {
          try {
            const res = await allSlidersApi();

            if (res.data.Slider) {
              Object.values(res.data.Slider).forEach((current) => {
                dispatch(sliderSliceACtion.addSlider(current));
              });
            }
          } catch (error) {
            console.log(error);
          }
        })();
      } catch (err) {
        console.log(err);
      }
    }
  }, [allSliders, dispatch]);
  const deleteSliderHandler = async (id) => {
    try {
      const response = deleteSliderApi(id);
      dispatch(sliderSliceACtion.deleteSlider(id));
      toast.success("movie deleted successfully");
    } catch (err) {
      toast.error("something went wrong");
    }
  };
  // const handleSelectChange = (id, event) => {
  //   const action = event.target.value;
  //   console.log(action);
  //   // Reset the select value after handling the event to ensure proper re-rendering
  //   event.target.value = ""; // Reset the value to ensure change is recognized next time

  //   if (action === "DELETE") {
  //     deleteSliderHandler(id);
  //   } else if (action === "EDIT") {
  //     // navigate(`/allLayout/${id}`);
  //   }
  // };
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-auto px-4 py-2">
      <RoutesInfoDiv
        mainHeading={"All Sliders"}
        websiteName={"Reelies"}
        sectionName={"Hero section"}
        currentDir={"All Sliders"}
      ></RoutesInfoDiv>
      <section className="w-[100%]">
        {" "}
        <div className="flex gap-6 flex-col xl:flex-row">
          <div
            className={`max-[690px]:overflow-auto ${
              selectedTheme === "modern reeloid"
                ? "bg-black/40 backdrop-blur-lg "
                : "bg-[#2A3042] "
            } flex-1  rounded-md text-gray-200 max-md:overflow-auto py-2`}
          >
            <div className="m-4 text-[.9rem] font-semibold ">
              <div className="flex justify-between text-white">
                <div className="flex items-center">
                  <p>Show </p>
                  <select
                    className={`${
                      selectedTheme === "modern reeloid"
                        ? "bg-[#2E3648]/70 rounded backdrop-blur-md"
                        : "bg-[#2E3648]"
                    } text-[#959db6] mx-2 px-4 py-1  font-normal`}
                  >
                    <option>10</option>
                    <option>10</option>
                    <option>10</option>
                  </select>
                  <p>results </p>
                </div>
                <div className="flex items-center">
                  <p>search : </p>
                  <input
                    className={`w-[150px] ${
                      selectedTheme === "modern reeloid"
                        ? "bg-[#2E3648]/70 rounded"
                        : "bg-[#2E3648]"
                    } mx-2 p-2`}
                    placeholder="search here..."
                  ></input>
                </div>
              </div>
            </div>
            <div className="m-4 font-normal text-[.9rem] min-w-[768px]">
              <div className="font-semibold flex border-b pb-2 border-gray-500">
                <div className="w-[50px] flex-shrink-0">
                  <p className="p-2">sr</p>
                </div>
                <div className="w-[90px]  flex-shrink-0">
                  <p className="p-2">action</p>
                </div>
                <div className="w-[150px]  flex-shrink-0  mx-8">
                  <p className="p-2">Type</p>
                </div>
                <div className="w-[50%] flex-shrink-1 mx-8">
                  <p className="p-2">Name</p>
                </div>
                <div className="w-[50%] flex-shrink-1 mx-8">
                  <p className="p-2">Links to</p>
                </div>{" "}
                <div className="w-[80px]  flex-shrink-0">
                  <p className="p-2">status</p>
                </div>
              </div>

              <AllSlidersPrint allSliders={allSliders} />
            </div>

            <Pagination />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllSliders;
