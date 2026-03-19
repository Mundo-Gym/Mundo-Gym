import {
  getSubCategories,
  createSubCategory,
  deleteSubCategory,
} from "../features/subCategorySlice";
import axios from "../../lib/api";

export const getSubCats = () => (dispatch) => {
  (async () => {
    const subCategories = await axios("/api/subcategories").then(({ data }) => data);
    dispatch(getSubCategories(subCategories));
  })();
};

export const addSubCategory = (name) => (dispatch) => {
  const url = "/api/subcategories";
  const data = { name };
  axios
    .post(url, data)
    .then((response) => {
      console.log("Respuesta:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  dispatch(createSubCategory());
};

export const deleteSubCateg = (id) => (dispatch) => {
  try {
    axios.delete(`/api/subcategories/${id}`);
    return dispatch(deleteSubCategory());
  } catch (error) {
    return {
      error: "No se pudo eliminar la Subategoria",
      originalError: error,
    };
  }
};
