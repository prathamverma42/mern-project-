import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const MONGO_URI = process.env.DATABASE;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to the Data Base Successfull!!");
  })
  .catch((err) => {
    console.log(`${err}Error in Connection`);
  });
