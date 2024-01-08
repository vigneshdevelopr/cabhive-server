import express from "express";
import dotenv from "dotenv";
import { RegisterRouter } from "./Routes/Register.js";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import { AuthUser } from "./Routes/Signin.js";

const app = express();
const port = process.env.PORT;

try {
  mongoose.connect(process.env.DB);
  console.log("DB connected");
} catch (error) {
  console.log("Internal server error while connecting DB");
}
app.use(express.json());

app.use("/", RegisterRouter);
app.use("/signin", AuthUser);
app.use(cors());

//Server Connecting
app.listen(port, () => {
  try {
    console.log(`Your Port is Successfully connected to ${port}`);
  } catch (error) {
    console.log("Problem found in connecting with port");
  }
});
