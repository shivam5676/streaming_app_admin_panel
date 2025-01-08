import {
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import React, { useEffect, useRef, useState } from "react";
import movieIcon from "../../assests/movie-animate.gif";
import webseriesIcon from "../../assests/webseriesIcon-animate.gif";
import layoutIcon from "../../assests/layout-animate.gif";
import sliderIcon from "../../assests/slider-card-animate.gif";

import ProductReportCard from "./ProductReportCard";

import axios from "axios";

import { useSelector } from "react-redux";
import ViewsComparisonGraph from "./viewsComparisonGraph";
import Top3MovieANdWebseries from "./Top3MovieANdWebseries";
import NewUSersList from "./NewUSersList";
import {
  fetchContentViewsApi,
  fetchDashboardDataApi,
  fetchLatestUsersApi,
  fetchTopContentDataApi,
} from "../../Api/Dashboard/dashboardApi";
import TimeSelector from "./timeSelector";

const DashBoard = () => {
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  const [cardsData, setCardsData] = useState({});
  const [contentViews, setContentViews] = useState({});
  const [fetchingType, setFetchingType] = useState("All");
  const [top3data, setTop3data] = useState();
  const [latestUsers, setLatestUsers] = useState([]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const data = await fetchDashboardDataApi(fetchingType);
        setCardsData(data);
      } catch (error) {}
    }

    fetchDashboardData();
  }, [fetchingType]);
  useEffect(() => {
    async function fetchTopContentData() {
      try {
        const data = await fetchTopContentDataApi(fetchingType);
        setTop3data(data);
      } catch (error) {}
    }
    fetchTopContentData();
  }, [fetchingType]);
  useEffect(() => {
    async function fetchContentViews() {
      try {
        const data = await fetchContentViewsApi(fetchingType);
        if (data) {
          setContentViews(data);
        }
      } catch (error) {}
    }
    fetchContentViews();
  }, [fetchingType]);
  useEffect(() => {
    async function fetchLAtestUSers() {
      try {
        const data = await fetchLatestUsersApi(fetchingType);
        setLatestUsers(data);
      } catch (error) {}
    }
    fetchLAtestUSers();
  }, [fetchingType]);

  const handleSelectChange = (data) => {
    console.log(data);
    setFetchingType(data);
  };
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll customScrollbar px-4 py-2">
      <div
        className={`${
          selectedTheme === "modern reeloid" ? "text-white" : "text-white"
        }  px-2 py-2 `}
      >
        <div className="text-[.9rem] font-bold flex justify-between items-center">
          <p className="text-[1rem] font-semibold">DashBoard</p>
          <TimeSelector
            timeSelector={handleSelectChange}
            fetchingType={fetchingType}
          />
        </div>
        <p
          className={`text-[.9rem] font-semibold ${
            selectedTheme === "modern reeloid" ? "text-white" : "text-gray-400"
          }`}
        >
          <span>Welcome to Reelies Dashboard</span>
        </p>
        {
          <section className="w-[100%]  grid xl:grid-cols-4 sm:grid-cols-2  gap-4 py-2">
            <ProductReportCard
              name={"Movie"}
              cardIcon={movieIcon}
              published={cardsData?.movies?.visibleTrueCount || "0"}
              UnPublished={cardsData?.movies?.visibleFalseCount || "0"}
              loading={cardsData && Object.values(cardsData).length == 0}
            />

            <ProductReportCard
              name={"WebSeries"}
              cardIcon={webseriesIcon}
              published={cardsData?.webSeries?.visibleTrueCount || "0"}
              UnPublished={cardsData?.webSeries?.visibleFalseCount || "0"}
              loading={cardsData && Object.values(cardsData).length == 0}
            />
            <ProductReportCard
              name={"Layouts"}
              cardIcon={layoutIcon}
              published={cardsData?.layouts?.visibleTrueCount || "0"}
              UnPublished={cardsData?.layouts?.visibleFalseCount || "0"}
              loading={cardsData && Object.values(cardsData).length == 0}
            />
            <ProductReportCard
              name={"Sliders"}
              cardIcon={sliderIcon}
              published={cardsData?.sliders?.visibleTrueCount || "0"}
              UnPublished={cardsData?.sliders?.visibleFalseCount || "0"}
              loading={cardsData && Object.values(cardsData).length == 0}
            />
          </section>
        }
        <section className="w-[100%]   py-2 ">
          <div className="gap-4 w-[100%] flex flex-col md:flex-row  ">
            <ViewsComparisonGraph contentViews={contentViews} />

            <Top3MovieANdWebseries top3data={top3data} />
          </div>
        </section>

        <NewUSersList latestUsers={latestUsers} />
      </div>
    </div>
  );
};

export default DashBoard;
