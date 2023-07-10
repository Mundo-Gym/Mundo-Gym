import {
  getSubCategories,
  createSubCategory,
  deleteSubCategory,
} from "../features/subCategorySlice";
import axios from "axios";

export const getSubCats = () => (dispatch) => {
  (async () => {
    const subCategories = await axios(
      "https://backend-6ao2.onrender.com/subcategory"
    ).then(({ data }) => data);
    dispatch(getSubCategories(subCategories));
  })();
};

export const addSubCategory = (name) => (dispatch) => {
  const url = "https://backend-6ao2.onrender.com/subCategory";
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
    axios.delete(`https://backend-6ao2.onrender.com/subCategory/${id}`);
    return dispatch(deleteSubCategory());
  } catch (error) {
    return {
      error: "No se pudo eliminar la Subategoria",
      originalError: error,
    };
  }
};
