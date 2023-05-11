const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

//Income schema
const incomeSchema = mongoose.Schema(
  {
    title: {
      required: [true, "title is required"],
      type: String,
    },
    description: {
      required: [true, "Description is required"],
      type: String,
    },
    amount: {
      required: [true, "Amount is required"],
      type: Number,
    },
    type: {
      type: String,
      default: "Income",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  {
    timestamps: true,
    // toJSON: {
    //   virtuals: true,
    // },
    // toObject: {
    //   virtuals: true,
    // },
  }
);

incomeSchema.plugin(mongoosePaginate);

const income = mongoose.model("income", incomeSchema);

module.exports = income;
