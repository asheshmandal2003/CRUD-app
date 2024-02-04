import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../controllers/employee.js";

const router = express.Router();

router.route("/").get(getEmployees).post(createEmployee);
router
  .route("/:id")
  .get(getEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

export default router;
