import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sliderSliceACtion } from "../../store/sliderSlice";
import RoutesInfoDiv from "../RoutesInfoDiv";
import Pagination from "../commonComponents/pagination";
import AllSlidersPrint from "./AllSlidersPrint";
import { allSlidersApi, deleteSliderApi } from "../../Api/Slider/SliderApi";
import SearchAndSort from "../commonComponents/searchAndSort";

const AllSliders = () => {
  const connectionString = process.env.REACT_APP_API_URL;
  const [limit, setlimit] = useState(1);
  const [start, setStart] = useState(0);
  const [pageMetaData, setPageMetaData] = useState({
    totalPages: 0,
    current:0,
    limit: 0,
  });
  // const [allSliders, setAllSliders] = useState([]);
  const dispatch = useDispatch();
  const allSliders = useSelector((state) => state.sliderData);
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  useEffect(() => {
    console.log("hello limit", limit);
    // return;
    if (allSliders.length === 0) {
      try {
        (async () => {
          try {
            const res = await allSlidersApi(start, limit);
            console.log(res);
            if (res.data.Slider) {
              Object.values(res.data.Slider).forEach((current) => {
                dispatch(sliderSliceACtion.addSlider(current));
              });
            }
            if (res.data.totalPages) {
              setPageMetaData({
                totalPages: res.data.totalPages,
                current: start,
                limit: limit,
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
  }, [allSliders, dispatch, limit]);
  const deleteSliderHandler = async (id) => {
    try {
      const response = deleteSliderApi(id);
      dispatch(sliderSliceACtion.deleteSlider(id));
      toast.success("movie deleted successfully");
    } catch (err) {
      toast.error("something went wrong");
    }
  };
  const limitHandler = (data) => {
    setlimit(data);
  };
  
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-auto px-4 py-2">
      <RoutesInfoDiv
        mainHeading={"All Sliders"}
        websiteName={"Reelies"}
        sectionName={"Hero section"}
        currentDir={"All Sliders"}
      ></RoutesInfoDiv>
      <section
        className={`w-[100%] ${
          selectedTheme === "modern reeloid"
            ? "bg-black/40 backdrop-blur-lg "
            : "bg-[#2A3042] "
        } py-2  rounded-md`}
      >
        {" "}
        <SearchAndSort limit={limitHandler}></SearchAndSort>
        <div className="flex gap-6 flex-col xl:flex-row">
          <div
            className={`max-[690px]:overflow-auto flex-1 text-gray-200 max-md:overflow-auto py-2`}
          >
            <div className="mx-4 font-normal text-[.9rem] min-w-[768px]">
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
          </div>
        </div>{" "}
        <Pagination metaData={pageMetaData} />
      </section>
    </div>
  );
};

export default AllSliders;
