import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const setToken1 = (state, action) => {
  state.token = action.payload;
  state.userData = jwtDecode(action.payload);
  //   console.log("usL:", action.payload);
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    userData: null,
  },
  reducers: {
    // setToken: (state, action) => {
    //   state.token = action.payload;
    // },
    setToken: setToken1,
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.userData = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, setUserData, logout } = userSlice.actions;
export default userSlice.reducer;
