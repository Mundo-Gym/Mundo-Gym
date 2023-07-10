import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    value: []
  },
  reducers: {
    getCategories: (state, action) => {
      state.value = [...action.payload]
    },
    createCategory: (state, action) => {
      return {
        value: [action.payload, ...state.value]
      }
    },
    deleteCategories: (state, action) => {
      console.log(state)
    }
  }
})

export const { getCategories, deleteCategories, createCategory } = categorySlice.actions

export default categorySlice.reducer