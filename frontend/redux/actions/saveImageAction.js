import { addImageFile } from "../features/saveImageSlice";
import axios from "axios";

export const addImageAction = (image)=>{
  return async function(dispatch){
    const response = await axios.post('https://api.cloudinary.com/v1_1/dal3gbqe2/image/upload',image)
    const data = await response.data
    return dispatch(addImageFile(data))
  }
}