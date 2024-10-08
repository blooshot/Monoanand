import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const setAllStudent = (state, action) => {
  /*  state.token = action.payload;
  state.userData = jwtDecode(action.payload); */
  state = [...action.payload];
  return state;
  //   console.log("stu1:", action.payload);
  //   console.log("stu2:", state);
};

const updateOneStudent = (state, action) => {
  const existingStudent = state.filter(
    (student) => action.payload._id === student._id
  );
  const index = _.findIndex(state, { _id: action.payload._id });
  const currentState = [...state];

  currentState[index] = { ...action.payload };
  state = currentState;
  return state;
  /* if (index !== -1) {
  // If found, update the object
  arr[index] = { ...arr[index], ...newObj };
} else {
  // If not found, add the new object
  arr.push(newObj);
} */
  console.log("updSLN:", currentState[index]);
};

const studentsSlice = createSlice({
  name: "students",
  initialState: [],
  reducers: {
    // setToken: (state, action) => {
    //   state.token = action.payload;
    // },
    setStudents: setAllStudent,
    updateStudentSlice: updateOneStudent,
    /* setUserData: (state, action) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.userData = null;
      localStorage.removeItem("token");
    }, */
  },
});

export const { setStudents, updateStudentSlice } = studentsSlice.actions;
export default studentsSlice.reducer;
