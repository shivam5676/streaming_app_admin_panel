import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { sliderSliceACtion } from "../../store/sliderSlice";
import RoutesInfoDiv from "./../RoutesInfoDiv";
import SavingLoaderModal from "./../savingLoaderModal";
import LinkMovie from "./LinkMovie";
import UploadData from "./uploadData";
import { addSliderApi } from "../../Api/Slider/SliderApi";

const AddSlider = () => {
  const connectionString = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const [sliderType, setSliderType] = useState("Promotional");
  const [uploadStatusModal, setUploadStatusModal] = useState(false);
  const [successTick, setSuccessTick] = useState("pending");
  const [message, setMessage] = useState(
    " Slider creation is in progress...please wait"
  );
  const [promotionalContentType, setpromotionalContentType] =
    useState("Image-upload");
  const sliderNameRef = useRef();
  const sliderTypeRef = useRef();
  const linkedMovieIdRef = useRef();
  const visibleRef = useRef();
  const [allMovies, setAllMovies] = useState([]);
  const promotionalImageRef = useRef();
  const promotionalImageURLRef = useRef();
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  useEffect(() => {
    try {
      (async () => {
        const res = await axios.get(`${connectionString}/admin/allMovies`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        setAllMovies(res.data.allMovies);
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);
  const addSliderHandler = async () => {
    if (
      promotionalContentType === "Image-upload" &&
      sliderType === "Promotional" &&
      !promotionalImageRef?.current?.files[0]
    ) {
      toast.error("plz select a promotional file");
      return;
    }
    if (
      promotionalContentType === "URL" &&
      sliderType === "Promotional" &&
      !promotionalImageURLRef?.current?.value
    ) {
      toast.error("plz enter promotional banner/video url");
      return;
    }
    const sliderObj = {
      name: sliderNameRef.current.value,
      type: sliderTypeRef.current.value,
      movieId: linkedMovieIdRef.current,
    };
    const formdata = new FormData();
    formdata.append("name", sliderNameRef.current.value);
    formdata.append("type", sliderTypeRef.current.value);
    formdata.append("movieId", linkedMovieIdRef.current);
    formdata.append("visible", visibleRef.current.value);
    if (
      promotionalContentType === "Image-upload" &&
      sliderType === "Promotional"
    ) {
      formdata.append("promotionalImage", promotionalImageRef.current.files[0]);
    }
    if (promotionalContentType === "URL" && sliderType === "Promotional") {
      formdata.append(
        "PromotionalImageURL",
        promotionalImageURLRef.current.value
      );
    }

    setUploadStatusModal(true);

    try {
      const response = await addSliderApi(formdata);

      dispatch(sliderSliceACtion.addSlider(response.data));
      setSuccessTick("success");
      setMessage("Slider successfully Created");
      toast.success("slider added successfully");
    } catch (err) {
      console.log(err);
      setSuccessTick("error");
      if (err?.response && err?.response?.data?.msg) {
        setMessage(err?.response?.data?.msg);
      } else {
        setMessage("Something went wrong");
      }
    }
  };

  const handleMoviesSelection = (value) => {
    linkedMovieIdRef.current = value._id;
  };
  const handleSliderTypeChange = (e) => {
    setSliderType(e.target.value);
  };
  const handlePromotionalContentType = (data) => {
    setpromotionalContentType(data);
  };
  return (
    <>
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
          mainHeading={"Add Slider"}
          websiteName={"Reelies"}
          sectionName={"Hero section"}
          currentDir={"Add Slider"}
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
              <div className="m-4 font-semibold">
                <p>
                  Slider Name <span className="text-red-500"> *</span>
                </p>
                <input
                  className="w-full h-[40px] bg-[#2E3648] py-2 px-4 outline-none text-[rgb(107,149,168)] rounded-md"
                  ref={sliderNameRef}
                ></input>
              </div>
              <div className="p-4 font-semibold w-[100%]">
                <p>
                  Slider Type <span className="text-red-500"> *</span>
                </p>

                <select
                  className="w-full h-[40px] bg-[#2E3648]  py-2 px-4 outline-none text-white  rounded-md my-2"
                  onChange={handleSliderTypeChange}
                  ref={sliderTypeRef}
                >
                  <option value={"Promotional"}>Promotional</option>
                  {/*this will not click any things this willl only take and image of promotional conttnt*/}
                  <option value={"Trailer"}>Trailer</option>
                  {/*this will play trailer on click when type will be equal to this and it will take a trailer video or link*/}
                  <option value={"Redirection"}>
                    Redirection(app section)
                  </option>{" "}
                  {/*this will  take an image and also a link for redirection to app and othger things*/}
                </select>
              </div>
              {/* if user select Movies_shorts then this will dropdown all movies  from backend and  thier shorts will be  linked to the slide*/}
              {sliderType == "Trailer" && (
                //   <div className="p-4 font-semibold w-[100%]">
                //     <p>
                //       Link Movie and thier shorts to this Slide{" "}
                //       <span className="text-red-500"> *</span>
                //     </p>
                //     <Autocomplete
                //       onChange={handleMoviesSelection}
                //       disablePortal
                //       options={allMovies}
                //       isOptionEqualToValue={(option, value) =>
                //         option._id === value?._id
                //       }
                //       getOptionLabel={(option) => option.name}
                //       renderInput={(params) => (
                //         <TextField
                //           {...params}
                //           label="Movies list"
                //           InputLabelProps={{
                //             style: { color: "white" },
                //           }}
                //           InputProps={{
                //             ...params.InputProps,
                //             sx: {
                //               "& .MuiOutlinedInput-root": {
                //                 "& fieldset": {
                //                   borderColor: "white",
                //                 },
                //                 "&:hover fieldset": {
                //                   borderColor: "white",
                //                 },
                //                 "&.Mui-focused fieldset": {
                //                   borderColor: "white",
                //                 },
                //               },
                //               color: "white",
                //             },
                //           }}
                //           sx={{
                //             "& .MuiOutlinedInput-root": {
                //               "& fieldset": {
                //                 borderColor: "white",
                //               },
                //               "&:hover fieldset": {
                //                 borderColor: "white",
                //               },
                //               "&.Mui-focused fieldset": {
                //                 borderColor: "white",
                //               },
                //               color: "white",
                //             },
                //             "& .MuiInputBase-input": {
                //               color: "white",
                //             },
                //           }}
                //         />
                //       )}
                //       sx={{ py: 2 }}
                //     />

                //     {/* <select
                //   className="w-full h-[40px]  py-2 px-4 bg-[#2E3648]  outline-none text-white  rounded-md my-2"
                //   // ref={linkedMovieIdRef}
                // >
                //   <option value={1}>tiger 3</option>
                //   <option value={2}>kgf</option>
                //   <option value={1}>indian 2</option>
                // </select> */}
                //   </div>
                <LinkMovie
                  allMovies={allMovies}
                  selectedMovies={handleMoviesSelection}
                />
              )}
              {sliderType == "Promotional" && (
                <UploadData
                  setContentType={handlePromotionalContentType}
                  promotionalContentType={promotionalContentType}
                  promotionalImage={(data) => {
                    promotionalImageURLRef.current = { files: [data] };
                  }}
                  promotionalUrl={(data) => {
                    promotionalImageURLRef.current = { value: data };
                  }}
                />
              )}{" "}
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
            </div>
          </div>{" "}
        </section>
        <div className="my-3">
          {" "}
          <div className="flex justify-end w-[100%]">
            <div
              onClick={() => {
                addSliderHandler();
              }}
              className="relative rounded px-5 py-2.5 overflow-hidden group bg-blue-500  hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300 cursor-pointer"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative font-semibold">Add Slider</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSlider;
