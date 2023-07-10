import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    value: [],
    productReview: [],
    productById: [],
    find: [],
    flag: false,
  },
  reducers: {
    getSearchByAZ: (state, action) => {
      state.find = action.payload;
    },
    getSearchByZA: (state, action) => {
      state.find = action.payload;
    },
    getNameByMm: (state, action) => {
      state.find = action.payload;
    },
    getNameBymM: (state, action) => {
      state.find = action.payload;
    },
    getProducts: (state, action) => {
      state.value = action.payload;
    },
    getByAZ: (state, action) => {
      state.value = action.payload;
    },
    getByZA: (state, action) => {
      state.value = action.payload;
    },
    getByMm: (state, action) => {
      state.value = action.payload;
    },
    getBymM: (state, action) => {
      state.value = action.payload;
    },
    getProdById: (state, action) => {
      return {
        ...state,
        productById: action.payload,
      };
    },

    getProductReview: (state, action) => {
      return {
        ...state,
        productReview: action.payload,
      };
    },
    createProduct: (state, action) => {
      return {
        ...state,
        value: [action.payload, ...state.value],
      };
    },
    getProductsByCategory: (state, action) => {
      state.value = [...action.payload];
    },
    getProductsBySubCategory: (state, action) => {
      state.value = [...action.payload];
    },
    searchProduct: (state, action) => {
      return {
        ...state,
        find: [...action.payload],
      };
    },
    setFlag: (state, action) => {
      return {
        ...state,
        flag: action.payload,
      };
    },
    clearFind: (state, action) => {
      return {
        ...state,
        find: [...action.payload],
      };
    },
    cleanProductById: (state, action) => {
      return {
        ...state,
        productById: [],
      };
    },
  },
});

export const {
  getByAZ,
  getSearchByAZ,
  getSearchByZA,
  getByZA,
  getByMm,
  getBymM,
  getNameByMm,
  getNameBymM,
  getProducts,
  createProduct,
  searchProduct,
  getProdById,
  getProductReview,
  cleanProductById,
  getProductsByCategory,
  getProductsBySubCategory,
  setFlag,
  clearFind,
} = productsSlice.actions;

export default productsSlice.reducer;
