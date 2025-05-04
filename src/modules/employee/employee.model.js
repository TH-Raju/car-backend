import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
  {
    name: {
      type: String,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    photo: {
      type: String,
    },

    contact: {
      type: String,
    },

    stage: {
      type: String,
    },

    apply_date: {
      type: String,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    working_role: {
      type: String,
    },
    isDelete: {
      type: String,
      default: "no",
    },
  },
  { timestamps: true }
);

employeeSchema.pre(["find", "findOne"], function () {
  this.where({ isDelete: { $ne: "yes" } });
});

const Employee = model("Employee", employeeSchema);
export default Employee;
