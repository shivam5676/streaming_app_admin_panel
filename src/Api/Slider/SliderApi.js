import axios from "axios";
  const connectionString = process.env.REACT_APP_API_URL;
export const addSliderApi = async (formdata) => {

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

export const deleteSliderApi = async (id) => {
  console.log(id);

  try {
    const response = await axios.delete(
      `${connectionString}/admin/deleteSlider/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return id;
    // dispatch(sliderSliceACtion.deleteSlider(id));
    // toast.success("movie deleted successfully");
  } catch (err) {
    throw new Error(err);
  }
};

export const allSlidersApi = async () => {
  console.log(connectionString)
  try {
    const res = await axios.get(`${connectionString}/admin/allSliders`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return res;
  } catch (err) {
    console.log(err)
    throw new Error(err);
  }
};