import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
    name:'favorites',
    initialState: {
      value:[]
    },
    reducers:{
      addFavorite:(state, action)=>{
        return{
          ...state,
          value:[...state.value,action.payload]
        }
      },
      removeFavorite:(state,action)=>{
        const removed = state.value.filter(f=>f.id !== action.payload)
        return{
          ...state,
          value:[...removed]
        }
      }
    }
})

export const {addFavorite,removeFavorite} = favoriteSlice.actions

export default favoriteSlice.reducer