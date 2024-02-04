import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import EditModal from "./EditModal";

type EmployeeDetails = {
  readonly _id: string;
  first_name?: string;
  last_name?: string;
  mobile_no?: string;
  email?: string;
  country?: string;
  state?: string;
  gender?: string;
  birth_date?: string;
};

interface EmployeesProps {
  employees: Array<EmployeeDetails> | null;
  setEmployees: React.Dispatch<
    React.SetStateAction<Array<EmployeeDetails> | null>
  >;
  setAllEmployees: React.Dispatch<
    React.SetStateAction<Array<EmployeeDetails> | null>
  >;
}

export default function Employees({
  employees,
  setEmployees,
  setAllEmployees,
}: EmployeesProps) {
  const deleteEmp = async (id: string) => {
    await axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/employee/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setEmployees((prevEmps): Array<EmployeeDetails> | null => {
          if (prevEmps) return prevEmps.filter((prevEmp) => prevEmp._id !== id);
          return null;
        });
        setAllEmployees((prevEmps): Array<EmployeeDetails> | null => {
          if (prevEmps) return prevEmps.filter((prevEmp) => prevEmp._id !== id);
          return null;
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Typography variant="h6" mb={4}>
        Employees
      </Typography>
      <TableContainer component={Paper} sx={{ width: "80%", mb: 6 }}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell align="right">Mobile No</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Country</TableCell>
              <TableCell align="right">State</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Date of Birth</TableCell>
              <TableCell align="right">Actions</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees &&
              employees.map((employee) => (
                <TableRow
                  key={employee._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {employee.first_name + " " + employee.last_name}
                  </TableCell>
                  <TableCell align="right">{employee.mobile_no}</TableCell>
                  <TableCell align="right">{employee.email}</TableCell>
                  <TableCell align="right">{employee.country}</TableCell>
                  <TableCell align="right">{employee.state}</TableCell>
                  <TableCell align="right">{employee.gender}</TableCell>
                  <TableCell align="right">{employee.birth_date}</TableCell>
                  <TableCell align="right">
                    <EditModal
                      employee={employee}
                      setEmployees={setEmployees}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => deleteEmp(employee._id)}>
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
