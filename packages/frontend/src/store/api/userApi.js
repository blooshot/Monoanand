import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../../config.json";
import axiosBaseQuery from "../middleware/axiosMid";

function serviceUrl(id) {
  return `${config.FMEndpoint}/user/login`;
}

const userApiSlice = createApi({
  reducerPath: "user",
  baseQuery: axiosBaseQuery({
    baseUrl: `${config.FMEndpoint}/user`,
  }),
  endpoints: (builder) => ({
    // return {
    /* loginUser: builder.query({
      query: (xst) => ({ url: "/login", method: "post", data: xst }),
    }), */
    loginUser: builder.mutation({
      query: (creds) => ({
        url: "/login",
        method: "POST",
        data: creds,
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

export const { useLoginUserMutation } = userApiSlice;
export default userApiSlice;
