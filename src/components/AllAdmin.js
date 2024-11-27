import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sliderSliceACtion } from "../store/sliderSlice";
import RoutesInfoDiv from "./RoutesInfoDiv";
import CreateAdmin from "./CreateAdmin";

const AllAdmin = () => {
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  const connectionString = process.env.REACT_APP_API_URL;
  const [allAdmin, setAllAdmin] = useState([]);
  const[openCreateAdmin,setOpenCreateAdmin]=useState(false)
  const dispatch = useDispatch();
  //   const allSliders = useSelector((state) => state.sliderData);

  useEffect(() => {
    if (allAdmin.length === 0) {
      (async () => {
        try {
          const res = await axios.get(`${connectionString}/admin/allAdmin`);
          console.log(res.data);
          if (res.data.Admin) {
            Object.values(res.data.Admin).forEach((current) => {
              // dispatch(sliderSliceACtion.addSlider(current));
            });
          }
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [allAdmin, dispatch]);
  const deleteSliderHandler = async (id) => {
    console.log(id);

    try {
      const response = await axios.delete(
        `${connectionString}/admin/deleteSliders/${id}`
      );
      //   dispatch(sliderSliceACtion.deleteSlider(id));
      toast.success("movie deleted successfully");
    } catch (err) {}
  };
  const handleSelectChange = (id, event) => {
    const action = event.target.value;
    console.log(action);
    // Reset the select value after handling the event to ensure proper re-rendering
    event.target.value = ""; // Reset the value to ensure change is recognized next time

    if (action === "DELETE") {
      deleteSliderHandler(id);
    } else if (action === "EDIT") {
      // navigate(`/allLayout/${id}`);
    }
  };
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll px-4 py-2">
      <div className="flex justify-between items-center">
        <RoutesInfoDiv
          mainHeading={"All Admin"}
          websiteName={"Reelies"}
          sectionName={"Users section"}
          currentDir={"All Admin"}
        ></RoutesInfoDiv>

        <div
         onClick={()=>{setOpenCreateAdmin(!openCreateAdmin)}}
          class="relative inline-flex items-center justify-center py-2 p-4 overflow-hidden font-mono font-medium tracking-tighter hover:cursor-pointer text-blue-500 hover:text-white bg-gray-800 rounded-lg group border border-blue-500"
        >
          <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
          <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
          <span class="relative font-bold">Add Admin</span>
        </div>
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
                  <p className="p-2">Profile Pic</p>
                </div>
                <div className="w-[100%]  min-w-[120px] flex-shrink-1">
                  <p className="p-2">Name</p>
                </div>
                <div className="w-[100%] min-w-[100px]  flex-shrink-1">
                  <p className="p-2">Email</p>
                </div>
                <div className="w-[100%] min-w-[100px]  flex-shrink-1">
                  <p className="p-2">Contact no</p>
                </div>
                <div className="w-[80px]  flex-shrink-0">
                  <p className="p-2">status</p>
                </div>
              </div>
              {/* items */}
              {allAdmin.length > 0 &&
                allAdmin.map((current, index) => (
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
                        // src={`${connectionString}/thumbnails${current.fileLocation.replace(
                        //   "uploads/thumbnail",
                        //   ""
                        // )}`}
                        className=" h-[120px] w-[100px] p-2"
                      ></img>
                    </div>
                    <div className="w-[100%]   min-w-[120px] flex-shrink-1">
                      <p className="p-2">{current.name}</p>
                    </div>
                    <div className="w-[100%] min-w-[100px] flex-shrink-1">
                      {console.log(current, "cu---------")}
                      <p className="p-2 break-words">
                        {current.email}{" "}
                        {/* {current.genre.map((currentIndex) => {
                          return <span>{`${currentIndex.name} | `}</span>;
                        })} */}
                      </p>
                    </div>{" "}
                    <div className="w-[100%] min-w-[100px] flex-shrink-1">
                      <p className="p-2 break-words">
                        {current.contact}
                        {/* {current.layouts.map((currentIndex) => {
                          return <span>{currentIndex.name}</span>;
                        })} */}
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
      {openCreateAdmin&&<CreateAdmin/>}
    </div>
  );
};

export default AllAdmin;
