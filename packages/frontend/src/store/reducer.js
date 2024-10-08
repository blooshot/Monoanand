// import { combineReducers } from "redux";
// import { entities} from "./entities";
import { combineReducers } from "@reduxjs/toolkit";
import { entitiesCombined } from "./entities";
// import { pokemonApi } from "./api/pokemon";
import userApiSlice from "./api/userApi";
import studentApiSlice from "./api/studentApi";

export default combineReducers({
  entities: entitiesCombined,
  // [pokemonApi.reducerPath]: pokemonApi.reducer,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [studentApiSlice.reducerPath]: studentApiSlice.reducer,
});
