import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";

//this is a test route to add new admin this should be commented out and only enabled in the development stage
export const RegisterAdminController = async (req, res) => {
  const data = req.body;
  try {
    const password = data.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    data.password = hashedPassword;
    const newAdmin = new userModel(data);
    newAdmin.save().then(() => {
      res.status(201).send({ msg: "admin succesfully added", success: true });
    });
  } catch (err) {
    res
      .status(500)
      .send({ msg: "error occurred while adding admin", success: false });
  }
};

// api to add employee
//the image url from the cloudinary is stored in the db
export const addMember = async (req, res) => {
  const data = req.body;
  try {
    const check = await userModel.findOne({ email: data.email });
    if (!check) {
      const newMember = new userModel(data);
      await newMember.save();
      res
        .status(201)
        .send({ msg: "New user added succesfully", success: true });
    } else {
      res.status(200).send({ msg: "Employee Already exists", success: false });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ msg: "error occurred while adding member", success: false });
  }
};
export const getMembers = async(req, res) => {
  try{
    const members = await userModel.find({isAdmin:false})
    res.status(200).send({msg:'member fetch successful',success:true,members})
  }catch(err){
    console.log(err);
    res.status(500).send({msg:'error while fetching members',success:false  })
  }
};

