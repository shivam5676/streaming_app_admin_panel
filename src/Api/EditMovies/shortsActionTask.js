import axios from "axios";
import { toast } from "react-toastify";

const connectionString = process.env.REACT_APP_API_URL;

// api for multiple delete,multiple disabling /enabling  shorts
export const doActionTask = async (apiEndpoint, data) => {
  try {
    const response = await axios.post(
      `${connectionString}${apiEndpoint}`,
      data,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    console.log(response);
    toast.success("data updated successully");
    return true;
  } catch (error) {
     throw error
  }
};
// api for changing sequnce of shorts section videos
export const changeShortsSequence = async (apiEndpoint, movieId, data) => {
  try {
    const response = await axios.post(
      `${connectionString}${apiEndpoint}`,
      { movieId, sequenceData: data },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    toast.success("Sequence changed for selected Shorts");
    return true;
    console.log(response);
  } catch (error) {
     throw error
  }
};
