import { createSlice } from "@reduxjs/toolkit";

export const orderItemsSlice = createSlice({
  name: 'orderItems',
  initialState: {
    value: {},
    history:[]
  },
  reducers: {
    getOrderItem: (state, action) => {
      state.value = action.payload
    },
    postOrderItems: (state, action) => {
      return{
        userId:'',
        items:[],
        total:0
      }
    },
    getHistory: (state, action) => {
      state.history = action.payload
    },
  }
})

export const { getOrderItem,postOrderItems,getHistory } = orderItemsSlice.actions

export default orderItemsSlice.reducer