import {
  getByAZ,
  getByZA,
  getByMm,
  getBymM,
  getNameByMm,
  getNameBymM,
  getSearchByAZ,
  getSearchByZA,
} from "../features/productsSlice";
import axios from "axios";

const API_URL = "https://api-mundo-gym.onrender.com";
const az = "AZ";
const za = "ZA";
const mayorm = "Mm";
const menorM = "mM";

export const getOrderAlphabeticAZ = () => {
  return async function (dispatch) {
    const response = await axios.get(`${API_URL}/order/alphabetic/${az}`);
    const data = response.data;
    dispatch(getByAZ(data));
  };
};

export const getOrderAlphabeticZA = () => {
  return async function (dispatch) {
    const response = await axios.get(`${API_URL}/order/alphabetic/${za}`);
    const data = response.data;
    dispatch(getByZA(data));
  };
};
export const getOrderPriceMm = () => {
  return async function (dispatch) {
    const response = await axios.get(`${API_URL}/order/price/${mayorm}`);
    const data = response.data;
    dispatch(getByMm(data));
  };
};
export const getOrderPricemM = () => {
  return async function (dispatch) {
    const response = await axios.get(`${API_URL}/order/price/${menorM}`);
    const data = response.data;
    dispatch(getBymM(data));
  };
};

export const getOrderPriceCategoryMm = (flag) => {
  return async function (dispatch) {
    const response = await axios.get(`${API_URL}/order/price/${mayorm}`);
    const data = response.data;
    const filterByFlag = data.filter((p) => p.categoryId === flag);
    dispatch(getByMm(filterByFlag));
  };
};

export const getOrderPriceCategorymM = (flag) => {
  return async function (dispatch) {
    const response = await axios.get(`${API_URL}/order/price/${menorM}`);
    const data = response.data;
    const filterByFlag = data.filter((p) => p.categoryId === flag);
    dispatch(getBymM(filterByFlag));
  };
};
export const getOrderCategoryAlphabeticAZ = (flag) => {
  return async function (dispatch) {
    const response = await axios.get(`${API_URL}/order/alphabetic/${az}`);
    const data = response.data;
    const filterByFlag = data.filter((p) => p.categoryId === flag);
    dispatch(getByAZ(filterByFlag));
  };
};
export const getOrderCategoryAlphabeticZA = (flag) => {
  return async function (dispatch) {
    const response = await axios.get(`${API_URL}/order/alphabetic/${za}`);
    const data = response.data;
    const filterByFlag = data.filter((p) => p.categoryId === flag);
    dispatch(getByZA(filterByFlag));
  };
};

export const getOrderPriceNamemM = (flag) => {
  return async function (dispatch) {
    const response = await axios.get(`${API_URL}/order/price/${menorM}`);
    const data = response.data;
    const filterByFlag = data.filter((p) =>
      p.name.toLowerCase().includes(flag.toLowerCase())
    );
    dispatch(getNameBymM(filterByFlag));
  };
};
export const getOrderPriceNameMm = (flag) => {
  return async function (dispatch) {
    const response = await axios.get(`${API_URL}/order/price/${mayorm}`);
    const data = response.data;
    const filterByFlag = data.filter((p) =>
      p.name.toLowerCase().includes(flag.toLowerCase())
    );
    dispatch(getNameByMm(filterByFlag));
  };
};
export const getOrderNameAlphabeticAZ = (flag) => {
  return async function (dispatch) {
    const response = await axios.get(`${API_URL}/order/alphabetic/${az}`);
    const data = response.data;
    const filterByFlag = data.filter((p) =>
      p.name.toLowerCase().includes(flag.toLowerCase())
    );
    dispatch(getSearchByAZ(filterByFlag));
  };
};
export const getOrderNameAlphabeticZA = (flag) => {
  return async function (dispatch) {
    const response = await axios.get(`${API_URL}/order/alphabetic/${za}`);
    const data = response.data;
    const filterByFlag = data.filter((p) =>
      p.name.toLowerCase().includes(flag.toLowerCase())
    );
    dispatch(getSearchByZA(filterByFlag));
  };
};
//-----------------------------------------------------------------------
export const getOrderPriceSubCategoryMm = (flag) => {
  return async function (dispatch) {
    const response = await axios.get(`${API_URL}/order/price/${mayorm}`);
    const data = response.data;
    const filterByFlag = data.filter((p) => p.categoryId === flag);
    dispatch(getByMm(filterByFlag));
  };
};

export const getOrderPriceSubCategorymM = (flag) => {
  return async function (dispatch) {
    const response = await axios.get(`${API_URL}/order/price/${menorM}`);
    const data = response.data;
    const filterByFlag = data.filter((p) => p.categoryId === flag);
    dispatch(getBymM(filterByFlag));
  };
};
export const getOrderSubCategoryAlphabeticAZ = (flag) => {
  console.log(flag);
  return async function (dispatch) {
    const response = await axios.get(`${API_URL}/order/alphabetic/${az}`);
    const data = response.data;
    const filterByFlag = data.filter((p) => {
      console.log(p);
      // for (let i = 0; i < p.subcategories.length; i++) {
      //   if(p.subcategories[1].name === flag){
      //     return p
      //   }
      // }
    });
    dispatch(getByAZ(filterByFlag));
  };
};
export const getOrderSubCategoryAlphabeticZA = (flag) => {
  return async function (dispatch) {
    const response = await axios.get(`${API_URL}/order/alphabetic/${za}`);
    const data = response.data;
    const filterByFlag = data.filter((p) => p.categoryId === flag);
    dispatch(getByZA(filterByFlag));
  };
};
