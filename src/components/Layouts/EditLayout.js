import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MovieSelector from "./movieSelector";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import RoutesInfoDiv from "../commonComponents/RoutesInfoDiv";
import EditLAyoutPrint from "./EditLAyoutPrint";

const EditLayout = () => {
  const params = useParams();
  const connectionString = process.env.REACT_APP_API_URL;
  const layOutNameRef = useRef();
  const layoutDescriptionRef = useRef();
  const selectedMoviesRef = useRef([]);
  const [allMovies, setAllMovies] = useState([]);
  const [linkMoviesStatus, setLinkMovieStatus] = useState(false);
  const [AllLayoutsData, setAllLayoutsData] = useState(null);
  useEffect(() => {
    const id = params.edit;
    // console.log(id)
    async function fetchMovie() {
      const response = await axios.get(
        `${connectionString}/admin/getLayout/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      //   return;

      if (
        response?.data?.Layout &&
        Object.values(response.data.Layout).length > 0
      ) {
        setAllLayoutsData(response.data.Layout);
      }
    }

    fetchMovie();
  }, []);
  // console.log(selectedMoviesRef)

  const selectedMoviesHandler = (selectedMovies) => {
    selectedMoviesRef.current = selectedMovies;
  };
  const addLayoutHandler = async () => {
    console.log(AllLayoutsData);
    const layoutObj = {
      name: layOutNameRef.current.value,
      Description: layoutDescriptionRef.current.value,
      linkedMovies: selectedMoviesRef.current,
      id: AllLayoutsData?._id,
    };
    // console.log(layoutObj);
    try {
      const layoutResponse = await axios.post(
        `${connectionString}/admin/editLayout`,
        layoutObj,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(layoutResponse);
      toast.success("layout added successfully");
    } catch (err) {
      console.log(err);
      toast.error("something went wrong while creating layout");
    }
  };
  const handleMovieLinking = (e) => {
    setLinkMovieStatus(!linkMoviesStatus);
  };
  // const removeLinkedMovies = async (id) => {
  //   try {
  //     const deleteMoviesResponse = await axios.post(
  //       `${connectionString}/admin/deleteLinkedMovie`,
  //       { movieId: id, LayoutId: AllLayoutsData._id }
  //     );
  //     toast.success("movie unlinked successfully");
  //   } catch (error) {
  //     toast.error("something went wrong");
  //   }
  // };
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll px-4 py-2">
      <RoutesInfoDiv
        mainHeading={"Edit Layout"}
        websiteName={"Reelies"}
        sectionName={"Layout section"}
        currentDir={"Edit Layout"}
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
                defaultValue={AllLayoutsData?.name}
              ></input>
            </div>
            <div className="m-4 font-semibold">
              <p>Description</p>
              <textarea
                className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md"
                ref={layoutDescriptionRef}
                defaultValue={AllLayoutsData?.Description}
              ></textarea>
            </div>
            {/* already fetched linked movie will display here with individual deleting functionality */}

            <EditLAyoutPrint AllLayoutsData={AllLayoutsData} />
            <div className="m-4 font-semibold">
              <FormGroup>
                {" "}
                <FormControlLabel
                  control={<Checkbox />}
                  label="Do you Want to Link Movies now to this layout?"
                  onChange={(e) => handleMovieLinking()}
                  defaultChecked={
                    selectedMoviesRef.current.length > 0 ? true : false
                  }
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
                <MovieSelector
                  getSelectedMovies={selectedMoviesHandler}
                  selectedMovies={AllLayoutsData?.linkedMovies}
                />
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
            <span className="relative font-semibold">Edit Layout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLayout;
