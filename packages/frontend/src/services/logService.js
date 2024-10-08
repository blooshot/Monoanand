function init() {
  // initilization / config of logging service,
  console.warn("Logs initilized");
}
// console.log(process.env);
function log(error) {
  // send Data to server, for saving logs data
  console.log(error);
}

export default {
  init,
  log,
};
