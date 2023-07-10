import { createSlice } from "@reduxjs/toolkit";

export const paginateSlice = createSlice({
  name:'numPaginate',
  initialState:{
    value:1
  },
  reducers:{
    next:(state,action)=>{
      state.value= state.value + 1
    },
    back:(state,action)=>{
      state.value= state.value - 1
    },
    forceCurrent:(state,action)=>{
      state.value = action.payload
    }
  }
})

export const {next,back,forceCurrent} = paginateSlice.actions
export default paginateSlice.reducer