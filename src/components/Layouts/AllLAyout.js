import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import allLayouts from "./allLayouts";
import { layoutSliceACtion } from "../../store/layoutSlice";

import RoutesInfoDiv from "../commonComponents/RoutesInfoDiv";

import AllLAyoutPrint from "./AllLAyoutPrint";
import { allLayoutsApi } from "../../Api/Layouts/layoutApi";
import Pagination from "../commonComponents/pagination";
import SearchAndSort from "../commonComponents/searchAndSort";
import DeleteConfirm from "../Confirmation/DeleteConfirm";
import { useNavigate } from "react-router-dom";

const AllLAyout = () => {
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  const dispatch = useDispatch();
  const allLayouts = useSelector((state) => state.layOutData);
  const [limit, setlimit] = useState(10);
  const [start, setStart] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [pageMetaData, setPageMetaData] = useState({
    totalPages: 0,
    current: 0,
    limit: 0,
  });
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [layoutName, setLayoutName] = useState([]);
    const navigate = useNavigate();
  const limitHandler = (data) => {
    setlimit(data);
    setStart(0);
  };
  useEffect(() => {
    try {
      (async () => {
        const res = await allLayoutsApi(start, limit, searchValue);
        if (res.data.Layout) {
          dispatch(layoutSliceACtion.addLayout(Object.values(res.data.Layout)));
        }
        if (res.data.totalPages) {
          setPageMetaData({
            totalPages: res.data.totalPages,
            current: start,
            limit: limit,
            totalData: res.data.totalData,
          });
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, limit, start, searchValue]);

  const handleSelectChange = (id, event, name) => {
    const action = event.target.value;
    console.log(action);
    setLayoutName(prev => [...prev, name])
    // Reset the select value after handling the event to ensure proper re-rendering
    event.target.value = ""; // Reset the value to ensure change is recognized next time

    if (action === "DELETE") {
      setConfirmDelete(true)
      // deleteLayoutHandler(id);
    } else if (action === "EDIT") {
      navigate(`/allLayout/${id}`);
    }
  };
    useEffect(()=>{
      if(!confirmDelete){
        setLayoutName([])
      }
    },[confirmDelete])
    console.log(confirmDelete)

  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll customScrollbar px-4 py-2">
      <RoutesInfoDiv
        mainHeading={"All Layouts"}
        websiteName={"Reeloid"}
        sectionName={"Layout section"}
        currentDir={"All Layouts"}
      ></RoutesInfoDiv>
      <section
        className={`w-[100%] ${
          selectedTheme === "modern reeloid"
            ? "bg-black/40 backdrop-blur-lg "
            : "bg-[#2A3042] "
        } py-2  rounded-md`}
      >
        {" "}
        <SearchAndSort
          limit={limitHandler}
          searchedQuery={(data) => {
            setSearchValue(data);
            setStart(0);
          }}
        ></SearchAndSort>
        <div className="flex gap-6 flex-col xl:flex-row">
          <div
            className={`max-[690px]:overflow-auto ${
              selectedTheme === "modern reeloid"
                ? "bg-black/40 backdrop-blur-lg "
                : "bg-[#2A3042] "
            } flex-1  rounded-md text-gray-200 max-md:overflow-auto py-2`}
          >
            <AllLAyoutPrint allLayouts={allLayouts} handleSelectChange={handleSelectChange} />
          </div>
        </div>{" "}
        <Pagination
          metaData={pageMetaData}
          jumpToPage={(data) => {
            setStart(data);
          }}
        />
      </section>
      {confirmDelete && (
        <DeleteConfirm
          message={"Are you sure you want to delete Layout - "}
          name={layoutName}
          setConfirmDelete={setConfirmDelete}
        />
      )}
    </div>
  );
};

export default AllLAyout;
