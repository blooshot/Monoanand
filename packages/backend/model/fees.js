const Joi = require("joi");
const mongoose = require("mongoose");
// const Student = require("./students");

const feeSchema = new mongoose.Schema(
  {
    /* stuid: {
      type: mongoose.ObjectId,
      ref: "Student",
    }, */
    stuid: {
      type: mongoose.ObjectId,
      ref: "Students",
    },
    submitted_date: { type: Date, required: true },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    status: { type: Boolean, default: false },
    amount: { type: Number, min: 100, max: 5000, required: true },
    payment_id: { type: String, minlength: 10, maxlength: 30 },
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
    // strictPopulate: false,
  }
);

const Fees = mongoose.model("Fees", feeSchema);

const isValidObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

const schema = Joi.object({
  stuid: Joi.string().custom(isValidObjectId).required(),
  submitted_date: Joi.date().required(),
  from: Joi.date().required().required(),
  to: Joi.date().required().required(),
  // status: Joi.boolean(), // submitted
  amount: Joi.number().min(100).max(5000).required(),
  payment_id: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9_]{10,30}$"))
    .min(10)
    .max(30),
});

const validateFee = (dataRequest) => {
  const { error } = schema.validate(dataRequest);
  if (error) {
    return error.details[0].message;
  }
  return null;
};

exports.Fee = Fees;
exports.validate = validateFee;
