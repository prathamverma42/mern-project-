import express from "express";
import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello world from the auth.js.");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill all the fields!" });
  }

  try {
    const userResponse = await User.findOne({ email: email });
    if (userResponse) {
      return res.status(422).json({ error: "Email already registered" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password not matching" });
    }
    const user = new User({ name, email, phone, work, password, cpassword });
    await user.save();
    res.status(201).json({ msg: "Successfully created" });
  } catch (err) {
    console.log(err);
  }
});

//login route
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please fill all the fields" });
  }
  try {
    // console.log(email, password);
    let token;
    const userLogin = await User.findOne({ email: email });
    token = await userLogin.generateAuthToken();
    console.log(token);
    if (userLogin == null) {
      return res.status(400).json({ error: "Invalid Credentials!!" });
    }
    const isMatch = await bcrypt.compare(password, userLogin.password);
    if (!isMatch) {
      res.status(400).json({ error: "Invalid Credentials!!" });
    } else {
      res.json({ message: "user signin successfull" });
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
