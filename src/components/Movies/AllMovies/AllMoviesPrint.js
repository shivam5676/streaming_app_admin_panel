import React from "react";

const AllMoviesPrint = ({ allMovies, handleSelectChange }) => {
  const connectionString = process.env.REACT_APP_API_URL;
  return (
    <>
      {" "}
      {allMovies.length > 0 &&
        allMovies.map((current, index) => (
          <div className="font-normal flex my-2  border-b border-gray-500">
            <div className="w-[50px] p-2  flex-shrink-0">
              <p className="p-2">{index + 1}</p>
            </div>
            <div className="w-[90px] text-white font-semibold flex-shrink-0">
              <select
                className="bg-[#3C445A] rounded-sm p-2"
                onChange={(event) => handleSelectChange(current._id, event)}
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
                src={`${connectionString}/thumbnails${current.fileLocation.replace(
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
              
              <p className="p-2 break-words">
                {" "}
                {current.genre.map((currentIndex) => {
                  return <span>{`${currentIndex.name} | `}</span>;
                })}
              </p>
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
    </>
  );
};

export default AllMoviesPrint;
