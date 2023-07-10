import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from './features/favoriteSlice'
import productsReducer from './features/productsSlice'
import productsByCategoryReducer from './features/productsByCategorySlice'
import categoryReducer from './features/categorySlice'
import subCategoryReducer from './features/subCategorySlice'
import userReducer from './features/userSlice'
import carStackReducer from './features/carStackSlice'
import paginateReducer from "./features/paginateSlice";
import saveImageFileReducer from "./features/saveImageSlice";
import orderItemsSliceReducer from "./features/orderItemsSlice";

export const store = configureStore({
  reducer:{
    favorites:favoriteReducer,
    products:productsReducer,
    categories:categoryReducer,
    subCategories:subCategoryReducer,
    user:userReducer,
    stack:carStackReducer,
    productsByCategory:productsByCategoryReducer,
    numPaginate:paginateReducer,
    imageFile:saveImageFileReducer,
    orderItems:orderItemsSliceReducer
  }
})
