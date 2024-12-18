import axios from "axios";

export const addSliderApi = async (formdata) => {
  const connectionString = process.env.REACT_APP_API_URL;
  try {
    const response = await axios.post(
      `${connectionString}/admin/addSlider`,
      formdata,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    console.log(response);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};
