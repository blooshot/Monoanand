module.exports = function (e, res, code) {
  let errResponse = {};

  if (e.errors) {
    for (errfield in e.errors) {
      errResponse[errfield] = e.errors[errfield].message;
    }
    console.log("forLoop");
    return res.status(code).send(errResponse);
  }
  return e.message
    ? res.status(code).send(e.message)
    : res.status(code).send(e);
};
