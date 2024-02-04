import { Search } from "@mui/icons-material";
import { Button, Input, InputAdornment, Typography } from "@mui/material";
import React, { useState } from "react";

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

interface SearchProps {
  employees: Array<EmployeeDetails> | null;
  setEmployees: React.Dispatch<
    React.SetStateAction<Array<EmployeeDetails> | null>
  >;
}

const SearchEmployee = ({ employees, setEmployees }: SearchProps) => {
  const [name, setName] = useState(() => "");

  const findEmployee = (
    event: React.FormEvent<HTMLFormElement>
  ): Array<EmployeeDetails> | null => {
    event.preventDefault();
    if (employees) {
      const found_employees = employees.filter(
        (employee) => employee.first_name === name
      );
      setEmployees(found_employees);
      return found_employees;
    }
    return null;
  };
  return (
    <form onSubmit={(event) => findEmployee(event)}>
      <Typography variant="h6" mb={3}>
        Search Employee
      </Typography>
      <Input
        name="name"
        value={name}
        onChange={(e) => setName((prevName) => (prevName = e.target.value))}
        placeholder="Search by employee name"
        sx={{ width: 500, mb: 5, mr: 2 }}
        endAdornment={
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        }
      />
      <Button variant="outlined" onClick={() => setEmployees(employees)}>
        Clear Search
      </Button>
    </form>
  );
};

export default SearchEmployee;
