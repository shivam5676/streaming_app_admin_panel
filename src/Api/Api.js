import axios from "axios";
import { toast } from "react-toastify";

const connectionString = process.env.REACT_APP_API_URL;

export const doActionTask = async (apiEndpoint, movieID, data) => {
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
  } catch (error) {}
};
