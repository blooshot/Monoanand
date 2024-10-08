import http from "./httpService";
import config from "./config";

function serviceUrl(id) {
  return `${config.vidlyEndpoint}/users`;
}

export function register(user) {
  const body = {
    email: user.username,
    password: user.password,
    name: user.name,
  };
  return http.post(serviceUrl(), body);
}
