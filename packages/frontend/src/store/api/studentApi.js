import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../../config.json";
import axiosBaseQuery from "../middleware/axiosMid";

function serviceUrl(id) {
  return `${config.FMEndpoint}/student/`;
}

const studentApiSlice = createApi({
  reducerPath: "students",
  baseQuery: axiosBaseQuery({
    baseUrl: `${config.FMEndpoint}/student/`,
  }),
  endpoints: (builder) => ({
    // return {
    /* loginUser: builder.query({
      query: (xst) => ({ url: "/login", method: "post", data: xst }),
    }), */
    getAllStudents: builder.query({
      query: (param) => ({
        url: "/all",
        method: "GET",
        params: param,
      }),
    }),
    updateStudent: builder.mutation({
      query: ({ data, param }) => ({
        url: `${param}`,
        method: "PUT",
        data: data,
        // params: param,
      }),
    }),
    // mutation: build.mutation({
    //   query: () => ({ url: '/mutation', method: 'post' }),
    // }),
    // };
  }),
});

/* const productApiSlice = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "https://api.escuelajs.co/api/v1",
    }),
    endpoints: (build) => ({
      getProducts: build.query({
        query: (x) => ({ url: `/products` }),
        // queryfn: async (xMan)=> ({ url: '/products', method: 'get' })
      }),
    }),
  }); */

export const { useGetAllStudentsQuery, useUpdateStudentMutation } =
  studentApiSlice;
export default studentApiSlice;
