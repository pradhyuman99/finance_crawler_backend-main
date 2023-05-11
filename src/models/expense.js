const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const expenseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
    type: {
      type: String,
      default: "expense",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user is required"],
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

expenseSchema.plugin(mongoosePaginate);

const expense = mongoose.model("expense", expenseSchema);
module.exports = expense;
