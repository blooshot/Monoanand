import http from "./httpService";
import config from "./config";

function movieURL(id) {
  return `${config.vidlyEndpoint}/movies/${id}`;
}

export function getMovies() {
  return http.get(config.vidlyEndpoint + "/movies");
}

export function getMovie(movieID) {
  //   console.log("getingMovbiew");
  return http.get(movieURL(movieID));
}

export function saveMovie(movie) {
  // http.post(config.vidlyEndpoint + "/movies/")

  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieURL(movie._id), body);
  }
  return http.post(config.vidlyEndpoint + "/movies/", movie);
}

export function deleteMovie(movieId) {
  return http.delete(movieURL(movieId));
}
