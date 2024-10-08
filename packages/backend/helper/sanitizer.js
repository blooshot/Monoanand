module.exports = function (req, res, next) {
  if (req.body) {
    if (req.body instanceof Array) {
      console.log("Arr");
    } else {
    }
  }

  next();
};

// module.exports = function (req, res, next) {
//   let errResponse = {};
//   try {
//     console.log(typeof req.body);
//     /* input = input.replace(/<[^>]*>/g, "");
//     // Escape special characters for HTML
//     input = input
//       .replace(/&/g, "&amp;")
//       .replace(/</g, "&lt;")
//       .replace(/>/g, "&gt;")
//       .replace(/"/g, "&quot;")
//       .replace(/'/g, "&#039;");

//     // Remove extra whitespace
//     input = input.trim().replace(/\s+/g, " "); */
//   } catch (e) {}
//   /*  if (e.errors) {
//     for (errfield in e.errors) {
//       errResponse[errfield] = e.errors[errfield].message;
//     }
//     console.log("forLoop");
//     return res.status(code).send(errResponse);
//   }
//   return e.message
//     ? res.status(code).send(e.message)
//     : res.status(code).send(e); */

//   //   next();
// };
