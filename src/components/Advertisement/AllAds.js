import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const AllAds = () => {
    const params=useParams()
    const connectionString = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const id = params.edit;
    async function fetchAds() {
      const response = await axios.get(
        `${connectionString}/admin/getAds`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      // return
    }

    fetchAds();
  }, []);
  return <div>AllAds</div>;
};

export default AllAds;
