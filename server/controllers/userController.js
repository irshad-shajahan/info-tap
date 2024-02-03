import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { attendanceModel } from "../models/attendanceModel.js";

//login function for user login as well as admin login
export const loginController = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    console.log(user)
    if(!user){
      return res.status(200).send({msg:'Invalid email or password',success:false})
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    if (!user.defaultPassChanged) {
      if (password === "tapemp123") {
        return res.status(200).send({
          message: `Login Succesful`,
          success: true,
          token,
          user
        });
      }
    }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(200)
          .send({ message: `Invalid Email or Password`, success: false });
      }

      return res.status(200).send({
        message: `You have succesfully logged in`,
        success: true,
        token,
        user
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "error occurred at login", success: false });
  }
};

//function to retrieve user details for authentication and other purposes
export const getUserDetails = async (req, res) => {
  console.log(req.body);
  const { userId } = req.body;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  console.log(userId)
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      res
        .status(400)
        .send({ msg: "No User Found with this ID", success: false });
    } else {
      if (!user.lastCheckedInDate || user.lastCheckedInDate.toDateString() !== today.toDateString()) {
        user.isCheckedIn = false;
      }
      await user.save();
      res.status(200).send({ user, success: true });
    }
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .send({ msg: "error while fetching user details", success: false });
  }
};


