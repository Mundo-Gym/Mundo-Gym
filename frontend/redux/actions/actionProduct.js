import {
  getProducts,
  createProduct,
  getProdById,
  searchProduct,
  ProductReview,
  getProductsByCategory,
  getProductsBySubCategory,
  setFlag,
} from "../features/productsSlice";
import axios from "../../lib/api";
import Swal from "sweetalert2";
require("dotenv").config();

export const getProd = () => (dispatch) => {
  (async () => {
    let products = await axios("/api/products/").then(({ data }) => {
      console.log("getProd: API response (products count):", data?.length, data && data.slice(0, 3));
      data.forEach((p) => {
        if (p.stock === 0 && p.visible) dispatch(switchProduct(p.id));
      });
      // Normalize backend product shape to frontend expected shape
      const mapped = data.map((p) => ({
        ...p,
        id: p._id || p.id,
        name: p.title || p.name,
        image: Array.isArray(p.images) ? p.images[0] : p.image || null,
        Category: p.categoryName || p.category || "Equipment",
        visible: typeof p.visible === "boolean" ? p.visible : true,
      }));
      console.log("getProd: mapped products sample:", mapped.slice(0, 3));
      return mapped;
    });

    return dispatch(getProducts(products));
  })();
};

export const getProdsByCat = (cat) => (dispatch) => {
  (async () => {
    const categoryProducts = await axios(`/api/filterByCategory?category=${cat}`).then(({ data }) => data);
    dispatch(getProductsByCategory(categoryProducts));
  })();
};

export const getProdsBySubCat = (subCat) => (dispatch) => {
  (async () => {
    const subCategoryProducts = await axios(`/api/filterSub?subcategory=${subCat}`).then(({ data }) => data);
    dispatch(getProductsBySubCategory(subCategoryProducts));
  })();
};

export const createProd = (prod) => (dispatch) => {
  const url = "/api/products/";
  axios
    .post(url, prod, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("Respuesta:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  dispatch(createProduct());
};

export const getProductById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/products/${id}`);
    const productById = response.data;
    dispatch(getProdById(productById));
  } catch (error) {
    console.log(error);
  }
};

// export const getProductReview = (id) => async (dispatch) => {
//   try {
//     const response = await axios.get(
//       `https://backend-production-f5c5.up.railway.app/products/${id}/review`
//     );
//     const productReview = response.data;
//     dispatch(ProductReview(productReview));
//   } catch (error) {
//     console.log(error);
//   }
// };
export const getProductByName = (name) => (dispatch) => {
  (async () => {
    try {
      const prodByName = await axios(`/api/products?name=${name}`).then(({ data }) => data);
      if (prodByName.length > 0) {
        dispatch(searchProduct(prodByName));
        dispatch(setFlag(`search/${name}`));
      }
    } catch (error) {
      return Swal.fire({
        position: "top",
        icon: "warning",
        title: "Producto no encontrado!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  })();
};

export const switchProduct = (id) => (dispatch) => {
  try {
    (async () => {
      const productById = await axios.put("/api/products/disableProduct", { id: id });
      dispatch(getProd());
    })();
  } catch (error) {
    alert("nada paso");
  }
};
