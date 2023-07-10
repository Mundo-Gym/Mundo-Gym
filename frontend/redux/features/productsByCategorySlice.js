import { createSlice } from "@reduxjs/toolkit";

export const productsByCategorySlice = createSlice({
    name:'productsByCategory',
    initialState: {
      value:[],
    },
    reducers:{
      cleanProductsByCategory:(state,action)=>{
          state.value=[]
      },
      filterCategoryByAZ: (state,action)=>{
        state.value = action.payload
      }
    }
})


export const {cleanProductsByCategory,getProductsByCategory,filterCategoryByAZ} = productsByCategorySlice.actions

export default productsByCategorySlice.reducer