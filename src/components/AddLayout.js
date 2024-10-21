import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MovieSelector from "./movieSelector";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { layoutSliceACtion } from "../store/layoutSlice";
import RoutesInfoDiv from "./RoutesInfoDiv";
import SavingLoaderModal from "./savingLoaderModal";

const AddLayout = (req, res, next) => {
  const connectionString = process.env.REACT_APP_API_URL;
  const layOutNameRef = useRef();
  const layoutDescriptionRef = useRef();
  const selectedMoviesRef = useRef([]);
  const [uploadStatusModal, setUploadStatusModal] = useState(false);
  const [successTick, setSuccessTick] = useState("pending");
  const [message, setMessage] = useState(
    " Movie creation is in progress...please wait"
  );
  const [linkMoviesStatus, setLinkMovieStatus] = useState(false);
  const visibleRef = useRef();
  const dispatch = useDispatch();
  const selectedMoviesHandler = (selectedMovies) => {
    console.log("object,", selectedMovies);
    selectedMoviesRef.current = selectedMovies;
  };
  const addLayoutHandler = async () => {
    console.log(selectedMoviesRef);
    setUploadStatusModal(true);
    const layoutObj = {
      name: layOutNameRef.current.value,
      Description: layoutDescriptionRef.current.value,
      linkedMovies: selectedMoviesRef.current,
      visible: visibleRef.current.value,
    };
   
    try {
      const response = await axios.post(
        `${connectionString}/admin/addLayout`,
        layoutObj
      );
      console.log(response,",,,.");
      if (response.data.layoutResponse) {
        dispatch(layoutSliceACtion.addLayout(response.data.layoutResponse));
        setSuccessTick("success");
        setMessage("layout added successfully");
        toast.success("layout added successfully");
      }
    } catch (err) {
      console.log(err);

      setSuccessTick("error");
      if (err.response && err.response.data.msg)
        setMessage(err.response.data.msg);
      toast.error("something went wrong while creating layout");
    }
  };
  const handleMovieLinking = (e) => {
    setLinkMovieStatus(!linkMoviesStatus);
  };
  return (
    <>
      {" "}
      {uploadStatusModal && (
        <SavingLoaderModal
          closeModal={() => {
            setUploadStatusModal(false);
            setMessage(" Slider creation is in progress...please wait");
            setSuccessTick("pending");
          }}
          success={successTick}
          message={message}
        />
      )}
      <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll px-4 py-2">
        <RoutesInfoDiv
          mainHeading={"Add Layout"}
          websiteName={"Reelies"}
          sectionName={"Layout section"}
          currentDir={"Add Layout"}
        ></RoutesInfoDiv>
        <section className="w-[100%]">
          {" "}
          <div className="flex gap-6 flex-col xl:flex-row">
            <div className="bg-[#2A3042] flex-1  rounded-md text-white">
              <div className="m-4 text-[1rem] font-semibold border-b pb-2 border-gray-500 border-spacing-x-3">
                <p>Layout Info</p>
              </div>
              <div className="m-4 font-semibold">
                <p>
                  Title<span className="text-red-500"> *</span>
                </p>

                <input
                  className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md"
                  ref={layOutNameRef}
                ></input>
              </div>
              <div className="m-4 font-semibold">
                <p>Description</p>
                <textarea
                  className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md"
                  ref={layoutDescriptionRef}
                ></textarea>
              </div>
              <div className="p-4 font-semibold w-[100%]">
                <p>Visible</p>

                <select
                  className="w-full h-[40px] bg-[#2E3648] px-2 outline-none text-white rounded-md my-2"
                  ref={visibleRef}
                >
                  <option value={true}>Yes, make it live now</option>
                  <option value={false}>No, will make it live later</option>
                </select>
              </div>
              <div className="m-4 font-semibold">
                <FormGroup>
                  {" "}
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Do you Want to Link Movies now to this layout?"
                    onChange={(e) => handleMovieLinking()}
                  />
                </FormGroup>
                <p className="text-red-500 text-[.8rem]">
                  note * :
                  <span className="text-yellow-400 text-[.75rem]">
                    {" "}
                    You can also Link movies later to any layout
                  </span>
                </p>
              </div>
              {linkMoviesStatus && (
                <div className="m-4 font-semibold">
                  <MovieSelector getSelectedMovies={selectedMoviesHandler} />
                </div>
              )}
            </div>
          </div>
        </section>
        <div className="my-3">
          {" "}
          <div className="flex justify-end w-[100%]">
            <div
              onClick={() => {
                addLayoutHandler();
              }}
              className="relative rounded px-5 py-2.5 overflow-hidden group bg-blue-500  hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300 cursor-pointer"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative font-semibold">Add Layout</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLayout;
