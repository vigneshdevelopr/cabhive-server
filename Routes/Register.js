import express from "express";
import { genAuthToken, userModel } from "../Models/User.js";
import bcrypt from "bcrypt";
const router = express.Router();

router.get('/',async(req,res)=>{
    try {
        let userList = await userModel.find()
        return res.status(200).json(userList)
    } catch (error) {
        console.log(error.message)
        return res.status(500).send('Internal Server Error')
    }
})

router.post("/register", async(req, res) => {

  try {
    var userList = await userModel.findOne({email:req.body.email })

    if (userList)
      return res.status(409).send("User already Exists");
    
    //generate password:
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    userList = await new userModel({
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: hashPassword,
      role:req.body.role
    }).save();

    const token = genAuthToken(userList._id);
    console.log(userList, token);

    return res
      .status(200)
      .json({ message: `Welcome ${userList.firstname}${userList.lastname}` });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Server Error");
  }
});
export const RegisterRouter = router;
