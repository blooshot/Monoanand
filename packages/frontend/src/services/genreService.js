import http from "./httpService";
import config from "./config";

export function getGenre() {
  return http.get(config.vidlyEndpoint + "/genres");
}
