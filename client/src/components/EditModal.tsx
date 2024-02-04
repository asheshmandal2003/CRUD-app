import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Edit } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

interface EditProps {
  employee: EmployeeDetails;
  setEmployees: React.Dispatch<
    React.SetStateAction<Array<EmployeeDetails> | null>
  >;
}

export default function EditModal({ employee, setEmployees }: EditProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [details, setDetails] = React.useState({
    first_name: employee.first_name,
    last_name: employee.last_name,
    mobile_no: employee.mobile_no,
    email: employee.email,
    gender: employee.gender,
    country: employee.country,
    state: employee.state,
  });

  const [date, setDate] = React.useState<Dayjs | null>(
    dayjs(employee.birth_date)
  );

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

  const editEmployee = async (
    id: string,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = new FormData();
    for (const value in details) {
      data.append(value, (details as any)[value]);
    }
    date && data.append("birth_date", date.format("DD/MM/YYYY"));
    await axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/employee/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setEmployees((prevEmps): Array<EmployeeDetails> | null => {
          if (prevEmps) {
            prevEmps.map((prevEmp) => {
              if (prevEmp._id === id) {
                prevEmp.first_name = details.first_name;
                prevEmp.last_name = details.last_name;
                prevEmp.mobile_no = details.mobile_no;
                prevEmp.email = details.email;
                prevEmp.country = details.country;
                prevEmp.state = details.state;
                prevEmp.gender = details.gender;
                prevEmp.birth_date = date?.format("DD/MM/YYYY");
                return;
              }
            });
            handleClose();
            return [...prevEmps];
          }
          handleClose();
          return null;
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <Edit />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Stack
            component="form"
            onSubmit={(e) => editEmployee(employee._id, e)}
            spacing={3}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Update Employee</Typography>
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
            />
            <TextField
              fullWidth
              name="email"
              label="Email"
              value={details.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
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
            <Button
              variant="contained"
              fullWidth
              endIcon={<Edit />}
              type="submit"
            >
              Edit
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
