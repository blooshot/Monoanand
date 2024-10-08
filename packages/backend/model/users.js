const Joi = require("joi");
const mongoose = require("mongoose");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [5, "min 5 character required"],
    maxlength: [30, "mix 30 character required"],
    required: true,
  },
  email: {
    type: String,
    minlength: [10, "too small"],
    maxlength: [255, "too long"],
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [10, "too small"],
    maxlength: [1024, "too long"],
  },
  is_active: { type: Boolean, default: false },
  is_admin: { type: Boolean, default: false },
  last_update_at: { type: Date, default: Date.now, required: true },
  last_login: { type: Date, default: Date.now, required: true },
  roles: { type: [String], required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      user: this._id,
      roles: this.roles,
      admin: this.is_admin,
      //   last_login: this.last_login,
    },
    config.get("jwtPrivateKey")
  );
  // console.log({
  //   user: this._id,
  //   roles: this.roles,
  //   admin: this.is_admin,
  //   // last_login: this.last_login,
  // });
  return token;
};

/* userSchema.methods.setLastLogin = function () {
  const currentObj = this;
  currentObj.last_login = moment().format("YYYY-MM-DD HH:mm:ss");
  return currentObj;
}; */

const User = mongoose.model("Users", userSchema);

const schema = Joi.object({
  name: Joi.string().alphanum().min(5).max(30).required(),
  email: Joi.string()
    .min(10)
    .max(255)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string()
    .min(10)
    .max(255)
    .pattern(new RegExp("^[a-zA-Z0-9@_.]{3,30}$"))
    .required(),
  last_login: Joi.date().required(),
  roles: Joi.array()
    .items(Joi.string().valid("create", "read", "update"))
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .min(10)
    .max(255)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string()
    .min(10)
    .max(255)
    .pattern(new RegExp("^[a-zA-Z0-9@_.]{3,30}$"))
    .required(),
});

const validateUser = (dataRequest, validationType) => {
  const { error } =
    validationType === "login"
      ? loginSchema.validate(dataRequest)
      : schema.validate(dataRequest);

  if (error) {
    return error.details[0].message;
  }
  return null;
};

exports.User = User;
exports.validate = validateUser;
