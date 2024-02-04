import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import employeeRoute from "./routes/employee.js";

mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => console.log(res.connection.readyState));

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    allowedHeaders: ["Content-Type"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(helmet())
app.use(express.json({ limit: "400kb" }));

app.use("/employee", employeeRoute);

app.listen(PORT, () => console.log(`app is listening on PORT ${PORT}`));
