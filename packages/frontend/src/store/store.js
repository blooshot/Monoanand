import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import reducer from "./reducer";
// import todoSliceReducer from "./slices/todo/index";
import loggerMiddleware from "./middleware/logInMid";
// import errorToast from "./middleware/errorToast";
// import bugsApi from "./middleware/bugsApi";
import userApiSlice from "./api/userApi";
import studentApiSlice from "./api/studentApi";
// import { pokemonApi } from "./api/pokemon";
// import func from "./middleware/func";
// import logger from 'redux-logger'

// const middlewareEnhancer = applyMiddleware(logInMiddle);

export const store = configureStore({
  reducer, // rootReducer causes issue with RTK query
  // reducer: {
  //   [pokemonApi.reducerPath]: pokemonApi.reducer,
  //   [productApiSlice.reducerPath]: productApiSlice.reducer,
  // },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loggerMiddleware({ mchima: "chima" }),
      //errorToast,
      // pokemonApi.middleware,
      userApiSlice.middleware,
      studentApiSlice.middleware
      // bugsApi
    ),
});

setupListeners(store.dispatch);

/* import { legacy_createStore } from "redux";
import reducer from "./reducer";
import { todoSlice } from './slices/todo/index';

const store = legacy_createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
 */
