import axios from "axios";
import { toast } from "react-toastify";

const connectionString = process.env.REACT_APP_API_URL;

export const fetchDashboardDataApi = async (fetchingType) => {
  try {
    const response = await axios.get(
      `${connectionString}/admin/getDashboard/${fetchingType}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      } //all,year,month
    );
    console.log(response, "cards....>");
    return response?.data;
    // setCardsData(response.data);
  } catch (error) {
    throw error;
  }
};

export const fetchTopContentDataApi = async (fetchingType) => {
  try {
    const response = await axios.get(
      `${connectionString}/admin/fetchTopMovies/${fetchingType}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      } //all,year,month
    );
    console.log(response.data.movies, "top3");
    if (response.data.movies) {
      return response.data.movies;
    }

    // setTop3data
  } catch (error) {
    throw error;
  }
};
export const fetchContentViewsApi = async (fetchingType) => {
  try {
    const response = await axios.get(
      `${connectionString}/admin/getContentViews/${fetchingType}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      } //all,year,month
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchLatestUsersApi = async (fetchingType) => {
  console.log("hello");
  try {
    const response = await axios.get(
      `${connectionString}/admin/fetchLatestUsers/${fetchingType}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      } //all,year,month
    );
    console.log(response, "latestUSers");
    // setLatestUsers(response.data.users);
    return response.data.users;
    // setContentViews(response.data);
  } catch (error) {
    throw error;
  }
};
