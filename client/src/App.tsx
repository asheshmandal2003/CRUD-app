import { Box } from "@mui/material";
import Form from "./components/Form";
import SearchEmployee from "./components/Search";
import Employees from "./components/Employees";
import { useEffect, useState } from "react";
import axios from "axios";

interface Employee {
  readonly _id: string;
  first_name?: string;
  last_name?: string;
  mobile_no?: string;
  email?: string;
  country?: string;
  state?: string;
  gender?: string;
  birth_date?: string;
}

function App() {
  const [allEmps, setAllEmps] = useState<Array<Employee> | null>(null);
  const [employees, setEmployees] = useState<Array<Employee> | null>(null);
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/employee`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setAllEmps(res.data);
          setEmployees(res.data);
        })
        .catch((err) => console.log(err.message));
    }
    fetchData();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          employees={employees}
          setEmployees={setEmployees}
          setAllEmployees={setAllEmps}
        />
        <SearchEmployee employees={allEmps} setEmployees={setEmployees} />
        <Employees
          employees={employees}
          setEmployees={setEmployees}
          setAllEmployees={setAllEmps}
        />
      </Box>
    </>
  );
}

export default App;
