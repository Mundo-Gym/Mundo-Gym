import {
  getCategories,
  createCategory,
  deleteCategories,
} from "../features/categorySlice";
import axios from "axios";

export const getCat = () => (dispatch) => {
  (async () => {
    await axios("https://api-mundo-gym.onrender.com/category")
      .then((res) => res)
      .then(({ data }) => {
        dispatch(getCategories(data));
      });
  })();
};

export const addCat = (name) => (dispatch) => {
  const url = "https://api-mundo-gym.onrender.com/category/";
  const data = { name };
  axios
    .post(url, data)
    .then((response) => {
      console.log("Respuesta:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  dispatch(createCategory());
};

export const deleteCategory = (id) => (dispatch) => {
  try {
    axios.delete(`https://api-mundo-gym.onrender.com/category/${id}`);
    return dispatch(deleteCategories());
  } catch (error) {
    return {
      error: "No se pudo eliminar la categoria",
      originalError: error,
    };
  }
};
