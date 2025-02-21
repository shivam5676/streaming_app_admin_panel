import axios from "axios";

const connectionString = process.env.REACT_APP_API_URL;

export const AddLayoutApi = async (data) => {
  try {
    const response = await axios.post(
      `${connectionString}/admin/addLayout`,
      data,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response;
  } catch (err) {
    throw err;
  }
};
export const deleteLayoutsApi = async (id) => {
  try {
    const response = await axios.delete(
      `${connectionString}/admin/deleteLayout/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return id;
  } catch (err) {}
  throw err;
};
export const allLayoutsApi = async (start, limit, searchedQuery) => {
  try {
    const res = await axios.get(
      `${connectionString}/admin/allLayouts?start=${start}&limit=${limit}&searched=${searchedQuery}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return res;
  } catch (err) {
    // console.log(err);
    throw err;
  }
};
export const deleteLinkedMoviesApi = async (movieId, layoutId) => {
  try {
    const deleteMoviesResponse = await axios.post(
      `${connectionString}/admin/deleteLinkedMovie`,
      { movieId: movieId, LayoutId: layoutId },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return true;
  } catch (err) {
    throw err;
  }
};
