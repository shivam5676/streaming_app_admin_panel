import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import DragNDropVideos from "./dragNDropVideos";
import DragNDropImage from "./DragNDropImage";
import axios from "axios";
import { FormControl } from "@mui/material/FormControl";
import { toast } from "react-toastify";
import QuestionModal from "./questionModal";
import { GiPowerGenerator } from "react-icons/gi";
import scanner from "../assests/scanner.gif";
import logo from "../assests/logo.png";
const EdducationQuestionGenerator = () => {
  const connectionString = "http://192.168.1.57:8000";
  const [changeText, setChangeText] = useState("");
  const [questionArray, setQuestionArray] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [videoFilesSnapshot, setVideoFilesSnapshot] = useState([]);
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const getVideoFilesHandler = (videoFiles) => {
    Object.values(videoFiles).forEach((current) => {
      setVideoFiles((prev) => [...prev, current]);
    });
  };
  const addMoviesHandler = async () => {
    const formdata = new FormData();
    videoFiles.forEach((current) => formdata.append("eduVideos", current));
    try {
      const response = await axios.post(
        `${connectionString}/videos/uploadQuestions/`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setUploadedFiles(response.data.files);
      toast.success("movie added successfully");
    } catch (err) {}
  };
  console.log(uploadedFiles);
  const generateQuestionHAndler = async (index) => {
    setChangeText(<p className="font-bold text-green-600">wait!! File is scanning ...</p>);
    setQuestionModalOpen(true);
    const response = await axios.post(
      `${connectionString}/videos/generateQuestions/`,
      { file: uploadedFiles[index] }
    );
    console.log(response.data.data);
    setChangeText(<p className="font-bold text-blue-600">Generating Question Paper from Your videos ...</p>);
    const promptResponse = await axios.post(
      `${connectionString}/videos/questionHAndler/`,
      { questionPrompt: response.data.data }
    );
    console.log(promptResponse.data.data[0].result);
    if (promptResponse.data.data[0].result) {
      setQuestionModalOpen(true);
      setQuestionArray(promptResponse.data.data[0].result);
    }
  };
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll px-4 py-2">
      <div className="text-white px-2 py-4 ">
        <p className="text-lg font-bold">Question GEnerator</p>
        <p className="text-[.95rem] font-semibold">
          <span>Reelisis</span> <span className="mx-2"> &gt; </span>
          <span>Others</span>
          <span className="mx-2"> &gt; </span>
          <span>Question Generator</span>
        </p>
      </div>
      <section className="w-[100%]">
        <div className="flex gap-6 flex-col xl:flex-row">
          <div className="bg-[#2A3042] flex-1  rounded-md text-white">
            <div className="m-4 text-[1rem] font-semibold border-b pb-2 border-gray-500 border-spacing-x-3">
              <div className="flex  bg-[#2A3042] w-[100%] my-4 p-4">
                <DragNDropVideos videoFile={getVideoFilesHandler}>
                  <div className="flex flex-shrink-0 border-dashed text-white border-white border-2 w-[300px] min-h-[300px] h-[100%] mx-4 items-center justify-center cursor-pointer">
                    <p className="text-xl font-semibold">Upload Videos here</p>
                  </div>
                </DragNDropVideos>

                <div className="w-[100%] border-2 flex flex-wrap p-2">
                  {videoFiles?.map((current, index) => (
                    <div
                      key={index}
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
                            // deleteVideoHandler(index);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
      </div>{" "}
      {uploadedFiles.length > 0 && (
        <div className="w-[100%] border-2 flex flex-wrap p-2">
          {uploadedFiles?.map((current, index) => (
            <div
              key={index}
              className="relative bg-white h-[100px] w-[150px] m-2 group"
            >
              <img
                // src={}
                alt={`Snapshot of ${current.name}`}
                className="h-[100%] w-[100%] object-cover"
              />
              <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-30 text-white text-xs p-1 text-center break-words">
                {current.name}
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <GiPowerGenerator
                  className="text-white text-lg cursor-pointer w-[30px] h-[30px]"
                  onClick={async () => {
                    // deleteVideoHandler(index);
                    generateQuestionHAndler(index);
                    //  const response= axios.post(`${connectionString}/videos/generateQuestions/`,{uploadedFiles})
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {questionModalOpen && questionArray.length > 0 && (
        <QuestionModal
          questionArray={questionArray}
          closeModal={() => {
            setQuestionModalOpen(false);
            setQuestionArray([]);
          }}
        />
      )}{" "}
      {/* {console.log(questionModalOpen)} */}
      {questionModalOpen && questionArray.length == 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          // onClick={props.closeModal} // Close modal when clicking outside the modal content
        >
          <div
            className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[700px] max-w-md p-6 h-[60%] flex flex-col justifyde-center items-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <img src={logo} className="bg-black h-[150px] w-[100%]"></img>
            <div className="h-[200px] w-[200px]">
              <img src={scanner} className="h-[200px] w-[200px] my-6"></img>
              <p className="text-center">{changeText}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EdducationQuestionGenerator;
