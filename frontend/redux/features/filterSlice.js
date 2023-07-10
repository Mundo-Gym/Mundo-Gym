import { createSlice } from '@reduxjs/toolkit';

export const filtrosSlice = createSlice({
  name: 'filtros',
  initialState: {
    value: {
      order: '',
      brand: '',
      minPrice: 0,
      maxPrice: Infinity
    }
  },
  reducers: {
    setOrder: (state, action) => {
      return {
        ...state,
        value: {
          ...state.value,
          order: action.payload
        }
      };
    },
    setBrand: (state, action) => {
      return {
        ...state,
        value: {
          ...state.value,
          brand: action.payload
        }
      };
    },
    setMinPrice: (state, action) => {
      return {
        ...state,
        value: {
          ...state.value,
          minPrice: action.payload
        }
      };
    },
    setMaxPrice: (state, action) => {
      return {
        ...state,
        value: {
          ...state.value,
          maxPrice: action.payload
        }
      };
    }
  }
});

export const { setOrder, setBrand, setMinPrice, setMaxPrice } = filtrosSlice.actions;