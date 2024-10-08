const Joi = require("joi");
const mongoose = require("mongoose");
const config = require("config");
const s3path = config.get("s3path");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [5, "min 5 character required"],
      maxlength: [30, "mix 30 character required"],
      required: true,
    },
    email: {
      type: String,
      minlength: [10, "min 5 character required"],
      maxlength: [255, "mix 255 character required"],
      required: true,
    },
    contact: { type: String, minlength: 10, maxlength: 12, required: true },
    class: { type: Number, min: 1, max: 10, required: true },
    father_name: {
      type: String,
      minlength: [5, "min 5 character required"],
      maxlength: [30, "mix 30 character required"],
    },
    profile_img: {
      type: String,
      // get: (v) => `${s3path}${v}`,
      set: (v) => `${s3path}${v}`,
      lowercase: true,
      trim: true,
    },
    gender: { type: String, minlength: 4, maxlength: 10, required: true },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

studentSchema.methods.generateAuthToken = function () {
  const token = {
    user: this._id,
  };
  console.log({
    user: this._id,
  });
  return token;
};

const Students = mongoose.model("Students", studentSchema);

const schema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
  email: Joi.string()
    .min(10)
    .max(255)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  contact: Joi.string()
    .pattern(new RegExp("^[0-9]{10,12}$"))
    .min(10)
    .max(12)
    .required(),
  class: Joi.number().positive().min(1).max(10).required(),
  father_name: Joi.string().min(5).max(30).required(),
  profile_img: Joi.string().min(5).max(30),
  gender: Joi.string().min(4).max(10).required(),
});

const validateStudent = (dataRequest) => {
  const { error } = schema.validate(dataRequest);
  if (error) {
    return error.details[0].message;
  }
  return null;
};

exports.Students = Students;
exports.validate = validateStudent;
