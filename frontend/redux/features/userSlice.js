import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'user',
    initialState: {
      value:{},
      allUsers:[]
    },
    reducers:{
      getUser:(state, action)=>{
        state.value = action.payload
      },
      createUser:(state,action)=>{
        return{
          ...state,
          value:[action.payload,...state.value]
        }
      },
      logoutUser:(state,action)=>{
        return{
          ...state,
          value:{}
        }
      },
      getAllUsers:(state, action)=>{
        if(state.allUsers === action.payload){
          return
        }else{
          state.allUsers = action.payload
        }
      },
    }
})


export const {getUser,logoutUser,createUser,getAllUsers} = userSlice.actions

export default userSlice.reducer