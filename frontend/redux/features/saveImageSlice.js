import { createSlice } from "@reduxjs/toolkit";

export const saveImageFile = createSlice({
  name: 'imageFile',
  initialState: {
    value: '',
  },
  reducers: {
    addImageFile: (state, action) => {
      returnm = {
        ...state,
        value:action.payload.secretURL
      }
    }
  }
})


export const { addImageFile } = saveImageFile.actions

export default saveImageFile.reducer