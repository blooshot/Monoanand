// import { combineReducers } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
/*import cartSliceReducer from "./slices/cartSlice";
import todoSliceReducer from "./slices/todoSlice";
import userSliceReducer from "./slices/userSlice";
import bugSliceReducer from "./slices/bugSlice";
import productApiSlice from "./api/productApi";
import { pokemonApi } from "./api/pokemon"; */
import userSlice from "./slices/userSlice";
import students from "./slices/students";

export const entitiesCombined = combineReducers({
  user: userSlice,
  students: students,
  /* todo: todoSliceReducer,
  cart: cartSliceReducer,
  auth: userSliceReducer,
  bugs: bugSliceReducer, */
  // [pokemonApi.reducerPath]: pokemonApi.reducer,
});
