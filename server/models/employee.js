import mongoose from "mongoose";

const { Schema } = mongoose;

const employeeSchema = new Schema({
  first_name: String,
  last_name: String,
  mobile_no: String,
  email: String,
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  birth_date: String,
  country: String,
  state: String,
});

export const Employee = mongoose.model("Employee", employeeSchema);
