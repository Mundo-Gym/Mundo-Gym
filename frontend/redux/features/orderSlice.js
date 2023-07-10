import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    value: [],

  },
  reducers: {
    getByAZ: (state, action) => {
      state.value = action.payload
    },

    getByZA: (state, action) => {
      state.value = action.payload
    },

    getByMm: (state, action) => {
      state.value = action.payload
    },

    getBymM: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { } = orderSlice.actions

export default orderSlice.reducer