import { useEffect, useRef, useState } from "react";
import DragNDropImage from "./DragNDropImage";
import LayoutSelector from "./layoutSelector";
import axios from "axios";
import dragNDropVideos from "./dragNDropVideos";
import DragNDropVideos from "./dragNDropVideos";
import { FaTrash } from "react-icons/fa";
import GenreSelector from "./genreSelector";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";
import LanguageSelector from "./LanguageSelector";
import personalisedAds from "../assests/personalise_Ads.jpg";
import { ReactSortable } from "react-sortablejs";

import { CgMenuOreos } from "react-icons/cg";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  changeShortsSequence,
  doActionTask,
} from "../Api/EditMovies/shortsActionTask";

const EditMovies = () => {
  const params = useParams();
  const [selectedIds, setSelectedIds] = useState([]);
  // console.log(params);
  // return;
  const [selectedAction, setSelectedAction] = useState("none");
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const titleRef = useRef();
  const moviesTrailerVideoRef = useRef();
  const moviesTrailerVideoLinkRef = useRef();
  const [trailerType, setTrailerType] = useState("Upload");
  const [uploadMoreMovies, setUploadMoreMovies] = useState(false);
  const [AllData, setAllData] = useState([]);
  const [videoFiles, setvideoFiles] = useState([]);
  const [videoFilesSnapshot, setVideoFilesSnapshot] = useState([]);
  const [thumbnailUrlPreview, setThumbNailUrlPreview] = useState(null);
  const [thumbnailFromBackendPreview, setThumbNailFromBackendPreview] =
    useState(null);
  const [trailerPresent, setTrailerPresent] = useState(false);
  const languageRef = useRef();
  const [languages, setLanguages] = useState([]);
  const [shortsPreviewFromBackend, setShortsPreviewFromBackend] = useState([]);
  const genreRef = useRef(); //contains multiple layout where we want to show our movies and related shorts
  const layOutArrayRef = useRef(); //contains multiple layout where we want to show our movies and related shorts
  const genre = [];

  const thumbnailRef = useRef(); //contains object for thumbnail file ,initially it will be null
  // let thumbNail = null;
  const freeVideosRef = useRef();
  const visibleRef = useRef();
  const connectionString = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const id = params.edit;
    async function fetchMovie() {
      const response = await axios.get(
        `${connectionString}/admin/getMovie/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data.movieData, ".....");
      // return
      if (
        response.data.movieData &&
        Object.values(response.data.movieData).length > 0
      ) {
        setAllData(response.data.movieData);
        setTrailerPresent(response?.data?.movieData?.trailerUrl);
        // setLanguages(response?.data?.movieData?.language || []);
        setThumbNailFromBackendPreview(
          response.data.movieData.fileLocation.replace("uploads/thumbnail", "")
        );
        if (response?.data?.movieData?.shorts) {
          const dataArray = response?.data?.movieData?.shorts?.map(
            (current) => {
              if (current === "Ads") {
                return { name: "Personalised Ads" };
              } else {
                return current;
              }
            }
            // console.log(current, "current")
          );
          setShortsPreviewFromBackend(dataArray);
        }
      }
    }

    fetchMovie();
  }, []);
  console.log("render", AllData.trailerUrl);
  const handletrailerTypeChange = (e) => {
    setTrailerType(e.target.value);
  };
  const addMoviesHandler = async () => {
    console.log(genreRef.current);
    if (!thumbnailUrlPreview && !thumbnailFromBackendPreview) {
      toast.error("please upload thumbnail");
      return;
    }

    const formdata = new FormData();
    if (thumbnailUrlPreview) {
      formdata.append("thumbnail", thumbnailRef.current);
    }
    // formdata.append();

    videoFiles.forEach((current) => formdata.append("shorts", current));
    formdata.append("title", titleRef.current.value);
    formdata.append("layouts", JSON.stringify(layOutArrayRef.current));
    formdata.append("freeVideos", freeVideosRef.current.value);
    formdata.append("visible", visibleRef.current.value);
    formdata.append("genre", JSON.stringify(genreRef.current));
    formdata.append("language", JSON.stringify(languageRef.current));
    formdata.append("id", AllData._id);
    try {
      const response = await axios.post(
        `${connectionString}/admin/editMovie`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      toast.success("file edited successfully");
    } catch (err) {
      toast.error("something went wrong while editing movies");
    }
  };
  const selectionHandler = (value) => {
    console.log(value);
    layOutArrayRef.current = value;
    // console.log(layOutArray);
    // setLanguages((prev) => [...prev, value]);
  };
  const GenreHandler = (value) => {
    // console.log(value);
    genreRef.current = value;
    // console.log(layOutArray);
  };
  const getThumbnail = (thumbnail) => {
    console.log(thumbnail);
    thumbnailRef.current = thumbnail;
    // console.log(thumbnailRef)
    if (thumbnail != null) {
      const objectUrlCreation = URL.createObjectURL(thumbnail);
      console.log(objectUrlCreation);
      setThumbNailUrlPreview(objectUrlCreation);
    }
  };
  // console.log(AllData.genre,"...>");
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
        // setVideoSnapshot(snapshot);

        URL.revokeObjectURL(videoURL); // Clean up
      };
      setvideoFiles((prev) => {
        return [...prev, current];
      });
    });
    // setvideoFiles((prev)=>{
    //   return
    // })
  };
  const languageHandler = (value) => {
    console.log(value);
    languageRef.current = value;
    // setLanguages((prev) => [...prev, value]);
  };

  const handleSort = (newList) => {
    const newVideoFiles = newList.map(
      (item, index) => shortsPreviewFromBackend[item.id]
    );

    setShortsPreviewFromBackend(newVideoFiles);
  };
  // delete uploadeable videos which is not uploaded yet
  const deleteVideoHandler = (id) => {
    return;
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
  console.log(shortsPreviewFromBackend);
  console.log(AllData, "alldata");
  // delete uploaded videos which already uploaded in backend databases
  const deleteVideoFromBackendHandler = async (data) => {
    const movieId = params.edit;
    console.log(data);
    return;
    if (data.name === "Ads") {
      console.log("ads triggered");
      const dataObj = {
        index: data?.index,
        movieId: movieId,
      };
      try {
        const response = await axios.delete(
          `${connectionString}/admin/deleteAds/`,

          {
            data: dataObj,
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        toast.success("Ads  deleted successfully");
        setShortsPreviewFromBackend((prev) =>
          prev.filter((current, idx) => data.index !== idx)
        );
      } catch (error) {
        toast.error("something went wrong");
      }
    } else if (data.name === "Video") {
      try {
        const response = await axios.delete(
          `${connectionString}/admin/deleteShort/${data.id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        toast.success("Video  deleted successfully");
      } catch (error) {
        toast.error("something went wrong");
      }
    }
    return;
  };
  async function addAdsInShortHandler() {
    const id = params.edit;
    try {
      const adsResponse = await axios.post(
        `${connectionString}/admin/addAdsInMovie/`,
        { id },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setShortsPreviewFromBackend((prev) => [
        ...prev,
        { name: "Personalised Ads" },
      ]);
      toast.success("Ads Added successfully");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while adding Ads...try again ");
    }

    // setVideoFilesSnapshot((prev) => [...prev, personalisedAds]);
  }
  const toggleMenu = (index) => {
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the menu if clicked outside
      if (!event.target.closest(".menu-item")) {
        setMenuOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  function selectedActionHandler(event) {
    // console.log(event.target.value);
    setSelectedAction(event.target.value);
  }
  // let selectedIds = [];
  const multipleIdsHAndler = (id) => {
    const idExist = selectedIds.find((current) => id === current);

    if (!idExist) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((current) => current != id));
    }
  };
  console.log(selectedIds, "selecteddIds");
  const selectedActionPerform = async (action) => {
    const moviesId = params.edit;
    if (action === "Enable") {
      // console.log("enable");
      // console.log("disable");
      doActionTask("/admin/enableVideo", selectedIds);

      // try {
      //   const response = await axios.post(
      //     `${connectionString}/admin/enableVideo`,
      //     selectedIds,
      //     {
      //       headers: {
      //         Authorization: localStorage.getItem("token"),
      //       },
      //     }
      //   );
      //   console.log(response);
      // } catch (error) {}
    } else if (action === "Disable") {
      console.log("disable");
      doActionTask("/admin/disableVideo", selectedIds);

      // try {
      //   const response = await axios.post(
      //     `${connectionString}/admin/disableVideo`,
      //     selectedIds,
      //     {
      //       headers: {
      //         Authorization: localStorage.getItem("token"),
      //       },
      //     }
      //   );
      //   console.log(response);
      // } catch (error) {}
    } else if (action === "Change sequence") {
      const sequenceData = shortsPreviewFromBackend.map((current) => {
        if (current?._id) {
          return current._id;
        } else {
          return "Ads";
        }
      });

      changeShortsSequence("/admin/changeSequence", moviesId, sequenceData);
    } else if (action === "Delete Shorts") {
      console.log("Delete shorts");
    }
  };
  return (
    <>
      <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll px-4 py-2 customScrollbar">
        <div className="text-white px-2 py-4 ">
          <p className="text-lg font-bold">Edit Movie</p>
          <p className="text-[.95rem] font-semibold">
            <span>Reelisis</span> <span className="mx-2"> &gt; </span>
            <span>Movies section</span>
            <span className="mx-2"> &gt; </span>
            <span>Edit Movie</span>
          </p>
        </div>
        <section className="w-[100%]">
          <div className="flex gap-6 flex-col xl:flex-row">
            <div className="bg-[#2A3042] flex-1  rounded-md text-white">
              <div className="m-4 text-[1rem] font-semibold border-b pb-2 border-gray-500 border-spacing-x-3">
                <p>Movie Info</p>
              </div>
              <div className="m-4 font-semibold">
                <p>Title</p>
                <input
                  className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md font-normal"
                  placeholder="Write here"
                  ref={titleRef}
                  defaultValue={AllData?.name}
                ></input>
              </div>
              <div className="m-4 font-semibold">
                <p>Select Layout</p>
                <LayoutSelector
                  selectedArray={selectionHandler}
                  editLayouts={AllData?.layouts}
                />
                {/* <input className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md"></input> */}
              </div>
              <div className="flex sm:flex-row flex-col">
                <div className="p-4 font-semibold w-[100%] sm:w-[50%]">
                  <p>Free Videos</p>

                  <input
                    defaultValue={AllData?.freeVideos}
                    className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)]  rounded-md my-2"
                    ref={freeVideosRef}
                    type="number"
                  ></input>
                </div>
                <div className="p-4 font-semibold w-[100%] sm:w-[50%]">
                  <p>Visible</p>

                  <select
                    className="w-full h-[30px] bg-[#2E3648] px-2 outline-none text-white rounded-md my-2"
                    ref={visibleRef}
                    defaultValue={AllData?.visible === true ? "true" : "false"}
                  >
                    <option value={true}>Yes, make it live</option>
                    <option value={false}>No, will make it live later</option>
                  </select>
                </div>{" "}
              </div>{" "}
              <div className="flex sm:flex-row flex-col">
                <div className="p-4 font-semibold w-[100%]">
                  <p>Content Language:</p>
                  <LanguageSelector
                    selectedLanguage={languageHandler}
                    editLanguages={AllData?.language}
                  />
                  {/* <GenreSelector selectedGenre={GenreHandler} /> */}

                  {/* we need to made a language selector like genere selector and in backend we will append languages and content id vice versa */}
                </div>
              </div>
              <div className="flex sm:flex-row flex-col">
                <div className="p-4 font-semibold w-[100%]">
                  <p>Movie Type ( Genre )</p>
                  <GenreSelector
                    selectedGenre={GenreHandler}
                    editGenres={AllData?.genre}
                  />
                  {/* <select
                  className="w-full h-[30px] bg-[#2E3648] px-2 outline-none text-white rounded-md my-2"
                  ref={visibleRef}
                >
                  <option value={true}>Yes, make it live</option>
                  <option value={false}>No, will make it live later</option>
                </select> */}
                </div>
              </div>
            </div>
            <div className="bg-[#2A3042] flex-1  rounded-md text-white">
              <div className="m-4 text-[1rem] font-semibold border-b pb-2 border-gray-500 border-spacing-x-3">
                <p>Additional Info</p>
              </div>
              <div className="m-4 font-semibold">
                <p>Thumbnail</p>
                <div className="flex flex-col-reverse sm:flex-row w-[100%] py-4 md:gap-16 gap-8 items-center justify-center">
                  {" "}
                  {!thumbnailUrlPreview && !thumbnailFromBackendPreview ? (
                    <DragNDropImage thumbnail={getThumbnail}></DragNDropImage>
                  ) : (
                    <div className="w-[100%] flex justify-center">
                      <div className="w-[150px] h-[220px] rounded-md">
                        <img
                          src={
                            thumbnailUrlPreview
                              ? thumbnailUrlPreview
                              : `${connectionString}/thumbnails/${thumbnailFromBackendPreview}`
                          }
                          className="border w-[100%] h-[100%] rounded-md"
                        >
                          {/* <img src={thumbnailUrlPreview}></img> */}
                        </img>
                        <div
                          className="flex justify-center text-[.9rem] text-yellow-500 underline cursor-pointer font-semibold pt-1"
                          onClick={() => {
                            setThumbNailUrlPreview(null);
                            setThumbNailFromBackendPreview(null);
                          }}
                        >
                          remove Image
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {!trailerPresent && (
                  <div className="p-4 font-semibold w-[100%] ">
                    <p>
                      Link Trailer Content :
                      <span className="text-red-500"> *</span>
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
                )}
                {trailerPresent && (
                  <div className=" mt-4 p-4 font-semibold w-[100%] ">
                    <div className="flex items-center">
                      Linked Trailer Content
                      <span className="text-red-500"> *</span>
                      <p className="border mx-2 p-1">Watch Now</p>
                    </div>
                    <div
                      className="my-4 font-normal  w-fit text-sm border-b border-red-500 text-yellow-400 cursor-pointer"
                      onClick={() => {}}
                    >
                      I want to change trailer
                    </div>{" "}
                    {/* if promotional content type will be url then we will show url input box else we will show file input box with thier given key property*/}
                  </div>
                )}
                {/* <input className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md"></input> */}
              </div>
            </div>
          </div>
          <div className=" bg-[#2A3042] w-[100%] my-4 p-4">
            <div className="my-4 flex  text-[1.2rem] font-semibold border-b pb-2 border-gray-500 border-spacing-x-3 text-white justify-between items-center">
              <p>Shorts Section</p>
              <div
                onClick={() => {
                  selectedAction === "none"
                    ? addAdsInShortHandler()
                    : selectedActionPerform(selectedAction);
                }}
                class="relative inline-flex items-center justify-center py-2 p-4 overflow-hidden font-mono font-medium tracking-tighter hover:cursor-pointer text-yellow-500 hover:text-white bg-gray-800 rounded-lg group border border-yellow-500"
              >
                <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-yellow-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
                <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                <span class="relative font-bold">
                  {selectedAction !== "none" ? "Save" : "Add Ads"}
                </span>
              </div>

              <select
                onChange={selectedActionHandler}
                id="countries"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="none" selected={selectedAction === "none"}>
                  Option
                </option>
                <option
                  value="Change sequence"
                  selected={selectedAction === "Change sequence"}
                >
                  Change sequence
                </option>
                <option
                  value="Delete Shorts"
                  selected={selectedAction === "Delete Shorts"}
                >
                  Delete Shorts
                </option>
                <option
                  value="Enable"
                  selected={selectedAction === "Enable/Disable"}
                >
                  Enable
                </option>
                <option value="Disable">Disable</option>
              </select>
            </div>
            {/* <div className="bg-gray-500 w-full h-28 items-center flex justify-center">
            upload movie here
          </div> */}
            <div className="my-4 font-normal text-[.9rem]  overflow-x-auto">
              <div className="font-semibold flex border-b pb-2 text-[#A8B2BC] border-gray-500 px-2">
                <div className="w-[50px] flex-shrink-0">
                  {shortsPreviewFromBackend.length > 0 ? (
                    <p className="p-2">sr</p>
                  ) : (
                    <div className="p-2">
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        height={"30px"}
                        width={"100%"}
                        sx={{
                          bgcolor: "purple.600",
                        }}
                      ></Skeleton>
                    </div>
                  )}
                </div>
                <div className="w-[90px] flex-shrink-0">
                  {shortsPreviewFromBackend.length > 0 ? (
                    <p className="p-2">Action</p>
                  ) : (
                    <div className="p-2">
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        height={"30px"}
                        width={"100%"}
                        sx={{
                          bgcolor: "purple.600",
                        }}
                      ></Skeleton>
                    </div>
                  )}
                </div>
                <div className="min-w-[120px] w-[100%]  flex-shrink-1">
                  {shortsPreviewFromBackend.length > 0 ? (
                    <p className="p-2">Name</p>
                  ) : (
                    <div className="p-2">
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        height={"30px"}
                        width={"100%"}
                        sx={{
                          bgcolor: "purple.600",
                        }}
                      ></Skeleton>
                    </div>
                  )}
                </div>
                <div className="w-[80%] min-w-[100px]  flex-shrink-1">
                  {shortsPreviewFromBackend.length > 0 ? (
                    <p className="p-2">Views</p>
                  ) : (
                    <div className="p-2">
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        height={"30px"}
                        width={"100%"}
                        sx={{
                          bgcolor: "purple.600",
                        }}
                      ></Skeleton>
                    </div>
                  )}
                </div>
                <div className="w-[80%] min-w-[100px]  flex-shrink-1">
                  {shortsPreviewFromBackend?.length > 0 ? (
                    <p className="p-2">Visible</p>
                  ) : (
                    <div className="p-2">
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        height={"30px"}
                        width={"100%"}
                        sx={{
                          bgcolor: "purple.600",
                        }}
                      ></Skeleton>
                    </div>
                  )}
                </div>
                <div className="w-[80px]   flex-shrink-0">
                  {shortsPreviewFromBackend?.length > 0 ? (
                    <p className="p-2">Preview</p>
                  ) : (
                    <div className="p-2">
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        height={"30px"}
                        width={"100%"}
                        sx={{
                          bgcolor: "purple.600",
                        }}
                      ></Skeleton>
                    </div>
                  )}
                </div>
              </div>
              {/* if sequence changer is diabled then we will show this else we will show react sortable screen changer */}
              <ReactSortable
                list={shortsPreviewFromBackend.map((_, index) => ({
                  id: index,
                  name: shortsPreviewFromBackend[index]?.name,
                }))}
                setList={handleSort}
                scroll={true}
                // bubbleScroll
                animation={300} // Animation duration in milliseconds
                disabled={selectedAction !== "Change sequence"}
              >
                {shortsPreviewFromBackend?.length > 0 &&
                  shortsPreviewFromBackend?.map((current, index) => {
                    return (
                      <div
                        key={index}
                        className="font-normal flex py-1 items-center text-[#c8cfd6] bg-gray-400  backdrop-blur-lg hover:text-white  border-b border-gray-500 px-2"
                      >
                        <div className="w-[50px] p-2  flex-shrink-0">
                          <p className="px-2">{index + 1}</p>
                          {selectedAction !== "Change sequence" &&
                            selectedAction !== "none" &&
                            current !== "Ads" &&
                            current?.name != "Personalised Ads" && (
                              <input
                                type="checkbox"
                                onClick={() => multipleIdsHAndler(current?._id)}
                              ></input>
                            )}
                        </div>
                        <div className="w-[90px] text-white font-semibold flex-shrink-0 ">
                          <p
                            className="bg-[#3C445A] rounded-sm p-2 m-2 cursor-pointer"
                            onClick={() => {
                              console.log("hello");
                              // deleteVideoFromBackendHandler(
                              //   current?.name === "Personalised Ads"
                              //     ? { name: "Ads", index: index }
                              //     : { name: "Video", id: current?._id }
                              // );
                            }}
                          >
                            Delete
                          </p>
                        </div>
                        {current !== "Ads" &&
                        current?.name != "Personalised Ads" ? (
                          <div className="bg-[#151E2D] flex w-[100%] items-center rounded-md relative">
                            <div className="w-[80px] flex-shrink-0">
                              <img
                                // src={`${connectionString}/thumbnails${current.fileLocation.replace(
                                //   "uploads/thumbnail",
                                //   ""
                                // )}`}
                                className=" h-[80px] w-[100px] p-2"
                              ></img>
                            </div>
                            <div className="min-w-[120px] w-[100%]  flex-shrink-1">
                              <p className="p-2">{current?.name}</p>
                            </div>
                            <div className="w-[80%] min-w-[100px] flex-shrink-1">
                              <p className="p-2 break-words">
                                {current?.views}
                              </p>
                            </div>{" "}
                            <div className="w-[80%] min-w-[100px] flex-shrink-1">
                              <p className="p-2 break-words">
                                {current?.visible ? "true" : "false"}
                              </p>
                            </div>
                            <div
                              className="w-[80px]  flex-shrink-0 cursor-pointer p-2"
                              onClick={() => {
                                // navigate(`/userDetails/${current._id}`);
                              }}
                            >
                              <p className="p-2 px-3 font-semibold  border border-white hover:border-yellow-600 hover:bg-yellow-600 rounded-md text-white text-[.9rem] flex justify-center text-center ">
                                Watch
                              </p>
                            </div>
                          </div>
                        ) : (
                          <>
                            {/* <img className="h-[60px] w-[220px]" src={personalisedAds}></img> */}
                            <div
                              className="h-[60px] w-[100%] flex items-center justify-center rounded-md bg-yellow-600 mb-2 sm:text-[1.1rem] font-semibold text-white p-1"
                              src={personalisedAds}
                            >
                              Personalised Ads
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
              </ReactSortable>
            </div>
          </div>
        </section>
        {uploadMoreMovies && (
          <div className="flex flex-col bg-[#2A3042] w-[100%] my-4 p-4">
            <div className="my-4 flex  text-[1.2rem] font-semibold border-b pb-2 border-gray-500 border-spacing-x-3 text-white justify-between">
              <p>Add More Shorts</p>
            </div>
            <DragNDropVideos videoFile={getVideoFilesHandler}>
              <div className="bg-gray-500 w-full h-28 items-center flex justify-center text-center text-white font-bold text-lg rounded-md">
                Drag and Drop or upload movie here
              </div>
            </DragNDropVideos>

            {videoFiles.length > 0 && (
              <div className="w-[100%] border-2 border-gray-500 grid  grid-cols-1 sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-2 p-2 my-2">
                {videoFiles?.map((current, index) => (
                  <div
                    key={index}
                    className="relative bg-white h-[100px]  m-2 group shadow-md shadow-white"
                  >
                    <img
                      src={videoFilesSnapshot[index]}
                      alt={`Snapshot`}
                      className="h-[100%] w-[100%] object-cover"
                    />
                    <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-30 text-white text-xs p-1 text-center break-words">
                      {current.name}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-red-500 bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <FaTrash
                        className="text-white text-lg cursor-pointer w-[30px] h-[30px]"
                        onClick={() => {
                          deleteVideoHandler(index);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="flex justify-end w-[100%] gap-4">
          <div
            onClick={() => {
              setUploadMoreMovies(!uploadMoreMovies);
            }}
            className="relative rounded px-5 py-2.5 overflow-hidden group bg-blue-500  hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300 cursor-pointer"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative font-semibold">
              {!uploadMoreMovies
                ? "I Want to Add More Videos"
                : "I will add videos later"}
            </span>
          </div>
          <div
            onClick={() => {
              addMoviesHandler();
            }}
            className="relative rounded px-5 py-2.5 overflow-hidden group bg-blue-500  hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300 cursor-pointer"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative font-semibold">Edit Movies</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMovies;
