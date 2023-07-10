import { createSlice } from "@reduxjs/toolkit";

export const carStackSlice = createSlice({
    name:'stack',
    initialState: {
      value:[],
      total:0
    },
    reducers:{
      addCarProduct:(state, action)=>{
        const product = {
          ...action.payload,
          description:action.payload.description,
          unit_price:action.payload.price,
          quantity:1,
          currency_id:'ARS',
          title:action.payload.name
        }
        return{
          ...state,
          value:[...state.value,product]
        }
      },
      removeCarProduct:(state,action)=>{
        const removed = state.value.filter(f=>f.id !== action.payload)
        return{
          ...state,
          value:[...removed]
        }
      },
      addStorageProducts:(state,action)=>{
        return{
          ...state,
          value:[...action.payload]
        }
      },
      cleanStack:(state,action)=>{
        return{
          ...state,
          value:[]
        }
      },
      updateTotal:(state,action)=>{
        return{
          ...state,
          total:action.payload
        }
      },
      updateQuantity:(state,action)=>{
        const filtered = state.value.map(p=>{
          if(p.name === action.payload.name){
            return{
              ...p,
              quantity:action.payload.quantity
            }
          }
          return p
        })
        return{
          ...state,
          value:[...filtered]
        }

        // if(state.quantity.length){
        //   filtered = state.quantity.map((product)=>product.id !== action.payload.id)
        // }
      }
    }
})

export const {cleanStack,addCarProduct,removeCarProduct,addStorageProducts,updateProduct,updateQuantity,updateTotal} = carStackSlice.actions

export default carStackSlice.reducer