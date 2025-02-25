import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import AddLanguageModal from "./AddLanguageModal";
import { languageSliceACtion } from "../../store/languageSlice";
import { useDispatch, useSelector } from "react-redux";


const LanguageList = () => {
  const selectedTheme = useSelector((state) => state.theme.selectedTheme);
  const connectionString = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  // const [allLanguages, setAllLanguages] = useState([]);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const allLanguages = useSelector((state) => state.languageData);
  useEffect(() => {
    if (allLanguages.length == 0) {
      try {
        (async () => {
          const res = await axios.get(`${connectionString}/admin/allLanguages`,{
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });

          if (res.data.Languages) {
            Object.values(res.data.Languages).forEach((current) => {
              dispatch(languageSliceACtion.addLanguage(current));
            });
          }
        })();
      } catch (err) {
        console.log(err);
      }
    }
  }, [allLanguages, dispatch]);
  const deleteGenresHandler = async (id) => {
    try {
      const response = await axios.delete(
        `${connectionString}/admin/deleteLanguage/${id}`,{
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      dispatch(languageSliceACtion.deleteLanguage(id));
      toast.success("Genre deleted successfully");
    } catch (err) {
      console.log(err);
    }
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleSelectChange = (id, event) => {
    const action = event.target.value;
  
    // Reset the select value after handling the event to ensure proper re-rendering
    event.target.value = ""; // Reset the value to ensure change is recognized next time

    if (action === "DELETE") {
      deleteGenresHandler(id);
    } else if (action === "EDIT") {
      navigate(`/allLayout/${id}`);
    }
  };

  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll px-4 py-2">
      <div className="text-white px-2 py-4 ">
        <p className="text-lg font-bold">All languages</p>
        <p className="text-[.95rem] font-semibold">
          <span>Reelisis</span> <span className="mx-2"> &gt; </span>
          <span>Others</span>
          <span className="mx-2"> &gt; </span>
          <span>Languages</span>
        </p>
      </div>
      <section className="w-[100%]">
        {" "}
        <div className="flex gap-6 flex-col xl:flex-row">
        <div className={`max-[690px]:overflow-auto ${ selectedTheme === "modern reeloid"
          ? "bg-black/40 backdrop-blur-lg ":"bg-[#2A3042] "} flex-1  rounded-md text-gray-200 max-md:overflow-auto py-2`}>
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
                  {/* <p>search : </p>
                  <input
                    className="w-[150px] bg-[#2E3648] mx-2 p-2"
                    placeholder="search"
                  ></input> */}
                  <div
                    onClick={openModal}
                    className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-yellow-600 text-yellow-600"
                  >
                    <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-yellow-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                    <span className="relative text-yellow-600 transition duration-300 group-hover:text-white ease font-bold">
                      Add Language
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="m-4 font-normal text-[.9rem] min-w-[640px]">
              <div className="font-semibold flex border-b pb-2 border-gray-500">
                <div className="w-[50px] flex-shrink-0">
                  <p className="p-2">sr</p>
                </div>
                <div className="w-[90px]  flex-shrink-0">
                  <p className="p-2">action</p>
                </div>
                {/* <div className=" h-[120px] w-[100px] p-2"></div> */}
                <div className="w-[100%] flex-shrink-1 mx-8">
                  <p className="p-2">Name</p>
                </div>

                <div className="w-[80px]  flex-shrink-0">
                  <p className="p-2">status</p>
                </div>
              </div>
              {/* items */}
              {allLanguages?.length > 0 &&
                allLanguages.map((current, index) => (
                  <div className="font-normal flex my-2  border-b border-gray-500">
                    <div className="w-[50px] p-2  flex-shrink-0">
                      <p className="p-2">{index + 1}</p>
                    </div>
                    <div className="w-[90px] text-white font-semibold flex-shrink-0">
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
                        <option
                          value="DELETE"
                          onClick={() => {
                            // deleteGenresHandler(current._id)
                          }}
                        >
                          DELETE
                        </option>
                      </select>
                    </div>
                    {/* <img
                      src={`${connectionString}/genreeIcon/${current.icon.replace(
                        "uploads/thumbnail",
                        ""
                      )}`}
                      className=" h-[120px] w-[100px] p-2"
                    ></img> */}
                    <div className="w-[100%]  flex-shrink-1 mx-8">
                      <p className="p-2">{current.name}</p>
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
                ))}
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
      {isModalOpen && <AddLanguageModal closeModal={closeModal} />}
    </div>
  );
};

export default LanguageList;
