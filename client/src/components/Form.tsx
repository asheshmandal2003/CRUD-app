import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Add } from "@mui/icons-material";
import axios from "axios";

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

interface FormProps {
  employees: Array<EmployeeDetails> | null;
  setEmployees: React.Dispatch<
    React.SetStateAction<Array<EmployeeDetails> | null>
  >;
  setAllEmployees: React.Dispatch<
    React.SetStateAction<Array<EmployeeDetails> | null>
  >;
}

const Form = ({ employees, setEmployees, setAllEmployees }: FormProps) => {
  const [details, setDetails] = useState({
    first_name: "",
    last_name: "",
    mobile_no: "",
    email: "",
    gender: "Male",
    country: "",
    state: "",
  });
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails((prevDetails) => {
      return { ...prevDetails, [e.target.name]: e.target.value };
    });
  };
  const handleGenderChange = (e: SelectChangeEvent) => {
    setDetails((prevGender) => {
      return { ...prevGender, [e.target.name]: e.target.value };
    });
  };
  const addEmployee = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData();
    for (const value in details) {
      data.append(value, (details as any)[value]);
    }
    date && data.append("birth_date", date.format("YYYY/MM/DD"));
    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/employee`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setEmployees((prevEmployees): Array<EmployeeDetails> | null => {
          if (prevEmployees) {
            prevEmployees.push({
              _id: res.data.id,
              first_name: details.first_name,
              last_name: details.last_name,
              mobile_no: details.mobile_no,
              email: details.email,
              country: details.country,
              state: details.state,
              gender: details.gender,
              birth_date: date?.format("YYYY/MM/DD"),
            });
            return [...prevEmployees];
          }
          return null;
        });
        setAllEmployees((prevEmps) => (prevEmps = employees));
      })
      .catch((err) => console.log(err));
  };
  return (
    <Card
      component="form"
      sx={{
        width: 500,
        p: 4,
        mt: 5,
        mb: 4,
      }}
      onSubmit={addEmployee}
    >
      <Stack
        spacing={3}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Add Employee</Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            name="first_name"
            label="First Name"
            value={details.first_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />
          <TextField
            fullWidth
            name="last_name"
            label="Last Name"
            value={details.last_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />
        </Stack>
        <TextField
          fullWidth
          name="mobile_no"
          label="Mobile no"
          value={details.mobile_no}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <TextField
          fullWidth
          name="email"
          label="Email"
          value={details.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            name="country"
            label="Country"
            value={details.country}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />
          <TextField
            fullWidth
            name="state"
            label="State"
            value={details.state}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />
        </Stack>
        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select
            fullWidth
            name="gender"
            label="Gender"
            value={details.gender}
            onChange={handleGenderChange}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            name="birth_date"
            label="Controlled picker"
            value={date}
            onChange={(newDate) => setDate(newDate)}
            sx={{
              width: "100%",
            }}
          />
        </LocalizationProvider>
        <Button variant="contained" fullWidth endIcon={<Add />} type="submit">
          Add
        </Button>
      </Stack>
    </Card>
  );
};

export default Form;
