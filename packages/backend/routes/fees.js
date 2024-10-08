const express = require("express");
const router = express.Router();
const moment = require("moment");
var _ = require("lodash");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Fee, validate } = require("../model/fees");
const parseError = require("../helper/error_parser");
require("express-async-errors");
/* const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
 */

router.get("/", async (req, res) => {
  /*  const result = await Fee.aggregate([
    {
      $match: {
        $expr: { $eq: [{ $month: "$submitted_date" }, 9] },
      },
    },
  ]); */

  /*  const result = await Fee.find({
    $and: [
      { stuid: "66ded570f60a53e16b6789b7" },
      { $expr: { $eq: [{ $month: "$submitted_date" }, 10] } },
    ],
  }).select(); */

  const result = await Fee.find({
    $expr: { $eq: [{ $month: "$submitted_date" }, 9] },
  })
    // .and({ stuid: "66ded570f60a53e16b6789b7" })
    .populate("stuid", "name email -_id")
    .select();

  res.status(200).send(result);
});

router.post("/", async (req, res) => {
  try {
    const error = validate(req.body);
    if (error) {
      throw error;
    }

    let currentMonth = parseInt(req.body.submitted_date.split("-")[1]);

    const feeList = await Fee.find({
      $expr: { $eq: [{ $month: "$submitted_date" }, currentMonth] },
    })
      .and({ stuid: req.body.stuid })
      .populate("stuid", ["name", "email"])
      .select();

    if (feeList.length > 0) {
      throw new Error(`Fee already submitted for ${feeList[0].stuid.name}`);
    }

    const createFeeObj = _.pick(req.body, [
      "stuid",
      "submitted_date",
      "from",
      "to",
      "amount",
      "payment_id",
    ]);
    createFeeObj.status = true;
    //66ded570f60a53e16b6789b7  KK
    //66deea52200846e8491868b0 SHI
    //66ded58bf60a53e16b6789ba BH
    // 66ded58bf60a53e16b6789ba
    const createFee = await new Fee(createFeeObj).save();
    // const createFee = new Fee(createFeeObj);

    // createUserObj.password = bcrypt.hashSync(createUserObj.password, 10); // hasing password with salt 10
    // createUserObj.is_active = true; // hasing password with salt 10

    // await createUser.save();
    // const token = createUser.generateAuthToken();

    res.status(200).send(createFee);
  } catch (e) {
    parseError(e, res, 400);
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const error = validate(req.body);
      if (error) {
        throw error;
      }

      const UpdatedFee = await Fee.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).select();

      if (!UpdatedFee) {
        throw new Error("No record found");
      }

      return res.status(200).send(UpdatedFee);
    } else {
      throw new Error("bad request");
    }
  } catch (e) {
    parseError(e, res, 400);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const updatedFee = await Fee.findByIdAndUpdate(
        req.params.id,
        { $set: { is_deleted: true } },
        {
          new: true,
        }
      ).select();

      if (!updatedFee) {
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
