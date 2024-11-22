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

const EditMovies = () => {
  const params = useParams();
  // console.log(params);
  // return;
  const titleRef = useRef();
  const [AllData, setAllData] = useState([]);
  const [videoFiles, setvideoFiles] = useState([]);
  const [videoFilesSnapshot, setVideoFilesSnapshot] = useState([]);
  const [thumbnailUrlPreview, setThumbNailUrlPreview] = useState(null);
  const [thumbnailFromBackendPreview, setThumbNailFromBackendPreview] =
    useState(null);
  const [shortsPreviewFromBackend, setShortsPreviewFromBackend] =
    useState([]);
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
        `${connectionString}/admin/getMovie/${id}`
      );
      console.log(response.data.movieData,".....")
      // return
      if (
        response.data.movieData &&
        Object.values(response.data.movieData).length > 0
      ) {
        setAllData(response.data.movieData);
        setThumbNailFromBackendPreview(
          response.data.movieData.fileLocation.replace("uploads/thumbnail", "")
        );

        setShortsPreviewFromBackend(response.data.movieData.shorts);
      }
    }

    fetchMovie();
  }, []);
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
    formdata.append("id", AllData._id);
    try {
      const response = await axios.post(
        `${connectionString}/admin/editMovie`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
  // console.log(videoFilesSnapshot);
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
  console.log(shortsPreviewFromBackend);
  console.log(AllData,"alldata")
  const deleteVideoFromBackendHandler = async (id) => {
    try {
      const response = await axios.delete(
        `${connectionString}/admin/deleteShort/${id}`
      );
      toast.success("file deleted successfully");
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <>
      <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll px-4 py-2">
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
                {/* <input className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md"></input> */}
              </div>
            </div>
          </div>
          {/* <div className="flex  bg-[#2A3042] w-[100%] my-4 p-4">
            <DragNDropVideos videoFile={getVideoFilesHandler}>
              <div className="flex flex-shrink-0 border-dashed text-white border-white border-2 w-[300px] min-h-[300px] h-[100%] mx-4 items-center justify-center cursor-pointer">
                <p className="text-xl font-semibold">Upload shorts here</p>
              </div>
            </DragNDropVideos>

            <div className="w-[100%] border-2 flex flex-wrap p-2">
              {shortsPreviewFromBackend?.map((current, index) => (
                <div
                  key={current._id}
                  className="relative bg-white h-[100px] w-[150px] m-2 group"
                >
                  <img
                    src={videoFilesSnapshot[index]}
                    alt={`Snapshot of ${current.name}`}
                    className="h-[100%] w-[100%] object-cover"
                  />
                  <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-30 text-white text-xs p-1 text-center break-words">
                    {current.name}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-red-500 bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FaTrash
                      className="text-white text-lg cursor-pointer w-[30px] h-[30px]"
                      onClick={() => {
                        deleteVideoFromBackendHandler(current._id);
                      }}
                    />
                  </div>
                </div>
              ))}
              {videoFiles?.map((current, index) => (
                <div
                  key={index}
                  className="relative bg-white h-[100px] w-[150px] m-2 group"
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
          </div> */}
        </section>
        <div className=" bg-[#2A3042] w-[100%] my-4 p-4">
          <div className="my-4 flex  text-[1.2rem] font-semibold border-b pb-2 border-gray-500 border-spacing-x-3 text-white justify-between">
            <p>Shorts Section</p>
          </div>
          <div className="bg-gray-500 w-full h-28 items-center flex justify-center">
            upload movie here
          </div>
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
                {shortsPreviewFromBackend.length > 0 ? (
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
              <div className="w-[80px]  flex-shrink-0">
                {shortsPreviewFromBackend.length > 0 ? (
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

            {shortsPreviewFromBackend.length > 0 &&
              shortsPreviewFromBackend.map((current, index) => (
                <div className="font-normal flex my-2 text-[#A8B2BC] border-b border-gray-500 px-2">
                  <div className="w-[50px] p-2  flex-shrink-0">
                    <p className="p-2">{index + 1}</p>
                  </div>
                  {/* <div className="w-[90px] text-white font-semibold flex-shrink-0">
                    <select
                      className="bg-[#3C445A] rounded-sm p-2"
                      onChange={(event) =>
                        handleSelectChange(current._id, event)
                      }
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
                  </div> */}
                  {/* <div className="w-[100px] flex-shrink-0">
                    <img
                      // src={`${connectionString}/thumbnails${current.fileLocation.replace(
                      //   "uploads/thumbnail",
                      //   ""
                      // )}`}
                      className=" h-[120px] w-[100px] p-2"
                    ></img>
                  </div> */}
                  <div className="min-w-[120px] w-[100%]  flex-shrink-1">
                    <p className="p-2">{current.name}</p>
                  </div>
                  <div className="w-[80%] min-w-[100px] flex-shrink-1">
                    <p className="p-2 break-words">{current.views}</p>
                  </div>{" "}
                  <div className="w-[80%] min-w-[100px] flex-shrink-1">
                    <p className="p-2 break-words">{current.visible}</p>
                  </div>
                  <div
                    className="w-[80px]  flex-shrink-0 cursor-pointer"
                    onClick={() => {
                      // navigate(`/userDetails/${current._id}`);
                    }}
                  >
                    <p className="p-2 px-3 font-semibold  border border-white hover:border-yellow-600 hover:bg-yellow-600 rounded-md text-white text-[.9rem] flex justify-center text-center ">
                      Watch
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="flex justify-end w-[100%]">
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
