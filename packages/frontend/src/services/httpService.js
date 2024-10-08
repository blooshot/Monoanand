import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";
// import auth from "@/services/authService";

// axios.defaults.headers.common["x-auth-token"] = auth.getJwt();

// axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast("unexpected error occured");
  }

  return Promise.reject(error);
});


function setJWT(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJWT,

};
