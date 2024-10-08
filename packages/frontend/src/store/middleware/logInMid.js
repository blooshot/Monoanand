const loggerMiddleware = (param) => (storeAPI) => (next) => (action) => {
  // console.log("MyPram", param);
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", storeAPI.getState());
  return result;
};

export default loggerMiddleware;
