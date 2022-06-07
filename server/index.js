import dotenv from "dotenv";
import express from "express";
import router from "./routes/auth.js";
import "./db/conn.js";

const app = express();
app.use(express.json());
app.use(router);

dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;

const middleware = (req, res, next) => {
  console.log("hello middleware");
  next();
};

app.get("/", (req, res) => {
  res.send("Hello world from the server.");
});

app.get("/contact", middleware, (req, res) => {
  // res.cookie("Test", "pratham Verma");

  console.log("hello contact");
  res.send("Hello contact world from the server.");
});

app.listen(PORT), console.log(`Server started running at PORT ${PORT}`);
