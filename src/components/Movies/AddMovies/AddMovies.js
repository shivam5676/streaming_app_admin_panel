import React, { useRef, useState } from "react";
import DragNDropImage from "../../DragNDropImage";
import LayoutSelector from "../../layoutSelector";
import axios from "axios";

import DragNDropVideos from "../../dragNDropVideos";

import GenreSelector from "../../genreSelector";

import LanguageSelector from "../../LanguageSelector";
import { useDispatch, useSelector } from "react-redux";
import { movieSliceACtion } from "../../../store/movieSlice";
import RoutesInfoDiv from "../../RoutesInfoDiv";
import SavingLoaderModal from "../../savingLoaderModal";

import personalisedAds from "../../../assests/personalise_Ads.jpg";
import SortableAndSelectedMoviesPrint from "./SortableAndSelectedMoviesPrint";

import ThumbnailPreview from "./ThumbnailPreview";

const AddMovies = () => {
  const [uploadStatusModal, setUploadStatusModal] = useState(false);
  const [successTick, setSuccessTick] = useState("pending");
  const [message, setMessage] = useState(
    " Movie creation is in progress...please wait"
  );
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  const titleRef = useRef();
  const [videoFiles, setvideoFiles] = useState([]);
  const [videoFilesSnapshot, setVideoFilesSnapshot] = useState([]);
  const [thumbnailUrlPreview, setThumbNailUrlPreview] = useState(null);
  const genreRef = useRef(); //contains multiple layout where we want to show our movies and related shorts
  const languageRef = useRef();
  const layOutArrayRef = useRef(); //contains multiple layout where we want to show our movies and related shorts

  const [trailerType, setTrailerType] = useState("Upload");
  const thumbnailRef = useRef(); //contains object for thumbnail file ,initially it will be null
  // let thumbNail = null;

  const freeVideosRef = useRef();
  const visibleRef = useRef();
  const moviesTrailerVideoRef = useRef();
  const moviesTrailerVideoLinkRef = useRef();
  const connectionString = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const addMoviesHandler = async () => {
    const adContent = "Personalized Ad Content"; // You can customize this
    const adBlob = new Blob([adContent], { type: "text/plain" });
    const adFile = new File([adBlob], "Personalised_Ad.txt", {
      type: "text/plain",
    });

    setUploadStatusModal(true);
    const formdata = new FormData();
    formdata.append("thumbnail", thumbnailRef.current);
    videoFiles.forEach((current) => {
      if (current.name == "Personalised Ads") {
        return formdata.append("shorts", adFile);
      }
      return formdata.append("shorts", current);
    });
    formdata.append("title", titleRef.current.value);
    formdata.append("layouts", JSON.stringify(layOutArrayRef.current));
    formdata.append("freeVideos", freeVideosRef.current.value);
    formdata.append("visible", visibleRef.current.value);
    formdata.append("genre", JSON.stringify(genreRef.current));
    formdata.append("language", JSON.stringify(languageRef.current) || []);

    if (moviesTrailerVideoRef?.current?.value) {
      formdata.append("trailerVideo", moviesTrailerVideoRef.current.files[0]);
    }
    if (moviesTrailerVideoLinkRef?.current?.value) {
      formdata.append("trailerUrl", moviesTrailerVideoLinkRef.current.value);
    }
    try {
      const response = await axios.post(
        `${connectionString}/admin/addMovie`,
        formdata,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.movieData) {
        dispatch(movieSliceACtion.addMovie(response.data.movieData));
      }
      setSuccessTick("success");
      setMessage("movie added successfully");
      // toast.success("movie added successfully");
    } catch (err) {
      console.log(err);
      setSuccessTick("error");
      if (err.response && err.response.data.msg)
        setMessage(err.response.data.msg);
    }
  };
  function addAdsInShortHandler() {
    setvideoFiles((prev) => [...prev, { name: "Personalised Ads" }]);
    setVideoFilesSnapshot((prev) => [...prev, personalisedAds]);
  }
  const selectionHandler = (value) => {
    layOutArrayRef.current = value;
  };
  const GenreHandler = (value) => {
    genreRef.current = value;
  };
  const languageHandler = (value) => {
    languageRef.current = value;
  };
  const getThumbnail = (thumbnail) => {
    console.log(thumbnail);
    thumbnailRef.current = thumbnail;
    // console.log(thumbnailRef)
    if (thumbnail != null) {
      const objectUrlCreation = URL.createObjectURL(thumbnail);

      setThumbNailUrlPreview(objectUrlCreation);
    }
  };

  const getVideoFilesHandler = (videoFiles) => {
    Object.values(videoFiles).forEach((current) => {
      const videoFile = current;
      const videoURL = URL.createObjectURL(videoFile);
      const videoElement = document.createElement("video");

      videoElement.src = videoURL;
      videoElement.muted = true;
      videoElement.playsInline = true;
      videoElement.crossOrigin = "anonymous";

      // Take the snapshot as soon as the video can play
      videoElement.onloadedmetadata = () => {
        // Seek to the 1st second (or 0 if you want the very first frame)
        videoElement.currentTime = 0.4;
      };

      videoElement.onseeked = () => {
        const canvas = document.createElement("canvas");
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const context = canvas.getContext("2d");

        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const snapshot = canvas.toDataURL("image/png");
        setVideoFilesSnapshot((prev) => {
          return [...prev, snapshot];
        });

        URL.revokeObjectURL(videoURL); // Clean up
      };
      setvideoFiles((prev) => {
        return [...prev, current];
      });
    });
  };

  const deleteVideoHandler = (id) => {
    const allVideos = [...videoFiles];
    const allSnapshots = [...videoFilesSnapshot];
    const videosAfterDeletion = allVideos.filter(
      (current, index) => index != id
    );
    const snapshotsAfterDeletion = allSnapshots.filter(
      (current, index) => index != id
    );
    setVideoFilesSnapshot(snapshotsAfterDeletion);
    setvideoFiles(videosAfterDeletion);
  };
  const handletrailerTypeChange = (e) => {
    setTrailerType(e.target.value);
  };

  const handleSort = (newList) => {
    const newVideoFiles = newList.map((item, index) => videoFiles[item.id]);
    const newSnapshots = newList.map(
      (item, index) => videoFilesSnapshot[item.id]
    );
    setvideoFiles(newVideoFiles);
    setVideoFilesSnapshot(newSnapshots);
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
      <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-auto px-4 py-2 customScrollbar">
        <RoutesInfoDiv
          mainHeading={"Add Movies"}
          websiteName={"Reelies"}
          sectionName={"Movies section"}
          currentDir={"Add Movies"}
        ></RoutesInfoDiv>
        <section className="w-[100%] ">
          <div className="flex gap-6 flex-col xl:flex-row">
            <div
              className={`${
                selectedTheme === "modern reeloid"
                  ? "bg-black/40 backdrop-blur-lg"
                  : "bg-[#2A3042]"
              } flex-1  rounded-md text-white`}
            >
              <div className="m-4 text-[1rem] font-semibold border-b pb-2 border-gray-500 border-spacing-x-3">
                <p>Movie Info</p>
              </div>
              <div className="m-4 font-semibold">
                <p>Title</p>
                <input
                  className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md font-normal"
                  placeholder="Write here"
                  ref={titleRef}
                ></input>
              </div>
              <div className="m-4 font-semibold">
                <p>Select Layout</p>
                <LayoutSelector selectedArray={selectionHandler} />
                {/* <input className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md"></input> */}
              </div>
              <div className="flex sm:flex-row flex-col">
                <div className="p-4 font-semibold w-[100%] sm:w-[50%]">
                  <p>Free Videos</p>

                  <input
                    defaultValue="0"
                    className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)]  rounded-md my-2"
                    ref={freeVideosRef}
                  ></input>
                </div>
                <div className="p-4 font-semibold w-[100%] sm:w-[50%]">
                  <p>Visible</p>

                  <select
                    className="w-full h-[30px] bg-[#2E3648] px-2 outline-none text-white rounded-md my-2"
                    ref={visibleRef}
                  >
                    <option value={true}>Yes, make it live</option>
                    <option value={false}>No, will make it live later</option>
                  </select>
                </div>
              </div>
              <div className="flex sm:flex-row flex-col">
                <div className="p-4 font-semibold w-[100%]">
                  <p>Content Language:</p>
                  <LanguageSelector selectedLanguage={languageHandler} />
                </div>
              </div>
              <div className="flex sm:flex-row flex-col">
                <div className="p-4 font-semibold w-[100%]">
                  <p>Movie Type ( Genre )</p>
                  <GenreSelector selectedGenre={GenreHandler} />
                </div>
              </div>{" "}
            </div>
            <div
              className={`${
                selectedTheme === "modern reeloid"
                  ? "bg-black/40 backdrop-blur-lg"
                  : "bg-[#2A3042]"
              } flex-1  rounded-md text-white`}
            >
              <div className="m-4 text-[1rem] font-semibold border-b pb-2 border-gray-500 border-spacing-x-3">
                <p>Additional Info</p>
              </div>
              <div className="m-4 font-semibold">
                <p>Thumbnail</p>
                <div className="flex flex-col-reverse sm:flex-row w-[100%] py-4 md:gap-16 gap-8 items-center justify-center">
                  {" "}
                  {!thumbnailUrlPreview ? (
                    <DragNDropImage thumbnail={getThumbnail}></DragNDropImage>
                  ) : (
                    <ThumbnailPreview
                      thumbnailUrlPreview={thumbnailUrlPreview}
                      removeThumbnailPreview={() => {
                        setThumbNailUrlPreview(null);
                      }}
                    />
                  )}
                </div>
                {/* <input className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md"></input> */}
              </div>
              <div className="p-4 font-semibold w-[100%] ">
                <p>
                  Link Trailer Content :<span className="text-red-500"> *</span>
                  <select
                    className="bg-transparent mx-4 outline-none border-2 rounded px-2 py-1"
                    onChange={handletrailerTypeChange}
                  >
                    <option className="px-2 bg-[#2E3648]" value="Upload">
                      By Video Upload:
                    </option>
                    <option className="px-2 bg-[#2E3648]" value="URL">
                      By URL :
                    </option>
                  </select>
                </p>
                <div className="my-4">
                  {trailerType === "Upload" && (
                    <input
                      className="w-full h-[40px] bg-[#2E3648] py-2 px-4 outline-none text-[rgb(107,149,168)] rounded-md"
                      ref={moviesTrailerVideoRef}
                      type="file"
                    ></input>
                  )}
                  {trailerType === "URL" && (
                    <input
                      className="w-full h-[40px] bg-[#2E3648] py-2 px-4 outline-none text-[rgb(107,149,168)] rounded-md"
                      ref={moviesTrailerVideoLinkRef}
                      // type="file"
                      placeholder="Enter the Url address of Image eg...(https://reelies.com/image.jpg"
                    ></input>
                  )}
                </div>{" "}
                {/* if promotional content type will be url then we will show url input box else we will show file input box with thier given key property*/}
              </div>
            </div>
          </div>
          <div
            className={`flex ${
              selectedTheme === "modern reeloid"
                ? "bg-black/40 backdrop-blur-lg"
                : "bg-[#2A3042]"
            }  w-[100%] my-4 p-4 flex-col`}
          >
            <div className="m-4 flex  text-[1.2rem] font-semibold border-b pb-2 border-gray-500 border-spacing-x-3 text-white justify-between">
              <p>Shorts Upload Section</p>
              <div
                onClick={() => {
                  addAdsInShortHandler();
                }}
                class="relative inline-flex items-center justify-center py-2 p-4 overflow-hidden font-mono font-medium tracking-tighter hover:cursor-pointer text-yellow-500 hover:text-white bg-gray-800 rounded-lg group border border-yellow-500"
              >
                <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-yellow-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
                <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                <span class="relative font-bold">Add Ads</span>
              </div>
            </div>
            <div className="flex   w-[100%]  flex-col">
              {" "}
              <DragNDropVideos videoFile={getVideoFilesHandler}>
                <div className="bg-gray-500 w-full h-28 items-center flex justify-center text-center text-white font-bold text-lg rounded-md">
                  Drag and Drop or upload movie here
                </div>
              </DragNDropVideos>
              <SortableAndSelectedMoviesPrint
                videoFiles={videoFiles}
                videoFilesSnapshot={videoFilesSnapshot}
                sortArray={handleSort}
                deleteVideoHandler={deleteVideoHandler}
              />
            </div>
          </div>
        </section>
        <div className="flex justify-end w-[100%]">
          <div
            onClick={() => {
              addMoviesHandler();
            }}
            className="relative rounded px-5 py-2.5 overflow-hidden group bg-blue-500  hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300 cursor-pointer"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative font-semibold">Add Movies</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMovies;