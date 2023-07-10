import axios from "axios";
import { getAllUsers } from "../features/userSlice";
import { getHistory } from "../features/orderItemsSlice";

export const getUsers = () => (dispatch) => {
  (async () => {
    const users = await axios("http://localhost:3001/auth/users").then(
      ({ data }) => data
    );
    dispatch(getAllUsers(users));
  })();
};

export const getAllHistory = (userId) => (dispatch) => {
  (async () => {
    const orders = await axios(
      `http://localhost:3001/auth/users/${userId}/compras`
    ).then(({ data }) => dispatch(getHistory(data)));
  })();
};

export const getAllUserHistory = (userId) => (dispatch) => {
  (async () => {
    const orders = await axios(`http://localhost:3001/auth/compras`).then(
      ({ data }) => dispatch(getHistory(data))
    );
  })();
};
