import { Employee } from "../models/employee.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    return res.status(200).json(employees);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    return res.status(200).json(employee);
  } catch (error) {
    return res.status(500).json({ msg: "Employee doesn't exist!" });
  }
};

export const createEmployee = async (req, res) => {
  try {
    console.log(req.body)
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    return res.status(201).json({id: newEmployee._id});
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({ msg: "Updated!" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "Deleted!" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};
