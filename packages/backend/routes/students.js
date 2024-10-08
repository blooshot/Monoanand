const express = require("express");
const router = express.Router();
// const moment = require("moment");
const moment = require("moment-timezone");
const _ = require("lodash");
// const bcrypt = require("bcrypt");
const { Students, validate } = require("../model/students");
const parseError = require("../helper/error_parser");
require("express-async-errors");
const mongoose = require("mongoose");
const authenticate = require("../middleware/authenticate");
// const xss = require("xss");
/* const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
 */

const accessField = [
  "name",
  "email",
  "contact",
  "class",
  "father_name",
  "profile_img",
  "gender",
];

router.get("/", [], async (req, res) => {
  const allStudents = await Students.find({ is_deleted: false })
    .where({})
    .select([
      "_id",
      "name",
      "email",
      "contact",
      "class",
      "father_name",
      "profile_img",
    ]);

  res.status(200).send(allStudents);
});

router.get("/all", [], async (req, res) => {
  const currentMonth = moment().month() + 1;
  const allStudents = await Students.aggregate([
    {
      $lookup: {
        from: "fees",
        let: { studentId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$stuid", "$$studentId"] },
                  { $eq: [{ $month: "$submitted_date" }, currentMonth] }, // Filter by current month
                ],
              },
            },
          },
        ],
        as: "feeStatus",
      },
    },

    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        contact: 1,
        class: 1,
        father_name: 1,
        profile_img: 1,
        gender: 1,
        // feeStatus: "$feeStatus.stuid", // Extract fee status
        feeStatus: {
          // let: { docId: "$_id", stuID: "$feeStatus.stuid" },
          $cond: {
            if: { $gt: [{ $size: "$feeStatus" }, 0] }, // If feeStatus array is not empty
            then: "submit", // Fee has been submitted
            else: "notsubmit", // Fee has not been submitted
          },
        },
        fee_amount: { $arrayElemAt: ["$feeStatus.amount", 0] },
      },
    },
  ]);

  res.status(200).send(allStudents);
});

router.post("/", [], async (req, res) => {
  try {
    const error = validate(req.body);
    if (error) {
      throw error;
    }

    // let studentExists = await Students.find(
    //   _.pick(req.body, ["contact", "father_name"])
    // );
    // if (studentExists.length >= 3) {
    //   console.log("More than 3 child already");
    //   throw new Error("More than 3 child already");
    // }

    const createStudentObj = _.pick(req.body, accessField);

    const student = await new Students(createStudentObj).save();
    //  createUser.save();
    // const token = createUser.generateAuthToken();

    res.status(200).send(_.pick(student, accessField));
  } catch (e) {
    parseError(e, res, 400);
  }
});

router.put("/:id", [], async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const error = validate(req.body);
      if (error) {
        throw error;
      }

      const student = await Students.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      ).select(accessField);

      if (!student) {
        throw new Error("No record found");
      }

      return res.status(200).send(student);
    } else {
      throw new Error("bad request");
    }
  } catch (e) {
    parseError(e, res, 400);
  }
});

router.delete("/:id", [authenticate], async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const student = await Students.findByIdAndUpdate(
        req.params.id,
        { $set: { is_deleted: true } },
        {
          new: true,
        }
      ).select(accessField);

      if (!student) {
        throw new Error("No record found");
      }
      return res.status(200).send("Deleted Successfully");
    } else {
      throw new Error("Invalid request");
    }
  } catch (e) {
    parseError(e, res, 400);
  }
});

module.exports = router;
