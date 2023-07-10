import { createSlice } from "@reduxjs/toolkit";

export const subCategorySlice = createSlice({
    name:'subCategories',
    initialState: {
      value:[]
    },
    reducers:{
      getSubCategories:(state, action)=>{
        return{
          ...state,
          value:[...action.payload]
        }
      },
      createSubCategory:(state,action)=>{
        return{
          ...state,
          value:[action.payload,...state.value]
        }
      },
      deleteSubCategory:(state,action)=>{
        console.log(state)
      }
    }
})

export const {getSubCategories,deleteSubCategory,createSubCategory} = subCategorySlice.actions

export default subCategorySlice.reducer