import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AllMovies = () => {
  const connectionString =  process.env.REACT_APP_API_URL
  const navigate = useNavigate();
  const [allMovies, setAllMovies] = useState([]);
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
  const deleteMovieHandler = async (id) => {
    console.log(id);
    toast.success("movie deleted successfully");
    try {
      const response = await axios.delete(
        `${connectionString}/admin/deleteMovie/${id}`
      );
    } catch (err) {}
  };
  const handleSelectChange = (id, event) => {
    const action = event.target.value;
    console.log(action);
    // Reset the select value after handling the event to ensure proper re-rendering
    event.target.value = ""; // Reset the value to ensure change is recognized next time

    if (action === "DELETE") {
      deleteMovieHandler(id);
    } else if (action === "EDIT") {
      navigate(`/allMovies/${id}`);
    }
  };
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll px-4 py-2">
      <div className="text-white px-2 py-4 ">
        <p className="text-lg font-bold">All Movies</p>
        <p className="text-[.95rem] font-semibold">
          <span>Reelisis</span> <span className="mx-2"> &gt; </span>
          <span>Movies section</span>
          <span className="mx-2"> &gt; </span>
          <span>All Movies</span>
        </p>
      </div>
      <section className="w-[100%]">
        {" "}
        <div className="flex gap-6 flex-col xl:flex-row">
          <div className="bg-[#2A3042] flex-1  rounded-md text-gray-400 max-[690px]:overflow-auto py-2">
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
            <div className="m-4 font-normal text-[.9rem] min-w-[640px]">
              <div className="font-semibold flex border-b pb-2 border-gray-500">
                <div className="w-[50px] flex-shrink-0">
                  <p className="p-2">sr</p>
                </div>
                <div className="w-[90px]  flex-shrink-0">
                  <p className="p-2">action</p>
                </div>
                <div className="w-[100px]  flex-shrink-0">
                  <p className="p-2">Thumbnail</p>
                </div>
                <div className="w-[120px]  flex-shrink-0">
                  <p className="p-2">Name</p>
                </div>
                <div className="w-[100%] min-w-[100px]  flex-shrink-1">
                  <p className="p-2">Genre</p>
                </div>
                <div className="w-[100%] min-w-[100px]  flex-shrink-1">
                  <p className="p-2">Layouts</p>
                </div>
                <div className="w-[80px]  flex-shrink-0">
                  <p className="p-2">status</p>
                </div>
              </div>
              {/* items */}
              {allMovies.length > 0 &&
                allMovies.map((current, index) => (
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
                        <option value="DELETE">DELETE</option>
                      </select>
                    </div>
                    <div className="w-[100px] flex-shrink-0">
                      <img
                        src={`${connectionString}/thumbnails/${current.fileLocation.replace(
                          "uploads/thumbnail",
                          ""
                        )}`}    
                        className=" h-[120px] w-[100px] p-2"
                      ></img>
                    </div>
                    <div className="w-[120px]  flex-shrink-0">
                      <p className="p-2">{current.name}</p>
                    </div>
                    <div className="w-[100%] min-w-[100px] flex-shrink-1">
                      <p className="p-2 break-words">{current.genre}</p>
                    </div>{" "}
                    <div className="w-[100%] min-w-[100px] flex-shrink-1">
                      <p className="p-2 break-words">
                        {current.layouts.map((currentIndex) => {
                          return <span>{currentIndex.name}</span>;
                        })}
                      </p>
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
    </div>
  );
};

export default AllMovies;
