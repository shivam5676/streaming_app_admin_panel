import React, { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const AddSlider = () => {
  const connectionString = process.env.REACT_APP_API_URL;
  const [sliderType, setSliderType] = useState("Promotional");
  const [promotionalContentType, setpromotionalContentType] =
    useState("Image-upload");
  const sliderNameRef = useRef();
  const sliderTypeRef = useRef();
  const linkedMovieIdRef = useRef();
  const visibleRef = useRef();
  const [allMovies, setAllMovies] = useState([]);
  const promotionalImageRef = useRef();
  const promotionalImageURLRef=useRef()
  useEffect(() => {
    try {
      (async () => {
        const res = await axios.get(`${connectionString}/admin/allMovies`);

        setAllMovies(res.data.allMovies);
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);
  const addSliderHandler = async () => {
    // console.log(
    //   // sliderNameRef.current.value,
    //   // sliderTypeRef.current.value,
    //   // linkedMovieIdRef.current,
    //   sliderType,
    //   "........................."
    // );
    // if (sliderNameRef.current.value.length == 0) {
    //   toast.error("please select a valid slider name");
    //   return;
    // }
    // if (sliderTypeRef.current.value.length == 0) {
    //   toast.error("please select a valid movie type");
    //   return;
    // }
    // if(!linkedMovieIdRef.current||!linkedMovieIdRef.current.value||linkedMovieIdRef.current.value.length==0){
    //   toast.error("please select a valid movie")
    //   return
    // }
    // console.log(visibleRef.current.value);
    // return;
    const sliderObj = {
      name: sliderNameRef.current.value,
      type: sliderTypeRef.current.value,
      movieId: linkedMovieIdRef.current,
    };
    const formdata = new FormData();
    formdata.append("name", sliderNameRef.current.value);
    formdata.append("type", sliderTypeRef.current.value);
    formdata.append("movieId",linkedMovieIdRef.current );
    formdata.append("visible", visibleRef.current.value);
    if (
      promotionalContentType === "Image-upload" &&
      sliderType === "Promotional"
    ) {
      formdata.append("promotionalImage",  promotionalImageRef.current.files[0]);
    } if (
      promotionalContentType === "URL" &&
      sliderType === "Promotional"
    ) {
      formdata.append("PromotionalImageURL", promotionalImageURLRef.current.value);
    }
    // console.log(formdata);
    // formdata.forEach((current) => console.log(current));
    // return;
    try {
      const response = await axios.post(
        `${connectionString}/admin/addSlider`,
        formdata
      );
      console.log(response);
      toast.success("slider added successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const handleMoviesSelection = (event, value) => {
    // console.log(value,"...>");
    // return
    linkedMovieIdRef.current = value._id;
  };
  const handleSliderTypeChange = (e) => {
    setSliderType(e.target.value);
  };
  const handlePromotionalContentType = (e) => {
    setpromotionalContentType(e.target.value);
  };
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll px-4 py-2">
      <div className="text-white px-2 py-4 ">
        <p className="text-lg font-bold">Add Slider</p>
        <p className="text-[.95rem] font-semibold">
          <span>Reelisis</span> <span className="mx-2"> &gt; </span>
          <span>Hero section</span>
          <span className="mx-2"> &gt; </span>
          <span>Add Slider</span>
        </p>
      </div>
      <section className="w-[100%]">
        {" "}
        <div className="flex gap-6 flex-col xl:flex-row">
          <div className="bg-[#2A3042] flex-1  rounded-md text-white">
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
                <option value={"Redirection"}>Redirection(app section)</option>{" "}
                {/*this will  take an image and also a link for redirection to app and othger things*/}
              </select>
            </div>
            {/* if user select Movies_shorts then this will dropdown all movies  from backend and  thier shorts will be  linked to the slide*/}
            {sliderType == "Trailer" && (
              <div className="p-4 font-semibold w-[100%]">
                <p>
                  Link Movie and thier shorts to this Slide{" "}
                  <span className="text-red-500"> *</span>
                </p>
                <Autocomplete
                  onChange={handleMoviesSelection}
                  disablePortal
                  options={allMovies}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value?._id
                  }
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Movies list"
                      InputLabelProps={{
                        style: { color: "white" },
                      }}
                      InputProps={{
                        ...params.InputProps,
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "white",
                            },
                            "&:hover fieldset": {
                              borderColor: "white",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "white",
                            },
                          },
                          color: "white",
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                          color: "white",
                        },
                        "& .MuiInputBase-input": {
                          color: "white",
                        },
                      }}
                    />
                  )}
                  sx={{ py: 2 }}
                />

                {/* <select
                className="w-full h-[40px]  py-2 px-4 bg-[#2E3648]  outline-none text-white  rounded-md my-2"
                // ref={linkedMovieIdRef}
              >
                <option value={1}>tiger 3</option>
                <option value={2}>kgf</option>
                <option value={1}>indian 2</option>
              </select> */}
              </div>
            )}
            {sliderType == "Promotional" && (
              <div className="p-4 font-semibold w-[100%] ">
                <p>
                  Link Promotional Content :
                  <span className="text-red-500"> *</span>
                  <select
                    className="bg-transparent mx-4 outline-none border-2 rounded px-2 py-1"
                    onChange={handlePromotionalContentType}
                  >
                    <option className="px-2 bg-[#2E3648]" value="Image-upload">
                      By Image Upload:
                    </option>
                    <option className="px-2 bg-[#2E3648]" value="URL">
                      By URL (pre uploaded Image) :
                    </option>
                  </select>
                </p>
                <div className="my-4">
                  {" "}
                  {promotionalContentType === "Image-upload" && (
                    <input
                      className="w-full h-[40px] bg-[#2E3648] py-2 px-4 outline-none text-[rgb(107,149,168)] rounded-md"
                      ref={promotionalImageRef}
                      type="file"
                    ></input>
                  )}{" "}
                  {promotionalContentType === "URL" && (
                    <input
                      className="w-full h-[40px] bg-[#2E3648] py-2 px-4 outline-none text-[rgb(107,149,168)] rounded-md"
                      ref={promotionalImageURLRef}
                      // type="file"
                      placeholder="Enter the Url address of Image eg...(https://reelies.com/image.jpg"
                    ></input>
                  )}
                </div>{" "}
                {/* if promotional content type will be url then we will show url input box else we will show file input box with thier given key property*/}
              </div>
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
  );
};

export default AddSlider;
