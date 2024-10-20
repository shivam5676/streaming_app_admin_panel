import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sliderSliceACtion } from "../store/sliderSlice";
import RoutesInfoDiv from "./RoutesInfoDiv";

const AllSliders = () => {
  const connectionString = process.env.REACT_APP_API_URL;
  // const [allSliders, setAllSliders] = useState([]);
  const dispatch = useDispatch();
  const allSliders = useSelector((state) => state.sliderData);

  useEffect(() => {
    if (allSliders.length === 0){
       try {
      (async () => {
        const res = await axios.get(`${connectionString}/admin/allSliders`);
        console.log(res.data);
        if (res.data.Slider) {
          Object.values(res.data.Slider).forEach((current) => {
            dispatch(sliderSliceACtion.addSlider(current));
          });
        }
      })();
    } catch (err) {
      console.log(err);
    }
    }
   
  }, [allSliders, dispatch]);
  const deleteSliderHandler = async (id) => {
    console.log(id);

    try {
      const response = await axios.delete(
        `${connectionString}/admin/deleteSlider/${id}`
      );
      dispatch(sliderSliceACtion.deleteSlider(id));
      toast.success("movie deleted successfully");
    } catch (err) {}
  };
  const handleSelectChange = (id, event) => {
    const action = event.target.value;
    console.log(action);
    // Reset the select value after handling the event to ensure proper re-rendering
    event.target.value = ""; // Reset the value to ensure change is recognized next time

    if (action === "DELETE") {
      deleteSliderHandler(id);
    } else if (action === "EDIT") {
      // navigate(`/allLayout/${id}`);
    }
  };
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll px-4 py-2">
      
      <RoutesInfoDiv mainHeading={"All Sliders"} websiteName={"Reelies"} sectionName={"Hero section"} currentDir={"All Sliders"}></RoutesInfoDiv>
      <section className="w-[100%]">
        {" "}
        <div className="flex gap-6 flex-col xl:flex-row">
          <div className="bg-[#2A3042] flex-1  rounded-md text-gray-400 max-md:overflow-auto py-2">
            <div className="m-4 text-[.9rem] font-semibold ">
              <div className="flex justify-between text-white">
                <div className="flex items-center">
                  <p>Show </p>
                  <select className="bg-[#2E3648] text-[#959db6] mx-2 px-4 py-1  font-normal">
                    <option>10</option>
                    <option>10</option>
                    <option>10</option>
                  </select>
                  <p>results </p>
                </div>
                <div className="flex items-center">
                  <p>search : </p>
                  <input
                    className="w-[150px] bg-[#2E3648] mx-2 p-2"
                    placeholder="search"
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
              {console.log(allSliders)}
              {allSliders?.length > 0 &&
                allSliders?.map((current, index) => {
                  return (
                    <div className="font-normal flex my-2  border-b border-gray-500">
                      <div className="w-[50px] p-2  flex-shrink-0">
                        <p className="p-2">{index + 1}</p>
                      </div>
                      <div className="w-[90px] text-white font-semibold flex-shrink-0">
                        <select
                          className="bg-[#3C445A] rounded-sm p-2"
                          onChange={(event) => {
                            handleSelectChange(current._id, event);
                          }}
                        >
                          <option
                            value=""
                            // disabled
                            className="border-b-2 border-gray-400"
                          >
                            option
                          </option>
                          <option value="EDIT">EDIT</option>
                          <option value="DELETE">DELETE</option>
                        </select>
                      </div>
                      <div className="w-[150px]  flex-shrink-0  mx-8">
                        <p className="p-2">{current?.type}</p>
                      </div>
                      <div className="w-[50%]  flex-shrink-1 mx-8">
                        <p className="p-2">{current?.schemaName}</p>
                      </div>

                      <div className="w-[50%]  flex-shrink-1 mx-8">
                        <p className="p-2">{current?.linkedMovie?.name}</p>
                      </div>

                      <div className="w-[80px]  flex-shrink-0">
                        {!current.visible ? (
                          <p className="px-2 py-1 font-semibold bg-red-500 rounded-md text-white text-[.8rem] flex justify-center text-center">
                            Not published
                          </p>
                        ) : (
                          <p className="px-2 py-1 font-semibold bg-green-500 rounded-md text-white text-[.8rem] flex justify-center text-center">
                            Published
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
            <section className="flex m-2 text-white text-[.95rem] font-semibold justify-between">
              <p>Showing 1 to 10 of 155 entries</p>
              <div className="flex">
                <p className="border border-gray-500 px-2 py-1">Previous</p>
                <p className="border border-gray-500 px-2 py-1">1</p>
                <p className="border border-gray-500 px-2 py-1">2</p>
                <p className="border border-gray-500 px-2 py-1">3</p>
                <p className="border border-gray-500 px-2 py-1">.......</p>
                <p className="border border-gray-500 px-2 py-1">Next</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllSliders;
